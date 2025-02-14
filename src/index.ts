import { ethers } from "ethers";
import dotenv from "dotenv";
import { sendToDiscord } from "./discordAlert"; // ✅ Import Discord alert function

dotenv.config();

// Load environment variables
const RPC_URL = process.env.AVAX_RPC_URL!;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS?.toLowerCase();
const EXPLORER_URL = process.env.EXPLORER_URL || "https://snowtrace.io"; // Default Snowtrace Explorer

if (!RPC_URL || !WALLET_ADDRESS || !EXPLORER_URL) {
    console.error("❌ Missing AVAX_RPC_URL, WALLET_ADDRESS, or EXPLORER_URL in .env file");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);

// ✅ Startup Message
console.log("🚀 AVAX Transaction Monitor Bot Started!");
console.log(`🔍 Monitoring wallet: ${WALLET_ADDRESS}`);
console.log("⏳ Listening for new transactions...\n");

// Known function signatures for ERC-20 & contract methods
const functionSelectors: { [key: string]: string } = {
    "0xa9059cbb": "transfer(address,uint256)",
    "0x095ea7b3": "approve(address,uint256)",
    "0x23b872dd": "transferFrom(address,address,uint256)",
    "0x2e1a7d4d": "withdraw(uint256)",
    "0xa22cb465": "setApprovalForAll(address,bool)",
    "0x38ed1739": "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)",
};

/**
 * Decodes transaction method name from input data
 */
async function getMethodName(tx: ethers.TransactionResponse): Promise<string> {
    if (!tx.data || tx.data === "0x") return "AVAX Transfer"; // Regular AVAX transfer

    try {
        // Get the first 4 bytes (method selector)
        const methodSignature = tx.data.slice(0, 10); // First 4 bytes (including '0x')

        // Check if the method exists in our known function selectors
        if (functionSelectors[methodSignature]) {
            return functionSelectors[methodSignature];
        }

        // If unknown, attempt to decode dynamically using provider.call()
        if (tx.to) {
            const result = await provider.call({ to: tx.to, data: methodSignature });
            return result ? ethers.toUtf8String(result) : "Unknown Method";
        }
    } catch (error) {
        console.error("⚠️ Error decoding method:", error);
    }

    return "Contract Interaction"; // Fallback if decoding fails
}

// Listen for new blocks
provider.on("block", async (blockNumber: number) => {
    console.log(`🔍 Checking Block: ${blockNumber}`);

    try {
        const block = await provider.getBlock(blockNumber);
        if (!block || !block.transactions.length) return;

        // Fetch full transaction details
        const transactions = await Promise.all(
            block.transactions.map(async (txHash) => provider.getTransaction(txHash))
        );

        // ✅ Remove null transactions before filtering
        const relevantTxs = transactions
            .filter((tx): tx is ethers.TransactionResponse => tx !== null) // Ensure tx is valid
            .filter((tx) => tx.from.toLowerCase() === WALLET_ADDRESS || tx.to?.toLowerCase() === WALLET_ADDRESS);

        if (relevantTxs.length > 0) {
            console.log(`📢 Found ${relevantTxs.length} relevant transactions in Block ${blockNumber}:`);

            for (const tx of relevantTxs) {
                const from = tx.from;
                const to = tx.to || "Contract Deployment";
                const value = ethers.formatEther(tx.value);
                const txHash = tx.hash;

                // ✅ Get method name
                const methodName = await getMethodName(tx);

                console.log("🔹 Transaction Found:");
                console.log(`🔗 Explorer Link: ${EXPLORER_URL}/tx/${txHash}`);
                console.log(`📤 From: ${from}`);
                console.log(`📥 To: ${to}`);
                console.log(`💰 Value: ${value} AVAX`);
                console.log(`📌 Method: ${methodName}`);
                console.log(`⛽ Gas Used: ${tx.gasLimit.toString()}`);
                console.log("----------------------------------");

                // ✅ Send alert to Discord with Method
                await sendToDiscord(from, to, txHash, value, methodName, EXPLORER_URL);
            }
        }
    } catch (error) {
        console.error("❌ Error fetching block data:", error);
    }
});

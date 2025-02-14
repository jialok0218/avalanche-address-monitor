import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const DISCORD_WEBHOOK_URL: string = process.env.DISCORD_WEBHOOK_URL || "";

if (!DISCORD_WEBHOOK_URL) {
    throw new Error("❌ DISCORD_WEBHOOK_URL is missing in .env file");
}

/**
 * Sends an alert to Discord when a new AVAX transaction is detected.
 */
export async function sendToDiscord(
    from: string,
    to: string,
    txHash: string,
    value: string,
    method: string,
    explorerUrl: string
): Promise<void> {
    const message = {
        username: "AVAX Transaction Monitor",
        embeds: [
            {
                title: "🚀 New AVAX Transaction Detected!",
                color: 3447003, // Blue color
                fields: [
                    { name: "📤 From", value: `[${from}](${explorerUrl}/address/${from})`, inline: true },
                    { name: "📥 To", value: `[${to}](${explorerUrl}/address/${to})`, inline: true },
                    { name: "💰 Value", value: `\`${value} AVAX\``, inline: true },
                    { name: "📌 Method", value: `\`${method}\``, inline: true },
                    { name: "🔗 Transaction Hash", value: `[${txHash}](${explorerUrl}/tx/${txHash})` }
                ],
                footer: {
                    text: "Avalanche Address Monitor Bot",
                },
                timestamp: new Date().toISOString(),
            }
        ]
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, message);
        console.log("✅ Sent alert to Discord!");
    } catch (error) {
        console.error("❌ Failed to send message to Discord:", error);
    }
}

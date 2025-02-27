# 📌 Avalanche Address Monitor

🚀 **A real-time transaction monitoring bot for Avalanche (AVAX) addresses**.  
This bot listens for **incoming & outgoing AVAX transactions** related to a specific wallet and **sends alerts to a Discord webhook**.

---

## **📚 Features**  
- 🟢 **Real-time AVAX transaction monitoring** – Tracks transactions as they happen.  
- 📝 **Decodes transaction methods** – Supports `transfer`, `approve`, `swapTokens`, and more.  
- 💰 **Supports ERC-20 and smart contract interactions** – Detects token transfers and contract calls.  
- 🔔 **Sends alerts to Discord with clickable links** – Stay updated instantly.  
- 📄 **Detects sender (`From`) and receiver (`To`)** – Know who’s involved in each transaction.  
- 🌐 **Works on Avalanche Mainnet & Fuji Testnet** – Supports both networks seamlessly.  

---

## **🛠️ Installation & Setup**

### **1⃣ Clone the Repository**
```sh
git clone https://github.com/jialok0218/avalanche-address-monitor.git
cd avalanche-address-monitor
```

### **2⃣ Install Dependencies**
```sh
npm install
```

### **3⃣ Set Up Environment Variables**  
Create a **`.env`** file and configure:
```ini
AVAX_RPC_URL=https://api.avax.network/ext/bc/C/rpc  # Use Fuji testnet URL if testing
WALLET_ADDRESS=0xYourAvalancheAddress
EXPLORER_URL=https://snowtrace.io
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
```

### **4⃣ Compile TypeScript**
```sh
npx tsc
```

### **5⃣ Run the Monitor**
```sh
node dist/index.js
```

---

## **🔔 Discord Alert Example**  
When a new transaction is detected, the bot **sends an alert to Discord**:
```yaml
🚀 New AVAX Transaction Detected!
📄 From: [0x1234...abcd](https://snowtrace.io/address/0x1234abcd)
💍 To: [0x5678...efgh](https://snowtrace.io/address/0x5678efgh)
💰 Value: 1.25 AVAX
📌 Method: transfer(address,uint256)
🔗 [Transaction Hash](https://snowtrace.io/tx/0xabcdef123456789)
```

---

## **🛠️ Technologies Used**
- 🦀 **TypeScript** - Type safety & maintainability.  
- 🟢 **Node.js** - Backend runtime.  
- 🌐 **Axios** - HTTP client for API requests.  
- ⚡ **Ethers.js** - Blockchain interaction.  
- 🔗 **Alchemy / Infura** - Avalanche RPC provider.  
- 💬 **Discord Webhooks** - Token alert notifications.  

---

## **📜 License**
This project is **open-source** under the **MIT License**.


# 📌 Avalanche Address Monitor

🚀 **A real-time transaction monitoring bot for Avalanche (AVAX) addresses**.  
This bot listens for **incoming & outgoing AVAX transactions** related to a specific wallet and **sends alerts to a Discord webhook**.

---

## **📖 Features**
✅ **Real-time AVAX transaction monitoring**  
✅ **Decodes transaction methods (`transfer`, `approve`, `swapTokens`, etc.)**  
✅ **Supports ERC-20 and smart contract interactions**  
✅ **Sends alerts to Discord with clickable links**  
✅ **Detects sender (`From`) and receiver (`To`)**  
✅ **Works on Avalanche Mainnet & Fuji Testnet**  

---

## **⚙️ Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/jialok0218/avalanche-address-monitor.git
cd avalanche-address-monitor
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env`** file and configure:
```ini
AVAX_RPC_URL=https://api.avax.network/ext/bc/C/rpc  # Use Fuji testnet URL if testing
WALLET_ADDRESS=0xYourAvalancheAddress
EXPLORER_URL=https://snowtrace.io
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
```

### **4️⃣ Compile TypeScript**
```sh
npx tsc
```

### **5️⃣ Run the Monitor**
```sh
node dist/index.js
```

---

## **🔔 Discord Alert Example**
When a new transaction is detected, the bot **sends an alert to Discord**:
> 🚀 **New AVAX Transaction Detected!**  
> 📤 **From:** [`0x1234...abcd`](https://snowtrace.io/address/0x1234abcd)  
> 📥 **To:** [`0x5678...efgh`](https://snowtrace.io/address/0x5678efgh)  
> 💰 **Value:** `1.25 AVAX`  
> 📌 **Method:** `transfer(address,uint256)`  
> 🔗 **[0xabcdef123456789](https://snowtrace.io/tx/0xabcdef123456789)**  

---

## **📜 License**
This project is **open-source** under the **MIT License**.




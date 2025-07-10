# compression-dictionary-transport-threejs-demo

# instructions
download chrome canary or dev
install node and npm <br>
go into public folder <br>
node server.js <br>
go to <br>
http://localhost:55987/demo.html?r=151 <br>
then <br>
http://localhost:55987/demo.html?r=152 <br>
go to network tab to check (go from 151 KB to 5 KB) <br>

Demo site: https://compression-dictionary-transport-threejs-demo.glitch.me/

# more detailed instructions
# 📦 Compression Dictionary Transport Demo

Demo site: [compression-dictionary-transport-threejs-demo.glitch.me](https://compression-dictionary-transport-threejs-demo.glitch.me/)

This demo showcases how shared compression dictionaries (e.g., Brotli) can drastically reduce transfer sizes — from **151KB to 5KB** — using Chrome's experimental compression features.

---

## 🚀 Quick Setup

### 1. Install Node.js & npm

#### ✅ Option A: Via `nvm` (recommended)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

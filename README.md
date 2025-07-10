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
<pre lang="markdown"> # 📦 Compression Dictionary Transport Demo Demo site: [compression-dictionary-transport-threejs-demo.glitch.me](https://compression-dictionary-transport-threejs-demo.glitch.me/) This demo showcases how shared compression dictionaries (e.g., Brotli) can drastically reduce transfer sizes — from **151KB to 5KB** — using Chrome's experimental compression features. --- ## 🚀 Quick Setup ### 1. Install Node.js & npm #### ✅ Option A: Via `nvm` (recommended) ```bash curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash source ~/.bashrc nvm install --lts nvm use --lts ``` #### ✅ Option B: Direct install ```bash # Ubuntu/Debian sudo apt install nodejs npm # macOS brew install node ``` --- ### 2. Install Chrome Canary or Dev Download and install one: - [Chrome Canary](https://www.google.com/chrome/canary/) - [Chrome Dev](https://www.google.com/chrome/dev/) --- ### 3. Clone and run the project ```bash git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git cd YOUR_REPO_NAME/public # Run the local server node server.js # Or use a static server as fallback: npx http-server -p 55987 ``` --- ### 4. Launch Chrome Canary with experimental flags #### ✅ macOS / Linux: ```bash /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary \ --enable-features=CompressionDictionaryTransport \ --origin-trial-disabled-features=CompressionDictionaryTransport ``` #### ✅ Windows: ```cmd chrome.exe --enable-features=CompressionDictionaryTransport --origin-trial-disabled-features=CompressionDictionaryTransport ``` --- ### 5. Test the compression demo Open these URLs in Chrome Canary: ``` http://localhost:55987/demo.html?r=151 ``` Then: ``` http://localhost:55987/demo.html?r=152 ``` --- ### 6. Inspect Compression in DevTools 1. Open **DevTools > Network** tab 2. Reload both pages 3. Observe file sizes: | Page | Transfer Size | |-----------------------|----------------| | First Load (`r=151`) | ~151 KB | | Second Load (`r=152`) | ~5 KB ✅ (compressed using shared dictionary) | --- ## 🧪 Live Demo Try it instantly at: 🔗 [https://compression-dictionary-transport-threejs-demo.glitch.me/](https://compression-dictionary-transport-threejs-demo.glitch.me/) --- ## 📄 License MIT License © Your Name </pre>

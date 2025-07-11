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



# more detailed instructions
# 📦 Compression Dictionary Transport Demo

Demo site: [compression-dictionary-transport-threejs-demo.glitch.me](https://compression-dictionary-transport-threejs-demo.glitch.me/)
(UPDATE: THE WEBSITE NO LONGER LOADS, SO RUN IT LOCALLY WITH INSTRUCTIONS BELOW)

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



git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/public

# Run the local server
node server.js
for this terminal will output Your app is listening on http://0.0.0.0:58116
so go to http://localhost:58116/demo.html?r=151

# Or use a static server as fallback:
npx http-server -p 55987

/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary \
--enable-features=CompressionDictionaryTransport \
--origin-trial-disabled-features=CompressionDictionaryTransport

first go to
http://localhost:55987/demo.html?r=151 (replace the 5 digit number with what u see on terminal)

then
http://localhost:55987/demo.html?r=152

6. Inspect Compression in DevTools
Open DevTools > Network tab
Reload both pages
Observe file sizes:
Page	Transfer Size
First Load (r=151)	~151 KB
Second Load (r=152)	~5 KB ✅ (compressed using shared dictionary)

7. to open website on ios with roots:
run ifconfig, get ethernet IP of computer, then type into safari on iphone: ethernetIP:58116/demo.html?r=151
for example 169.254.63.208:




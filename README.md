# Compression Dictionary Transport Three.js Demo

## Instructions

1. Download **Chrome Canary** or **Chrome Dev**.
2. Install **Node.js** and **npm**.
3. Navigate to the `public` folder:
   ```bash
   cd YOUR_REPO_NAME/public
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open your browser and go to:
   ```
   http://localhost:55987/demo.html?r=151
   ```
6. Then visit:
   ```
   http://localhost:55987/demo.html?r=152
   ```
7. Check the **Network** tab to observe the size reduction (from **151 KB to 5 KB**).

---

## 📦 Compression Dictionary Transport Demo

Demo site: [compression-dictionary-transport-threejs-demo.glitch.me](https://compression-dictionary-transport-threejs-demo.glitch.me/)  
*(UPDATE: THE WEBSITE NO LONGER LOADS, SO RUN IT LOCALLY WITH INSTRUCTIONS BELOW)*

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
```

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/public
```

### 3. Run the Local Server
```bash
node server.js
```
*This terminal will output: Your app is listening on http://0.0.0.0:58116*

### 4. Access the Demo
Open your browser and go to:
```
http://localhost:58116/demo.html?r=151
```

### 5. Use a Static Server as Fallback
```bash
npx http-server -p 55987
```

### 6. Launch Chrome with Experimental Features
```bash
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary \
--enable-features=CompressionDictionaryTransport \
--origin-trial-disabled-features=CompressionDictionaryTransport
```

### 7. Open the Demo Pages
1. First, go to:
   ```
   http://localhost:55987/demo.html?r=151
   ```
   *(replace the 5-digit number with what you see in the terminal)*

2. Then, visit:
   ```
   http://localhost:55987/demo.html?r=152
   ```

### 8. Inspect Compression in DevTools
1. Open **DevTools** > **Network** tab.
2. Reload both pages.
3. Observe file sizes:
   - **First Load (r=151)**: ~151 KB
   - **Second Load (r=152)**: ~5 KB ✅ (compressed using shared dictionary)

### 9. Access the Website on iOS
To open the website on iOS with roots:
1. Run `ifconfig` to get the Ethernet IP of your computer.
2. Type into Safari on your iPhone:
   ```
   ethernetIP:58116/demo.html?r=151
   ```
   *For example, if your Ethernet IP is `169.254.63.208`:*
   ```
   169.254.63.208:58116/demo.html?r=151
   ```



Chrome canary headers for 151.js expected:
equest URL
http://localhost:50133/js/151.js
Request Method
GET
Status Code
200 OK
Remote Address
127.0.0.1:50133
Referrer Policy
strict-origin-when-cross-origin

Response headers
ache-control
public, max-age=1000
connection
keep-alive
content-encoding
br
content-length
190163
content-type
application/javascript; charset=utf-8
date
Thu, 31 Jul 2025 22:25:32 GMT
keep-alive
timeout=72
use-as-dictionary
match="/js/*"
vary
sec-available-dictionary, available-dictionary


and request headers
accept
*/*
accept-encoding
gzip, deflate, br, zstd
accept-language
en-US,en;q=0.9
cache-control
no-cache
connection
keep-alive
host
localhost:50133
origin
http://localhost:50133
pragma
no-cache
referer
http://localhost:50133/demo.html?r=151
sec-ch-ua
"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"macOS"
sec-fetch-dest
script
sec-fetch-mode
cors
sec-fetch-site
same-origin
user-agent
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36


and for 152.js:
Request URL
http://localhost:50133/js/152.js
Request Method
GET
Status Code
200 OK
Remote Address
127.0.0.1:50133
Referrer Policy
strict-origin-when-cross-origin

reepsones headers
ache-control
public, max-age=1000
connection
keep-alive
content-dictionary
:epjv6NymTtsZ63DPEBkyCVCh7ZlGicsjTPkBUvSQ9G4=:
content-encoding
dcz
content-length
5652
content-type
application/javascript; charset=utf-8
date
Thu, 31 Jul 2025 22:27:00 GMT
keep-alive
timeout=72
use-as-dictionary
match="/js/*"
vary
sec-available-dictionary, available-dictionary



and requesrt headers:
accept
*/*
accept-encoding
gzip, deflate, br, zstd, dcb, dcz
accept-language
en-US,en;q=0.9
available-dictionary
:epjv6NymTtsZ63DPEBkyCVCh7ZlGicsjTPkBUvSQ9G4=:
cache-control
no-cache
connection
keep-alive
host
localhost:50133
origin
http://localhost:50133
pragma
no-cache
referer
http://localhost:50133/demo.html?r=152
sec-ch-ua
"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"macOS"
sec-fetch-dest
script
sec-fetch-mode
cors
sec-fetch-site
same-origin
user-agent
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36






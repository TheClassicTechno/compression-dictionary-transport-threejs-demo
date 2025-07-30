
const crypto = require('crypto');
const fastify = require('fastify')({
  logger: false,
});
const path = require('path');
const fs = require('fs').promises;

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});

async function loadThreeJsScript(ver) {
  const data = await fs.readFile(`third_party/three_js/${ver}.js`);
  const hash = crypto.createHash('sha256').update(data).digest();
  const hashV1 = hash.toString('hex');
  const hashV2 = ':' + hash.toString('base64') + ':';
  const compressed = await fs.readFile(`third_party/three_js/${ver}.js.br`);
  return {ver: ver, data: data, hash: hash, hashV1: hashV1, hashV2: hashV2, compressed: compressed};
}

async function loadThreeJsDelta(from, to) {
  const sbr = await fs.readFile(`third_party/three_js/${from}-${to}.js.sbr`);
  const szst = await fs.readFile(`third_party/three_js/${from}-${to}.js.szst`);
  return {from: from, to: to, sbr: sbr, szst: szst};
}


const THREE_JS_VERSIONS = ['version1', 'version2', 'version3'];
const DCB_MAGIC = Buffer.from([0xff, 0x44, 0x43, 0x42]);
const DCZ_MAGIC = Buffer.from([0x5e, 0x2a, 0x4d, 0x18, 0x20, 0x00, 0x00, 0x00]);

async function loadThreeJsFiles() {
  let promises = [];
  THREE_JS_VERSIONS.forEach((ver) => {
    promises.push(loadThreeJsScript(ver));
  });
  const scripts = await Promise.all(promises);
  let scriptMap = {};
  let deltaMap = {};
  scripts.forEach((script) => {
    console.log(`Loaded script ${script.ver}, hash: ${script.hashV2}`);
    scriptMap[script.ver] = script;
    deltaMap[script.hashV1] = {};
    deltaMap[script.hashV2] = {};
    deltaMap[script.hashV2].hash = script.hash;
  })

  promises = [];
  THREE_JS_VERSIONS.forEach((from) => {
    THREE_JS_VERSIONS.forEach((to) => {
      promises.push(loadThreeJsDelta(from, to));
    });
  });
  const delatas = await Promise.all(promises);
  delatas.forEach((delta) => {
    console.log(`Loading delta ${delta.from} -> ${delta.to}`);
    deltaMap[scriptMap[delta.from].hashV1][delta.to] = delta;
    deltaMap[scriptMap[delta.from].hashV2][delta.to] = delta;
  });
  
  console.log('Final deltaMap keys:', Object.keys(deltaMap));
  Object.keys(deltaMap).forEach(hash => {
    console.log(`Hash ${hash} has versions:`, Object.keys(deltaMap[hash]));
  });
  
  return {
    scriptMap: scriptMap,
    deltaMap: deltaMap
  }
}
const threeJsInfoPromise = loadThreeJsFiles();

THREE_JS_VERSIONS.forEach((ver) => {
  fastify.get(`/js/${ver}.js`, async function (request, reply) {
    reply.header('content-type', 'application/javascript; charset=utf-8');
    reply.header('cache-control', 'public, max-age=1000');
    reply.header('use-as-dictionary', 'match="/js/*"');
    reply.header('vary', 'sec-available-dictionary, available-dictionary');
    const threeJsInfo = await threeJsInfoPromise;
    const dictHashV1 = request.headers['sec-available-dictionary'];
    const dictHashV2 = request.headers['available-dictionary'];
    
    // Debug logging
    console.log(`Request for ${ver}.js:`);
    console.log('Headers:', request.headers);
    console.log('Dictionary V1:', dictHashV1);
    console.log('Dictionary V2:', dictHashV2);
    
    const acceptEncoding = request.headers['accept-encoding'] || '';
    const acceptEncodings = acceptEncoding.split(',');
    const sbrSupported = acceptEncodings.some(x => x.trim()=='sbr');
    const szstSupported = acceptEncodings.some(x => x.trim()=='zstd-d');
    const dcbSupported = acceptEncodings.some(x => x.trim()=='dcb');
    const dczSupported = acceptEncodings.some(x => x.trim()=='dcz');
    
    console.log('Accept-Encoding:', acceptEncoding);
    console.log('Supported encodings:', { sbrSupported, szstSupported, dcbSupported, dczSupported });
    
    // Check if dictionary exists in deltaMap
    console.log('Available dictionaries in deltaMap:', Object.keys(threeJsInfo.deltaMap));
    if (dictHashV2) {
      console.log('Looking for dictionary:', dictHashV2);
      console.log('Dictionary exists:', !!threeJsInfo.deltaMap[dictHashV2]);
      if (threeJsInfo.deltaMap[dictHashV2]) {
        console.log('Available versions for this dictionary:', Object.keys(threeJsInfo.deltaMap[dictHashV2]));
        console.log('Looking for version:', ver);
        console.log('Version exists:', !!threeJsInfo.deltaMap[dictHashV2][ver]);
      }
    }
    
    if (dictHashV1 && 
        (sbrSupported || szstSupported) &&
        threeJsInfo.deltaMap[dictHashV1] &&
        threeJsInfo.deltaMap[dictHashV1][ver]) {
      console.log('Using V1 dictionary compression');
      if (szstSupported) {
        reply.header('content-encoding', 'zstd-d');
        reply.send(Buffer.from(threeJsInfo.deltaMap[dictHashV1][ver].szst));
      } else {
        reply.header('content-encoding', 'sbr');
        reply.send(Buffer.from(threeJsInfo.deltaMap[dictHashV1][ver].sbr));
      }
    } else if (dictHashV2 && (sbrSupported || szstSupported || dcbSupported || dczSupported) &&
               threeJsInfo.deltaMap[dictHashV2] &&
               threeJsInfo.deltaMap[dictHashV2][ver]) {
      console.log('Using V2 dictionary compression');
      reply.header('content-dictionary', dictHashV2);
      const deltaMap = threeJsInfo.deltaMap[dictHashV2];
      const delta = deltaMap[ver];
      if (dczSupported) {
        console.log('Sending DCZ compressed response');
        reply.header('content-encoding', 'dcz');
        reply.send(Buffer.concat([DCZ_MAGIC, deltaMap.hash, delta.szst]));
      } else if (dcbSupported) {
        console.log('Sending DCB compressed response');
        reply.header('content-encoding', 'dcb');
        reply.send(Buffer.concat([DCB_MAGIC, deltaMap.hash, delta.sbr]));
      } else if (szstSupported) {
        console.log('Sending ZSTD-D compressed response');
        reply.header('content-encoding', 'zstd-d');
        reply.send(Buffer.from(delta.szst));
      } else {
        console.log('Sending BR-D compressed response');
        reply.header('content-encoding', 'br-d');
        reply.send(Buffer.from(delta.sbr));
      }
    } else {
      console.log('Using regular compression - no dictionary available');
      if (threeJsInfo.scriptMap[ver]) {
        reply.header('content-encoding', 'br');
        reply.send(Buffer.from(threeJsInfo.scriptMap[ver].compressed));
      }
    }
  });
});


fastify.listen(
  { port: process.env.PORT, host: '0.0.0.0' },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);

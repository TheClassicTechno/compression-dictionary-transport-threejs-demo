#!/bin/bash -e

readonly BROTLI_REV="4fc753e707c141328ee707bc2df23603391d0102"

rm -rf third_party

mkdir third_party
cd third_party

# Download brotli

git clone https://github.com/google/brotli.git
cd brotli
git checkout $BROTLI_REV

bazel build brotli

cd research/

bazel build dictionary_generator

cd ../../

mkdir three_js
cd three_js

curl https://unpkg.com/three@0.version1.0/build/three.module.js -o version1.js
curl https://unpkg.com/three@0.version2.0/build/three.module.js -o version2.js
curl https://unpkg.com/three@0.version3.0/build/three.module.js -o version3.js

../brotli/bazel-bin/brotli version1.js -o version1.js.br
../brotli/bazel-bin/brotli version2.js -o version2.js.br
../brotli/bazel-bin/brotli version3.js -o version3.js.br
../brotli/bazel-bin/brotli version1.js -D version1.js -o version1-version1.js.sbr
../brotli/bazel-bin/brotli version2.js -D version1.js -o version1-version2.js.sbr
../brotli/bazel-bin/brotli version3.js -D version1.js -o version1-version3.js.sbr
../brotli/bazel-bin/brotli version1.js -D version2.js -o version2-version1.js.sbr
../brotli/bazel-bin/brotli version2.js -D version2.js -o version2-version2.js.sbr
../brotli/bazel-bin/brotli version3.js -D version2.js -o version2-version3.js.sbr
../brotli/bazel-bin/brotli version1.js -D version3.js -o version3-version1.js.sbr
../brotli/bazel-bin/brotli version2.js -D version3.js -o version3-version2.js.sbr
../brotli/bazel-bin/brotli version3.js -D version3.js -o version3-version3.js.sbr

zstd version2.js -D version1.js -19 -o version1-version2.js.szst
zstd version3.js -D version1.js -19 -o version1-version3.js.szst
zstd version1.js -D version2.js -19 -o version2-version1.js.szst
zstd version3.js -D version2.js -19 -o version2-version3.js.szst
zstd version1.js -D version3.js -19 -o version3-version1.js.szst
zstd version2.js -D version3.js -19 -o version3-version2.js.szst

cp version1.js version1.js_
cp version2.js version2.js_
cp version3.js version3.js_
zstd version1.js -D version1.js_ -19 -o version1-version1.js.szst
zstd version2.js -D version2.js_ -19 -o version2-version2.js.szst
zstd version3.js -D version3.js_ -19 -o version3-version3.js.szst
rm version1.js_
rm version2.js_
rm version3.js_

npm install

npm start run
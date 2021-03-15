#! /bin/bash

# need to solve the issue that opera not supporting "chrome_url_overrides"
# so I generate a different build what can solve this problem

echo "Starting basic client build..."

npm run build

echo "Genrating build for Opera"

rm -rf build_opera
mkdir build_opera

cp opera_files/background.js opera_files/manifest.json build_opera
cd build
cp .env asset-manifest.json favicon.ico index.html *.png robots.txt ../build_opera
cp -r ./static ../build_opera
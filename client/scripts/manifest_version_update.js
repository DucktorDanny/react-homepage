const fs = require('fs');

const versionUpdate = () => {
   const manifest = require('../public/manifest.json');

   const { version } = manifest;
   const versionParts = version.split('.');

   versionParts[versionParts.length - 1]++;
   versionParts[versionParts.length - 1] += '';
   
   manifest.version = versionParts.join('.')

   console.log(`v${version} -> v${manifest.version}`);

   const data = JSON.stringify(manifest);
   fs.writeFileSync('./public/manifest.json', data);
}

versionUpdate();
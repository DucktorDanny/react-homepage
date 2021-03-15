const fs = require('fs');

const readOriginalManifestJSONVersion = () => {
   const originalManifest = require('../public/manifest.json');
   const operaManifest = require('./manifest.json');

   console.log(`opera v${operaManifest.version} -> v${originalManifest.version}`);

   operaManifest.version = originalManifest.version;
   const modifiedJSON = JSON.stringify(operaManifest);

   fs.writeFileSync('./manifest.json', modifiedJSON);
}

readOriginalManifestJSONVersion();
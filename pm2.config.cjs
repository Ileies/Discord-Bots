const { join } = require('path');
const packageJson = require('./package.json');

module.exports = {
  name: packageJson.name,
  script: join(__dirname, packageJson.module),
  interpreter: "bun"
};

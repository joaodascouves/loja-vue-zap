const version = 0.080;
const versionAlias = 'torta de maçã';

module.exports = {
  version,
  versionAlias,
  hash: () => `${version}_${versionAlias}`,
};

const days = (num) => 1000 * 60 * 60 * 24 * num;

module.exports = {
  storagePrefix: 'BN',

  modulesConfig: {
    category: { ttl: days(3) },
    featured: { ttl: days(3) },
    product: { ttl: days(1) },
    client: { ttl: days(1) },
  },

  build: {
    adminChunks: ['/backend.js', '/1.backend.js'],
    adminStyleChunks: ['/backend.css', '/2.backend.css'],
    clientChunks: ['/client.js', '/1.client.js'],
    clientStyleChunks: ['/client.css'],
  },
};

/* eslint-disable */

const { build } = require('../../config/shared');
const { s } = require('./index');

function manifest() {
  const CACHE_NAME = '%cache-name%';

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll([
        '/',
        /* %webpack-chunks% */,
        /* %style-chunks% */,
        /* %manifest-uri% */,
      ])),
    );
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(
        keys.filter((key) => key.indexOf(CACHE_NAME) !== 0)
          .map((key) => caches.delete(key)),
      )),
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => (
        cachedResponse || fetch(event.request)
      )),
    );
  });
}

module.exports = (isAdmin) => {
  const manifestURI = isAdmin
    ? '/static/admin/manifest.json'
    : '/static/manifest.json';

  const webpackChunks = (() => {
    const chunkNames = isAdmin
      ? build.adminChunks
      : build.clientChunks;

    return chunkNames.map((name) => `'${name}'`)
      .join(',');
  })();

  const styleChunks = (() => {
    const chunkNames = isAdmin
      ? build.adminStyleChunks
      : build.clientStyleChunks;

    return chunkNames
      .map((name) => `'${name}'`)
      .join(',');

  })();

  let manifestString = manifest
    .toString()
    .match(/function manifest\(\) {\n(.*)\n}/sm)[1];

  const injections = new Map([
    [s('cache-name'), require('../version').hash()],
    [s('webpack-chunks'), webpackChunks],
    [s('style-chunks'), styleChunks],
    [s('manifest-uri'), `'${manifestURI}'`],
  ]);

  injections.forEach((value, placeholder) => {
    manifestString = manifestString.replace(placeholder, value);
  });

  return manifestString
    .replace(/,\s*,/gm, ',');
};

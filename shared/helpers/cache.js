import StoreSingleton from '../idb/singleton';

const offlineStorage = new StoreSingleton();

/**
 * Fetchs a remote image with, then returns its base64-encoded content.
 * @param {String} src
 * @returns {Promise}
 */
const imageToURI = (src) => new Promise((resolve) => fetch(src, { mode: 'no-cors' })
  .then((response) => response.blob())
  .then((blob) => {
    if (blob.size === 0) {
      resolve(src);
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(src);
    reader.readAsDataURL(blob);
  }));

/**
 * Loads an image from local storage, if possible, or fetchs it.
 * @param {String} src
 * @returns {Promise}
 */
const loadImage = (src) => new Promise(async (resolve) => {
  if (!src) {
    return;
  }

  if (sessionStorage.getItem('noIdb') === 'true' || src.startsWith('data:')) {
    return resolve(src);
  }

  await offlineStorage.switchObjectStore('images');

  const cachedImage = await offlineStorage.get(src);
  if (cachedImage) {
    return resolve(cachedImage.imageURI);
  }

  const imageURI = await imageToURI(src);

  await offlineStorage.set(src, {
    createdAt: new Date().getTime(),
    imageURI,
  });

  return resolve(imageURI);
});

/**
 * Precaches a image (browser managed caching) before displaying.
 * Util for rendering all images before page loads.
 * @param {String} src
 * @returns {Promise}
 */
const precacheImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();

  const tickOnLoad = (func) => (event) => {
    const loadedImage = event.path
      ? event.path[0]
      : event.target
        ? event.target
        : undefined;

    if (loadedImage === undefined || !loadedImage.src) {
      reject(src);
    }

    func(loadedImage.src);
    loadedImage.remove();
  };

  image.addEventListener('load', tickOnLoad(resolve));
  image.addEventListener('error', tickOnLoad(reject));
  image.src = src;
});

export { imageToURI, loadImage, precacheImage };

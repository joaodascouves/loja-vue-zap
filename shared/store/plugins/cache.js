import StoreSingleton from '../../idb/singleton';

if (!window._isStoreCacheable) {
  window._isStoreCacheable = true;
}

const offlineStorage = new StoreSingleton();

const cache = (store) => {
  store.subscribe(async (mutation) => {
    const { type, payload } = mutation;

    if (!payload || payload.isCached === true) {
      return;
    }

    if (/ITEMS_GET$/.test(type)) {
      const prop = type.match(/(\w+)_\w+/)[1].toLowerCase();

      const context = type.split('/');
      context.pop();
      context.push(prop);

      await offlineStorage.switchObjectStore('snapshots');

      await offlineStorage.set(context[0], {
        createdAt: new Date().getTime(),
        state: payload.items,
      });
    }
  });
};

export default cache;

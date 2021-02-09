class OfflineStorage {
  constructor(params) {
    const { name, version, objectStores } = params;

    console.log('IDB Instanciado com versão ', version);

    this.name = name;
    this.version = version;
    this.objectStores = objectStores;
    this.objectStore = null;

    this.db = null;
  }

  initialize(objectStore = null) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);

      if (objectStore) {
        this.objectStore = objectStore;
      }

      request.onupgradeneeded = () => {
        this.db = request.result;
        this.objectStores.forEach((store) => {
          // request.result.createObjectStore(store)
          if (!request.result.objectStoreNames.contains(store)) {
            request.result.createObjectStore(store);
          }
        });

        request.transaction.oncomplete = () => resolve();
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  switchObjectStore(name) {
    return new Promise(async (resolve) => {
      if (!this.db) {
        try {
          await this.initialize();
        } catch (error) {
          indexedDB.deleteDatabase(this.name);
          sessionStorage.setItem('noIdb', true);

          console.error('IndexDB failed', error);
        }
      }

      this.objectStore = name;
      resolve();
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStores, 'readonly')
        .objectStore(this.objectStore)
        .get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStores, 'readwrite')
        .objectStore(this.objectStore)
        .put(value, key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStores, 'readwrite')
        .objectStore(this.objectStore)
        .delete(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      const request = this.db
        .transaction(this.objectStores, 'readwrite')
        .objectStore(this.objectStore)
        .clear();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export default OfflineStorage;

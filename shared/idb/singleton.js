import OfflineStorage from './index';

class StoreSingleton extends OfflineStorage {
  constructor() {
    if (StoreSingleton.instance) {
      return StoreSingleton.instance;
    }

    const options = {
      name: 'store',
      version: 1,
      objectStores: ['snapshots', 'images'],
    };

    super(options);
    StoreSingleton.instance = this;
  }
}

export default StoreSingleton;

import { compareObjects } from 'shared/helpers';

export default {
  ITEM_SAVE(state, savedItem) {
    const update = (collection) => {
      const item = collection.find((item) => item && item._id === savedItem._id);

      if (item) {
        Object.entries(savedItem).forEach(([key, value]) => {
          item[key] = value;
        });
      } else {
        collection.push(savedItem);
      }
    };

    state.item = savedItem;

    if (savedItem._id) {
      update(state.items);
      update(state.filtered);
    }
  },
  ITEM_GET(state, item) {
    state.item = item;
  },
  ITEMS_GET(state, { items }) {
    const newItems = items.map((item) => ({ ...item, cachedImages: 0 }));

    state.items = newItems;
    state.filtered = newItems;
  },
  ITEMS_ADD(state, items) {
    state.items = [...(state.items || []), ...items];
    state.filtered = state.items;
  },
  ITEM_REMOVE(state, removedItem) {
    const update = (collection) => collection.filter((item) => item._id !== removedItem._id);

    state.items = update(state.items);
    state.filtered = update(state.filtered);
  },
  ITEMS_FILTER(state, params) {
    state.filtered = state.items.filter((item) => Object.entries(params).reduce((a, [param, { value, $exactMatch }]) => {
      if (!a) {
        return false;
      }

      if (item[param] === null) {
        return false;
      }

      if (
        value === 'all'
          || !value
          || (typeof value === 'object' && value.length === 0)
      ) {
        return true;
      }

      switch (typeof item[param]) {
      case 'object': {
        return typeof value === 'string'
          ? item[param].includes(value)
          : typeof value === 'object'
            ? compareObjects(value, item[param])
            : item[param].filter((p) => value.filter((v) => v === p).length > 0)
              .length > 0;
      }
      case 'string': {
        return $exactMatch
          ? item[param] === value
          : item[param].toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1;
      }
      case 'number':
      default: {
        return !isNaN(value)
          ? item[param] === value
          : (() => {
            /* eslint-disable no-unused-vars */
            const [matches, operator, number] = value.match(
              /^([^0-9]+)([0-9]+)$/,
            );
              /* eslint-enable no-unused-vars */

            switch (operator) {
            case '>=':
              return item[param] >= number;
            case '<=':
              return item[param] <= number;
            case '>':
              return item[param] > number;
            case '<':
              return item[param] < number;
            default:
              return false;
            }
          })();
      }
      }
    }, true));
  },
  ITEMS_CLEAR_FILTER(state) {
    state.filtered = state.items;
  },
  ITEM_CACHEDIMAGE_SET(state, params) {
    const { _id, image, images } = params;

    const update = (collection) => {
      if (!collection) {
        return;
      }

      const item = Array.isArray(collection)
        ? collection.find((item) => item._id === _id)
        : collection;

      if (item) {
        item.image = image || item.image;
        item.images = images || item.images;

        item.cachedImages = !!image + (images || []).length;
      }
    };

    if (state.item._id === _id) {
      update(state.item);
    } else {
      update(state.items);
      update(state.filtered);
    }
  },
  LOADING_SHIFT(state, value) {
    state.loading = value;
  },
  ERROR_SET(state, error) {
    state.error = error;
  },
  ERROR_CLEAR(state, ref) {
    state.error = {
      ref,
    };
  },
  INFO_SET(state, info) {
    state.info = info;
  },
  INFO_CLEAR(state) {
    state.info = undefined;
  },
};

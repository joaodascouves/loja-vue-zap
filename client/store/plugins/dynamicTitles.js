const dynamicTitles = (store) => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation;

    switch (type) {
    case 'product/ITEM_GET':
    case 'product/ITEM_SAVE':
      if (payload.title) {
        window.setDocumentTitle(payload.title);
      }

      break;

    case 'product/ITEMS_FILTER':
      if (payload.categories && payload.categories.value.length > 0) {
        const {
          categories: {
            value: [{ slug }],
          },
        } = payload;

        const { title } = state.category.items.find(
          (category) => category.slug === slug,
        ) || { title: slug };

        setDocumentTitle(title);
      } else if (payload.title && payload.title.value.length > 0) {
        window.setDocumentTitle(payload.title.value);
      } else {
        window.setDocumentTitle('Todos os produtos');
      }

      break;

    default:
      break;
    }
  });
};

export default dynamicTitles;

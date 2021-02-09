/* eslint-disable */

export default {
  item: (state) => state.item,
  items: (state) => state.items || [],
  itemsCount: (state) => (!state.items ? 0 : !isNaN(state.items.length) ? state.items.length : 0),
  filtered: (state) => state.filtered || [],
  filteredCount: (state) => (!isNaN(state.filtered.length) ? state.filtered.length : 0),
  error: (state) => state.error,
  info: (state) => state.info,
  anyMessage: (state) => (state.error.message
      ? state.error.message
      : state.info && state.info.message),
  isLoading: (state) => state.loading,
};

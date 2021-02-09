const toastNotifier = (store) => {
  store.subscribe((mutation) => {
    if (/(SAVE|GET|REMOVE)$/.test(mutation.type)) {
      store.dispatch('shiftLoading', false);
    }
  });
};

export default toastNotifier;

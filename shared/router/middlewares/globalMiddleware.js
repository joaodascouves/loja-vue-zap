let _hasClientLoaded = false;

const _onLoadedOnce = () => {
  setDocumentTitle(window._oldTitle);

  _hasClientLoaded = true;
  document.removeEventListener('clientLoaded', _onLoadedOnce);
};

const setDocumentTitle = (title) => {
  const newTitle = title || 'carregando';

  document.title = window._businessName
    ? `${window._businessName} | ${newTitle}`
    : `${newTitle}`;

  window._oldTitlte = newTitle;
};

document.addEventListener('clientLoaded', _onLoadedOnce);

const globalPreMiddleware = async ([to, from]) => {
  window._fromRoute = from;
  window.scrollTo(0, 0);

  return new Promise((resolve) => {
    if (_hasClientLoaded === true) {
      return resolve();
    }

    const _onConfigLoaded = ({ detail }) => {
      if (detail._id) {
        document.removeEventListener('clientLoaded', _onConfigLoaded);
        return resolve();
      }
    };

    document.addEventListener('clientLoaded', _onConfigLoaded);
  });
};

const globalPostMiddleware = ([to]) => {
  const { title } = to.meta;

  if (title && !['Produto', 'Produtos'].includes(title)) {
    setDocumentTitle(title);
  }
};

Object.assign(window, {
  setDocumentTitle,
});

export { globalPreMiddleware, globalPostMiddleware };

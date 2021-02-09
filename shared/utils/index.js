export const createShareIntent = (params) => new Promise(async (resolve, reject) => {
  if (!('share' in navigator)) {
    return reject('Use um navegador mobile compatível');
  }

  if (params.files && params.files.length > 0) {
    if (
      !('canShare' in navigator)
        || !navigator.canShare({ files: params.files })
    ) {
      return reject(
        'Verifique a extensão dos arquivos, ou use um navegador compativel',
      );
    }
  }

  try {
    await navigator.share(params);
    resolve();
  } catch (error) {
    reject(error);
  }
});

export const startWhatsAppChat = (params) => {
  const isIos = /iPad|iPhone|iPod/.test(window.navigator.platform);
  const isMobile = /Android/.test(window.navigator.userAgent) || isIos;

  let { message, phone } = params;

  message = encodeURI(message);
  message = message.replace(/#/g, '%23');

  let waUrl = `https://${isMobile ? 'api' : 'web'}.whatsapp.com`;
  waUrl += `/send?phone=${phone}&text=${message}`;

  const waWindow = window.open(waUrl, '_blank');
  waWindow.focus();
};

export const headTag = (selector, newAttribute, newValue) => {
  const tag = document.head.querySelector(selector);

  const [match, tagName, attribute, value] = selector.match(
    /^([^\[]+)\[([^=]+)=([^\]]+)/,
  );

  if (tag) {
    tag.setAttribute(attribute, newValue);
  } else {
    const newTag = document.createElement(tagName);

    newTag.setAttribute(attribute, value);
    newTag.setAttribute(newAttribute, newValue);

    document.head.appendChild(newTag);
  }
};

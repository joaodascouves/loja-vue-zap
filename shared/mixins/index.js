import filters from './filters';
import loadImage from './loadImage';
import routes from './routes';

export default {
  filters,
  loadImage,
  routes,

  general: {
    methods: {
      openExternalLink: (link) => {
        const win = window.open(link, '_blank');
        win.focus();
      },
      isMobile: () => {
        const regexList = [
          /Android/i,
          /webOS/i,
          /iPhone/i,
          /iPad/i,
          /iPod/i,
          /BlackBerry/i,
          /Windows Phone/i,
        ];

        regexList.some((regex) => regex.test(navigator.userAgent));
      },
    },
  },
};

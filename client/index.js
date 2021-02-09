import StoreSingleton from 'shared/idb/singleton';
import { loadImage } from 'shared/helpers/cache';
import storageService from 'shared/services/storageService';
import { app, store } from './app';

async function refreshCache() {
  const offlineStorage = new StoreSingleton();

  await offlineStorage.switchObjectStore('snapshots');
  await offlineStorage.clear();

  storageService.remove('client');
  storageService.remove('clientId');
}

const cachedModules = ['product', 'category', 'featured'];

const shiftSplashscreen = (value) => store.dispatch('shiftSplashscreen', value);
const mustBeRefreshed = /[^\w]refreshCache=true/.test(location.search);

if (mustBeRefreshed) {
  refreshCache();

  // eslint-disable-next-line no-console
  console.log('cache refreshed');
}

store.dispatch('client/get').then(
  async (configuration) => {
    const storesInit = cachedModules.map(async (module) => store
      .dispatch(`${module}/init`, {
        noCache: mustBeRefreshed,
      })
      .then(async ({ name, isCached }) => {
        // eslint-disable-next-line no-console
        console.log(`${name} loaded ${isCached ? 'from cache' : ''}`);
      }));

    // Promise.all(storesInit)
    //   .then(() => shiftSplashscreen(false));

    // shiftSplashscreen(true);

    loadImage(configuration.logo).then((image) => {
      app.$root.$c_cachedLogo = image;
      app.$root.$c_business = configuration;
      app.$root.$c_theme = configuration.theme;
      app.$root.$c_inputStyle = 'contrast rounded';
      app.$root.$c_buttonStyle = 'padded-1 contrast rounded';
    })
      .finally(() => {
        app.$mount('#root');
      });
  },
  (error) => {
    document.write(`
<h1>Domínio mal configurado</h1>
<pre style="overflow: auto; width: 100vw">
Esse erro pode ter sido causado pelos seguintes motivos:

- alteração nos registros DNS
- atraso na quitação de faturas

Se você é o proprietário desse domínio, contate o suporte.
Mensagem do servidor:
<samp>
  ${error}
</samp>

Se você é cliente, e deseja acessar a loja, procure-nos nas nossas redes sociais ou na loja física enquanto o problema é resolvido.
Lamentamos o incoveniente.
</pre>
  `);
  },
);

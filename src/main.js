import { createApp } from 'vue';
import App from './App.vue';
import fetchSettings from './settings';
import getRouter from './router';
import getStore from './store';
import './styles/global.scss';
import './styles/theme-default.scss';

async function initSite() {
  const settings = await fetchSettings();
  const { router, routes, sidebarRoutes } = await getRouter(settings);
  const store = getStore(routes, sidebarRoutes, settings);

  createApp(App).use(router).use(store).mount('#app');
}

export default initSite;

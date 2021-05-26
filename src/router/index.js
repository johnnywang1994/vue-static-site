import { createRouter, createWebHistory } from 'vue-router';
import hljs from 'highlight.js';
import getRoutes from './route';

/**
 * getRouter
 * @param {*} settings
 * description: create router by looping folder
 */
async function getRouter(settings) {
  const { routes, sidebarRoutes } = await getRoutes(settings);

  // create router
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // highlight
  router.afterEach(() => {
    // wait for dom render
    setTimeout(() => {
      hljs.highlightAll();
    });
  });

  return {
    router,
    routes,
    sidebarRoutes, // routes for sidebar
  };
}

export default getRouter;

import fetchLayouts from './layout';
import fetchBookRoutes from './book';
import fetchCustomRoutes from './custom';
import Home from '../views/Home.vue';

async function getRoutes(settings) {
  const layouts = await fetchLayouts(settings);
  settings.layout = layouts;

  const { bookRoutes, sidebarRoutes } = await fetchBookRoutes(settings);

  const customRoutes = await fetchCustomRoutes(settings);

  const routes = [
    ...(settings.homeConfig
      ? [
          {
            name: 'Home',
            path: '/',
            component: Home,
          },
        ]
      : []),
    ...bookRoutes,
    ...customRoutes,
  ];

  return { routes, sidebarRoutes };
}

export default getRoutes;

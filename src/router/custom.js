import { fetchComponent } from './utils';

async function fetchCustomRoute(customRoute, layout) {
  const component = await fetchComponent(customRoute.component);
  const { layout: targetLayout } = customRoute;

  if (targetLayout) {
    const settingLayout = layout[targetLayout];
    // wrap component in layout
    if (settingLayout) {
      customRoute.component = settingLayout;
      customRoute.children = [
        {
          path: '',
          component,
        },
      ];
      customRoute.layout = null;
      delete customRoute.layout;
    } else {
      customRoute.component = component;
    }
  } else {
    customRoute.component = component;
  }
}

async function fetchCustomRoutes(settings) {
  const { customRoutes, layout } = settings;

  if (customRoutes) {
    const templates = [];
    customRoutes.forEach((customRoute) => {
      templates.push(fetchCustomRoute(customRoute, layout));
    });

    await Promise.all(templates);
  }

  return customRoutes || [];
}

export default fetchCustomRoutes;

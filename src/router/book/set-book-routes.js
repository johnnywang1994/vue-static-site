import axios from 'axios';
import compileMarked from '../marked';

/**
 * setRouteComponent
 * @param {*} routes
 * @param {*} route
 * @param {*} mergedComponents
 * description: fetch route component
 */
async function setBookRouteComponent(route) {
  if (route.file) {
    const { data: rawText } = await axios.get(route.file);
    // match for nav title
    const title = rawText.match(/#\s{1}(.*)/);
    const { template, components } = compileMarked(rawText);

    route.title = title ? title[1] : 'no-title';
    route.component = {
      template,
      components,
    };
    route.file = null;
    delete route.file;
  }
}

/**
 * setRouteFolder
 * @param {*} routes
 * description: set route folder
 */
async function setBookRoutes(routes) {
  return Promise.all(
    routes.map((route) => {
      if (route.children) {
        return setBookRoutes(route.children);
      }
      return setBookRouteComponent(route);
    }),
  );
}

export default setBookRoutes;

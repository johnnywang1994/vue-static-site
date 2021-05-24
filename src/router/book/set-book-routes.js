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
    const { data: template } = await axios.get(route.file);
    // match for nav title
    const title = template.match(/#\s{1}(.*)/);

    route.title = title ? title[1] : 'no-title';
    route.component = {
      template: compileMarked(template),
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

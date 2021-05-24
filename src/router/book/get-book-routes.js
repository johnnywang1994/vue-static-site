import axios from 'axios';

/**
 * parseFileList
 * @param {*} path 
 * description: parse folder filelist to routes
 */
async function parseFileList(fileList, parentPath, docRoute) {
  const { bookConfig } = window.__md_settings__;
  const routes = [];
  const promises = [];

  fileList.forEach((filename) => {
    if (filename === 'index') return;
    const routePath = `${parentPath}/${filename}`;
    const [, pathname, exp] = filename.match(/([^.]*).{1}(\w+)/);

    if (exp === 'md') {
      const isIndex = filename === (bookConfig.index || 'README.md');
      const path = parentPath + (isIndex ? '' : `/${pathname}`);
      routes.push({
        path: `${docRoute.path}${path || '/'}`,
        file: `${docRoute.source}${routePath}`,
        component: null,
      })
    } else {
      // parse filelist recursive
      promises.push(getBookRoutes(docRoute, routePath));
    }
  })

  const result = await Promise.all(promises);
  result.forEach(({ path, routes: children }) => {
    routes.push({
      title: path.split('/').slice(-1)[0], // filename as folder title
      path,
      children,
    });
  });

  return {
    path: parentPath,
    routes,
  };
}

// fetch & parse folder filelist
async function getBookRoutes(docRoute, path) {
  const { data } = await axios.get(`${docRoute.source}${path}`);
  return parseFileList(data, path, docRoute);
}

export default getBookRoutes;

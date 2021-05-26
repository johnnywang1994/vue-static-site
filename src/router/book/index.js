import setBookRoutes from './set-book-routes';
import getBookRoutes from './get-book-routes';
import Book from '../../views/Book.vue';

function flattenRoutes(routes) {
  return routes.reduce(
    (t, c) => t.concat(c.children ? flattenRoutes(c.children) : [c]),
    [],
  );
}

async function fetchBookRoute(docRoute) {
  // parse root routes
  const { routes } = await getBookRoutes(docRoute, '');

  // set each route component
  await setBookRoutes(routes);

  return {
    sidebarRoute: routes,
    docRoutes: flattenRoutes(routes), // routes without structure
  };
}

async function fetchBookRoutes(settings) {
  const { bookRoutes } = settings;

  const childrens = [];
  const sidebarRoutes = {};

  // handle book routes
  if (bookRoutes) {
    bookRoutes.forEach((bookRoute) => {
      bookRoute.component = Book;
      childrens.push(fetchBookRoute(bookRoute));
    });

    const result = await Promise.all(childrens);
    result.forEach(({ docRoutes, sidebarRoute }, index) => {
      bookRoutes[index].children = docRoutes;
      sidebarRoutes[bookRoutes[index].path] = sidebarRoute;
    });
  }

  return {
    bookRoutes: bookRoutes || [],
    sidebarRoutes,
  };
}

export default fetchBookRoutes;

(function(global) {

  const settings = {
    // cache: '/service-worker.js',
    // global config
    sitename: 'Johnny Wang Blog',
    // config for default home page
    // if not exist, will remove default home page
    homeConfig: {
      heroImage: '/assets/me.jpg',
      description: "Welcome! Here is my personal blog",
      actions: [
        {
          content: 'Enter Book →',
          href: '/book',
        },
        {
          content: 'Enter Project →',
          href: '/project',
        }
      ],
      features: [
        {
          title: 'Frontend Development',
          list: [
            'Vuejs 3+years(major)',
            'Nuxtjs 2+years',
            'Reactjs 1+years',
            'JavaScript 3+years',
            'Webpack 3+years',
            'SCSS 3+years',
          ],
        },
        {
          title: 'Backend Development',
          list: [
            'Expressjs 3+years',
            'Nodejs 2+years',
            'Docker 1+years',
            'Django 0.5+years',
            'MySQL 0.5+years',
          ],
        },
        {
          title: 'Implement',
          list: [
            {
              content: '[NPM] jspdf-html2canvas',
              href: 'https://www.npmjs.com/package/jspdf-html2canvas',
            },
            {
              content: '[NPM] remockjs',
              href: 'https://www.npmjs.com/package/remockjs',
            },
            {
              content: 'Virtual-Dom Implement',
              href: 'https://github.com/johnnywang1994/tiny-vnode',
            },
            {
              content: 'MVVM Implement',
              href: 'https://github.com/johnnywang1994/mivm.git',
            },
          ]
        },
      ],
      footer: 'Made by johnnywang with ❤️',
    },
    // config for markdown books
    bookConfig: {
      index: 'README.md',
    },
    // register layouts
    layout: {
      Default: '/docs/layout/Default.vue',
    },
    bookRoutes: [
      {
        name: 'Book',
        path: '/book',
        source: '/docs/book',
      },
    ],
    customRoutes: [
      {
        name: 'Project',
        layout: 'Default',
        path: '/project',
        component: '/docs/template/Project.vue',
      },
    ],
  };

  // expost to window
  global.__md_settings__ = settings;

})(window);
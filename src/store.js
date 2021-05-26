import { createStore } from 'vuex';

const UPDATE_SIDEBAR_OPEN = 'UPDATE_SIDEBAR_OPEN';

const appStates =
  ({ routes, sidebarRoutes, settings }) =>
  () => ({
    sidebarRoutes,
    globalRoutes: routes,
    globalSettings: settings,
    openSidebar: false,
  });

const actions = {
  updateSidebar({ commit }, bool) {
    commit(UPDATE_SIDEBAR_OPEN, bool);
  },
};

const mutations = {
  [UPDATE_SIDEBAR_OPEN](state, bool) {
    if (typeof bool === 'boolean') {
      state.openSidebar = bool;
    } else {
      state.openSidebar = !state.openSidebar;
    }
  },
};

function getStore(routes, sidebarRoutes, settings) {
  const store = createStore({
    strict: true,
    state: appStates({ routes, sidebarRoutes, settings }),
    actions,
    mutations,
  });

  return store;
}

export default getStore;

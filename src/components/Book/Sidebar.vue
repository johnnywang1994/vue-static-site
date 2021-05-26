<template>
  <div :class="['sidebar', { open: openSidebar, fixpc }]">
    <nav-links @click="updateSidebar" />
    <sidebar-links :routes="currentSidebar" group />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SidebarLinks from './SidebarLinks.vue';
import NavLinks from '../NavLinks.vue';

export default {
  name: 'SideBar',
  components: {
    SidebarLinks,
    NavLinks,
  },
  props: {
    fixpc: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['sidebarRoutes', 'openSidebar']),
    currentSidebar() {
      return this.sidebarRoutes[this.$route.matched[0].path];
    },
  },
  methods: {
    ...mapActions(['updateSidebar']),
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 3.6rem;
  bottom: 0;
  width: 22rem;
  z-index: 10;
  margin: 0;
  background-color: #fff;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  transition: transform 0.2s ease;
  @include noTouchOrSelect;

  &:not(.fixpc) {
    display: none;
    @media (max-width: 719px) {
      display: block;
    }
  }

  > .sidebar-links {
    padding: 1.5rem 0;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid #eaecef;
    padding: 0.5rem 0 0.75rem;
    .nav-item {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
      &:first-child {
        margin-left: 0;
      }
      .nav-link {
        line-height: 1.4rem;
        color: inherit;
        font-weight: 600;
        &.router-link-active {
          color: #3eaf7c;
        }
      }
    }
  }

  @media (max-width: 959px) {
    font-size: 15px;
    width: 16.4rem;
  }

  @media (max-width: 719px) {
    top: 0;
    padding-top: 3.6rem;
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
    .nav-links {
      display: block;
    }
  }
}
</style>

<template>
  <header class="navbar">
    <div class="sidebar-button" @click="updateSidebar">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512" class="icon"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
    </div>
    <router-link to="/" class="home-link" @click="updateSidebar(false)">
      <span class="site-name">{{ globalSettings.sitename }}</span>
    </router-link>
    <div class="links">
      <nav-links />
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavLinks from './NavLinks.vue';

export default {
  name: 'Navbar',
  components: {
    NavLinks,
  },
  computed: {
    ...mapState(['globalSettings']),
  },
  methods: {
    ...mapActions(['updateSidebar']),
  },
}
</script>

<style lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  z-index: 20;
  height: 3.6rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  @media (max-width: 719px) {
    padding-left: 4rem;
  }

  > .sidebar-button {
    cursor: pointer;
    position: absolute;
    display: none;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.6rem;
    top: 0.6rem;
    left: 1rem;
    box-sizing: content-box;
    > .icon {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
    }
    @media (max-width: 719px) {
      display: block;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color: #fff;
    white-space: nowrap;
    font-size: 1rem;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
    display: flex;
    .nav-links {
      display: inline-block;
      @media (max-width: 719px) {
        display: none;
      }
      .nav-item {
        position: relative;
        display: inline-block;
        margin-left: 1.5rem;
        line-height: 2rem;
        &:first-child {
          margin-left: 0;
        }
        .nav-link {
          line-height: 1.4rem;
          color: inherit;
          &:hover {
            margin-bottom: -3px;
            border-bottom: 3px solid #46bd87;
          }
        }
      }
    }
  }
}
</style>

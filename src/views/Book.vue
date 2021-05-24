<template>
  <navbar />
  <sidebar fixpc />
  <markdown-page>
    <router-view />
  </markdown-page>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Book/Sidebar.vue';
import MarkdownPage from '../components/Book/MarkdownPage.vue';

export default {
  name: 'Book',
  components: {
    Navbar,
    Sidebar,
    MarkdownPage,
  },
  methods: {
    checkHeaderAnchor() {
      const { hash } = window.location;
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(
            decodeURIComponent(hash)
          );
          window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }, 500);
      }
    },
  },
  mounted() {
    this.checkHeaderAnchor();
  },
};
</script>

<style lang="scss">
// ...
</style>

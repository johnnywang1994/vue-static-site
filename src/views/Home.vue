<template>
  <navbar />
  <sidebar />
  <default-home />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Book/Sidebar.vue';
import DefaultHome from '../components/Home/DefaultHome.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    DefaultHome,
  },
};
</script>

<style lang="scss">
// ...
</style>

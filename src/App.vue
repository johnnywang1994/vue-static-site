<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route() {
      // console.log(this.$route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss">
#app {
  // ...
}
</style>

<template>
  <nav class="nav-links">
    <div
      v-for="route in globalRoutes.slice(1)"
      :key="`nav-${route.path}`"
      class="nav-item"
    >
      <router-link :to="route.path" class="nav-link">
        {{ route.name }}
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavLinks',
  computed: {
    ...mapState(['globalRoutes']),
  },
};
</script>

<style lang="scss">
// ...
</style>

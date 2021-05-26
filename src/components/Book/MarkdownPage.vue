<template>
  <main class="markdown-page" @click="updateSidebar(false)">
    <div class="theme-default-content">
      <slot></slot>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MarkdownPage',
  methods: {
    ...mapActions(['updateSidebar']),
  },
};
</script>

<style lang="scss">
.markdown-page {
  padding-left: 22rem;
  @media (max-width: 959px) {
    padding-left: 16.4rem;
  }
  @media (max-width: 719px) {
    padding-left: 0;
  }
}
</style>

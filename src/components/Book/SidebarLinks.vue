<template>
  <ul class="sidebar-links">
    <li v-for="(route, index) in routes" :key="'route' + route.title">
      <template v-if="route.children">
        <section :class="{ 'sidebar-group': group }">
          <h3 class="sidebar-heading" @click="onOpenTab(index)">
            <span>{{ route.title }}</span>
            <span
              :class="[
                'arrow',
                opened[index] || $route.path.includes(route.path)
                  ? 'down'
                  : 'right',
              ]"
            ></span>
          </h3>
          <sidebar-links
            v-show="opened[index] || $route.path.includes(route.path)"
            :routes="route.children"
          />
        </section>
      </template>
      <router-link
        v-else
        :to="route.path"
        :class="['sidebar-link', { active: route.path === $route.path }]"
        @click="updateSidebar"
      >
        {{ route.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SidebarLinks',
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      opened: [],
    };
  },
  created() {
    this.opened = Array(this.routes.length).fill(false);
  },
  methods: {
    ...mapActions(['updateSidebar']),
    onOpenTab(index) {
      this.opened[index] = !this.opened[index];
    },
  },
};
</script>

<style lang="scss">
.sidebar-links {
  list-style-type: none;
  .sidebar-group {
    margin-top: 0.75rem;
  }

  .sidebar-heading {
    color: #2c3e50;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0.35rem 1.5rem 0.35rem 1.25rem;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    border-left: 0.25rem solid transparent;
    transition: color 0.15s ease;
    > .arrow {
      position: relative;
      display: inline-block;
      width: 0;
      height: 0;
      top: -0.12em;
      left: 0.5em;
      &.right {
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 6px solid #ccc;
      }
      &.down {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid #ccc;
      }
    }
  }

  a.sidebar-link {
    display: inline-block;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 2rem;
    border-left: none;
    font-size: 1em;
    font-weight: 400;
    color: #2c3e50;
    cursor: pointer;
    border-left: 0.25rem solid transparent;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    line-height: 1.4;
    width: 100%;
    box-sizing: border-box;
    &:hover {
      color: #3eaf7c;
    }
    &.active {
      font-weight: 600;
      color: #3eaf7c;
      border-left-color: #3eaf7c;
    }
  }

  section > .sidebar-links {
    padding-left: 1.25rem;
  }
}
</style>

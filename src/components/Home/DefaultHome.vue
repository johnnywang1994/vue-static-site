<template>
  <main class="default-home" @click="updateSidebar(false)">
    <header class="hero">
      <img :src="config.heroImage" />
      <h1 id="main-title">{{ globalSettings.sitename }}</h1>
      <p class="description">{{ config.description }}</p>
      <p v-if="config.actions && config.actions.length" class="action">
        <router-link
          v-for="(action, index) in config.actions"
          :key="`action_${action.href || index}`"
          :to="action.href"
          class="action-btn"
        >
          {{ action.content }}
        </router-link>
      </p>
    </header>
    <div v-if="config.features && config.features.length" class="features">
      <div
        v-for="feature in config.features"
        :key="`feature_${feature.title}`"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <ul v-if="feature.list">
          <li
            v-for="item in feature.list"
            :key="`feature_${feature.title}_${item}`"
          >
            <template v-if="typeof item === 'string'">
              {{ item }}
            </template>
            <a v-else :href="item.href" target="_blank">
              {{ item.content }}
            </a>
          </li>
        </ul>
        <p v-else>{{ feature.content }}</p>
      </div>
    </div>
    <div v-if="config.footer" class="footer">
      {{ config.footer }}
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DefaultHome',
  computed: {
    ...mapState(['globalSettings']),
    config() {
      return this.globalSettings.homeConfig;
    },
  },
  methods: {
    ...mapActions(['updateSidebar']),
  },
};
</script>

<style lang="scss">
.default-home {
  padding: 3.6rem 2rem 0;
  max-width: 960px;
  margin: 0 auto;
  display: block;
  @include noTouchOrSelect;

  .hero {
    text-align: center;
    @media (max-width: 419px) {
      min-height: 75vh;
    }

    > img {
      max-height: 320px;
      display: block;
      margin: 3rem auto 1.5rem;
      @media (max-width: 419px) {
        max-height: 300px;
        margin: 2rem auto 1.2rem;
      }
    }

    h1,
    .description,
    .action {
      margin: 1.8rem auto;
      @media (max-width: 419px) {
        margin: 1.2rem auto;
      }
    }

    h1 {
      font-size: 3rem;
      @media (max-width: 419px) {
        font-size: 2rem;
      }
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: #6a8bad;
      margin: auto;
      @media (max-width: 419px) {
        font-size: 1.2rem;
      }
    }

    .action-btn {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: #3eaf7c;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid #389d70;
      &:hover {
        background-color: #4abf8a;
      }
      &:not(:first-child) {
        margin-left: 8px;
      }
      @media (max-width: 419px) {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
  }

  .features {
    border-top: 1px solid #eaecef;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
    @media (max-width: 719px) {
      flex-direction: column;
    }
    .feature {
      flex-grow: 1;
      flex-basis: 30%;
      max-width: 30%;
      h2 {
        font-size: 1.4rem;
        font-weight: 500;
        border-bottom: none;
        padding-bottom: 0;
        color: #3a5169;
      }
      ul {
        padding-left: 1.5rem;
      }
      p {
        color: #4e6e8e;
      }
      @media (max-width: 719px) {
        max-width: 100%;
        padding: 0 2.5rem;
        h2 {
          margin-top: 0.8em;
        }
      }
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid #eaecef;
    text-align: center;
    color: #4e6e8e;
  }
}
</style>

<template>
  <div :class="{ 'auth-bg': $route.path == '/' }">
    <v-app class="custom-font">
      <router-view />
    </v-app>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped lang="scss">
@import './assets/style/main.scss';
</style>

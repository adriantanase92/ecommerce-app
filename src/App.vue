<template>
  <div :class="{ 'auth-bg': $route.path == '/' }">
    <v-app class="custom-font">
      <router-view />
      <v-btn v-if="$route.path != '/'" @click="logout" class="logout" outlined large fab color="black"><i class="fas fa-sign-out-alt"></i></v-btn> 
    </v-app>
  </div>
</template>

<script>
import Constants from './services/Constants';

export default {
  name: 'App',
  methods: {
      logout() {
        localStorage.removeItem('user-token');
        this.$router.push({
            name: Constants.ROUTES.AUTH
        });        
      }      
  }    
};
</script>

<style scoped lang="scss">
@import './assets/style/main.scss';
</style>

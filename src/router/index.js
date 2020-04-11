import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterService from '../services/RouterService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: RouterService.getRoutes()
})

router.beforeEach((to, from, next) => {
  let publicRoutes = [
    'auth'
  ];

  if(publicRoutes.indexOf(to.name) == -1 && !localStorage.getItem('user-token')) {
    
    next('/');
  } else {

    if(!from.name || to.name == 'products' || to.name == 'auth'){
      let token = localStorage.getItem('user-token');

      if(to.name === 'auth' && token){
        return next('/products');
      }
      else{
        return next();
      }
    }

    if(from.name === to.name){
      return next();
    }  
  }
});

export default router

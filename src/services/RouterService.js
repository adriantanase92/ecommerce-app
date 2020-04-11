import Products from '../views/Products.vue';
import Auth from '../views/Auth.vue';

export default {
    getRoutes() {
      return [
        {
            path: '/',
            name: 'auth',
            component: Auth,
        },
        {
            path: '/products',
            name: 'products',
            component: Products
        },
      ];
    },
};
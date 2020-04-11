import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#e91e63',
                secondary: '#9c27b0',
                error: '#B71C1C',
                success: '#388E3C',
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },      
});

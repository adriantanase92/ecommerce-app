<template>
  <div class="page">
    <div class="products">
      <v-container class="products-list py-10">
        <v-row align="center" align-content="center">
          <v-col 
            v-for="product in this.products" 
            v-bind:data="product" 
            v-bind:key="product.id" 
            cols="12" sm="6" md="3">
            <v-card class="product elevation-1" outlined tile>
              <img v-bind:src="product.picture" class="product-img mb-4">
              <h3 class="text-center subtitle-1 mb-8">{{ product.name }}</h3>
              <v-row justify="space-between" align="center" align-content="center">
                <v-col cols="6" class="text-left">
                  <span class="font-weight-light grey--text">${{ product.price }}</span>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn small rounded color="primary" dark>Details</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row> 
      </v-container>
    </div>

    <v-dialog
      v-model="modal"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </div>
</template>

<script>
import Constants from '../services/Constants';
import Products from '../services/Products';

export default {
  name: 'products',
  data() {
        return {
            constants: Constants,
            products: [],
            modal: false,
        }
    },
    mounted() {
        this.onGetProducts();
    },  
    methods: {
        onGetProducts: function () {
            Products.getProducts()
                .then(result => {
                    this.products = result.data;
                    console.log(result.data);
                })                
                .catch(function(error) {
                    console.error(error);
                }); 
        },       
    }  
}
</script>

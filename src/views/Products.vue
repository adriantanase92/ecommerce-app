<template>
  <div class="page">
    <div class="products">
      <v-container class="products-list pt-12 pb-8 mt-10">
        <v-row v-if="this.products" align="center" align-content="center">
          <v-col 
            v-for="product in this.products" 
            v-bind:data="product" 
            v-bind:key="product.id" 
            cols="12" sm="6" md="4" lg="3">
            <v-card class="product elevation-1" outlined tile>
              <div class="product-img"><img v-bind:src="product.picture"></div>
              <h3 class="text-center subtitle-1 mb-8">{{ product.name }}</h3>
              <v-row justify="space-between" align="center" align-content="center">
                <v-col cols="6" class="text-left">
                  <span class="font-weight-light grey--text">${{ product.price }}</span>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn rounded color="primary" @click="showModal(product.name, product.price, product.description, product.picture)" dark>Details</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row> 
        <div class="text-center" v-else><v-progress-circular indeterminate color="primary" class="bottom" /></div>
      </v-container>
    </div>

    <v-dialog
      v-model="modal"
      width="80%"
      max-width="800"
      overlay-opacity="0.7"
    >
      <div class="product-modal">
        <v-container>
          <v-row align="center" align-content="center">
            <v-col cols="12" md="6" class="text-center">
              <img v-bind:src="productPicture" class="product-modal-img">
            </v-col>
            <v-col cols="12" md="6">
              <div :class="{'pr-6': $vuetify.breakpoint.mdAndUp}">
                <div class="display-1 font-weight-bold mb-2">{{ productName }}</div>
                <div class="product-modal-price grey--text">${{ productPrice }}</div>
                <div class="caption mb-10">
                  <div class="product-modal-description-title primary--text">Description</div>
                  <div class="grey--text text--darken-1">{{ productDescription }}</div>
                </div>
                <div :class="{'text-right':$vuetify.breakpoint.smAndDown}"><v-btn color="primary" rounded small>Add to cart <i class="fas fa-shopping-cart ml-2"></i></v-btn></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <button @click="closeModal" class="product-modal-cancel-icon"><i class="fas fa-times"></i></button>
      </div>
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
            productName: null,
            productPrice: null,
            productDescription: null,
            productPicture: null,                                  
        }
    },
    mounted() {
        this.onGetProducts();
    },  
    methods: {
        onGetProducts() {
            Products.getProducts()
                .then(result => {
                    this.products = result.data;
                }) 
                .catch(error => {
                  if(error) {
                    console.log(error.message);
                  }
                });
        },
        showModal(name, price, description, picture) {
            this.productName = name;
            this.productPrice = price;
            this.productDescription = description;
            this.productPicture = picture;                        
            this.modal = true;
        },
        closeModal() {
          this.modal = false;
        }      
    }  
}
</script>

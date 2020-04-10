<template>
  <div class="page">
    <div class="products">
      <v-container class="products-list py-10">
        <v-row v-if="this.products" align="center" align-content="center">
          <v-col 
            v-for="product in this.products" 
            v-bind:data="product" 
            v-bind:key="product.id" 
            cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6">
              <img v-bind:src="productPicture" class="product-modal-img">
            </v-col>
            <v-col cols="12" sm="6">
              <div class="pr-6">
                <div class="display-1 font-weight-bold mb-2">{{ productName }}</div>
                <div class="product-modal-price grey--text">${{ productPrice }}</div>
                <div class="caption mb-10">
                  <div class="product-modal-description-title primary--text">Description</div>
                  <div class="grey--text text--darken-1">{{ productDescription }}</div>
                </div>
                <v-btn color="primary" rounded small>Add to cart <i class="fas fa-shopping-cart ml-2"></i></v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <button @click="closeModal" class="product-modal-cancel-icon">x</button>
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

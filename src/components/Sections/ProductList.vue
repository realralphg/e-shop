<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Our Products List</h1>
            <div class="row">

                <div class="col-md-4" v-for="product in products" :key="product.index">
                    <div class="card product-item">

                        <carousel :perPage="1">
                          <slide v-for="image in product.images" :key="image.index">
                                <img :src="image" class="card-img-top" alt="..." height="200px">
                          </slide>
                        </carousel>
                        
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-priceS">{{ product.price | currency }}</h5>
                            </div>

                            <add-to-cart
                            :image="getImage(product.images)"
                            :name="product.name"
                            :price="product.price"
                            :productId="product.id"
                            >                                
                            </add-to-cart>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {db} from '@/firebase'

    export default {
        name: 'ProductList',

        data(){
            return{
                products: []
            }
        },

        // F I R E S T O R E 
        firestore () {
            return {
            products: db.collection('products')
            }
        },        

        methods:{
            getImage (images) {
                return images[0]
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .products{    
        background: grey;
        padding-bottom: 3rem;
    }
</style>
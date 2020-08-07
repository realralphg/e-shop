<template>
    <div class="checkout">
        <Navbar/>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-9">
                    <h4 class="pb-4" >Checkout Page</h4>

                    <ul>
                        <li v-for="item in this.$store.state.cart" :key="item.index" class="media">
                            <img :src="item.productImage" alt="..." width="80px" class="align-self-center mr-3">
                            <div class="media-body">
                                <h5 class="mt-0">{{item.productName}}</h5>
                                <span class="xclose float-right" @click="$store.commit('removeFromCart', item)">x</span>
                                <p class="mt-0">{{item.productPrice | currency}}</p>
                                <p class="mt-0">Quantity: {{item.productQuantity}}</p>
                            </div>
                        </li>
                    </ul>                    
                </div>

                <div class="col-md-3">
                    <p>
                        Total Price : {{ this.$store.getters.totalPrice | currency }}
                    </p>
                    
                    <div>
                        <card class='stripe-card'
                            :class='{ complete }'
                            stripe='pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'
                            :options='stripeOptions'
                            @change='complete = $event.complete'
                            />

                        <button class='pay-with-stripe btn btn-primary mt-4' @click='pay' :disabled='!complete'>Pay with credit card</button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Checkout',
        
    }
</script>

<style scoped>
.xclose{
  cursor: pointer;
}

.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
<template>
    <!-- Cart Modal -->
    <div class="modal fade" id="miniCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
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
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
            <button type="button" @click="checkout" class="btn btn-primary">Checkout</button>
        </div>
        </div>
    </div>
    </div>   
</template>

<script>
export default {
  name: 'MiniCart',
  props: {
    msg: String
  },

  methods:{
    checkout(){
      $('#miniCart').modal('hide')
      this.$router.replace('/checkout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}

.xclose{
  cursor: pointer;
}

</style>

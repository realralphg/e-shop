<template>
  <div class="add-to-cart">
    <button class="btn btn-primary">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'add-to-cart',
  props: {
    name: String,
    price: String,
    productId: String,
  },

  data(){
      return{
        productName: this.name,
        productPrice: this.price,
        productID: this.productId,

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

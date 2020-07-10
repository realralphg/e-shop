<template>
    <div >
        <Navbar/>
        <Landing/>
        <Products/>
        <Login/>
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/images/svg/product.svg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat 
              voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? 
              Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
          </div>
        </div>
      </div>        
    </div>
</template>

<script>
  // @ is an alias to /src
  import Landing from "@/components/Landing.vue"
  import Products from "@/components/Sections/Products.vue"
  import Login from "@/components/Login.vue"

  export default {
    name: 'home',
    components: {
        Landing,
        Products,
        Login
    },
    data(){
      return{

      }
    }        
  }
</script>

<style scoped>

</style>
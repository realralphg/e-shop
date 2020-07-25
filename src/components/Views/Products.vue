<template>
  <div class="products">
    <div class="intro h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6">
              <h3>Products Page</h3>
              
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
            </p>
        </div>

        <div class="col-md-6">
            <img src="/images/svg/products.svg" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <hr>

    <h3>Basic CRUD Operations</h3>
    <div class="products-test">
      <div class="form-group">
        <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
      </div>

      <div class="form-group">
        <input type="text" placeholder="Product Price" v-model="product.price" class="form-control">
      </div>  

      <div class="form-group">
        <button @click="savedata" class="btn btn-primary">Save Data</button>
      </div>      
    </div>


    <h3>Product List</h3>  
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (N)</th>
            <th>Modifiers</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.index">
            <td>{{product.data().name}}</td>
            <td>  {{product.data().price}}</td>
            <td> 
              <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>              
            </td>
          </tr>
        </tbody>
      </table>      
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
            </div>

            <div class="form-group">
              <input type="text" placeholder="Product Price" v-model="product.price" class="form-control">
            </div> 
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import {fb, db} from '@/firebase'

export default {
  name: "Products",
  props: {
    msg: String
  },

  data(){
    return{
      products: [],
      product: {
        name: null,
        price: null,
      },
      activeItem: null
    }
  },

  methods: {
    //  W A T C H E R 
    watcher(){
      db.collection('products').onSnapshot((querySnapshot) => {
        this.products = []
        querySnapshot.forEach((doc) => {
          this.products.push(doc)        
        })
      })      
    },

    // R E A D D A T A
    readData(){
      db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.products.push(doc)        
        })
      })      
    },

    // S A V E  D A T A
    savedata(){
      db.collection('products').add(this.product)
      .then((docRef) => {
        console.log('Document created with ID: ', docRef.id)
        // this.reset()
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    },

    // R E S E T 
    reset(){
      Object.assign(this.$data, this.$options.data.apply(this))
    },

    // E D I T  D A T A
    editProduct(product){
      $('#edit').modal('show')
      this.product = product.data()
      this.activeItem = product.id
    },

    // U P D A T E  D A T A
    updateProduct(){
      db.collection('products').doc(this.activeItem).update(this.product)
      .then(() => {
        console.log('Update Success')
        this.watcher()
        $('#edit').modal('hide')
      }).catch((error) =>{
        console.log('Update failed', error)
      })
    },    

    // D E L E T E  D A T A
    deleteProduct(id){
      if(confirm('Really, Delete?')){
        db.collection('products').doc(id).delete().then(() => {
          console.log('Delete Successful')
        }).catch((error) => {
          console.log('Error deleting', error);
        })
      }else{

      }
    },
  },

  // C R E A T E D 
  created(){
    this.readData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn{
  margin-right: 5px;
}
</style>

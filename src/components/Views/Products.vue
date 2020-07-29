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

    <h3 class="d-inline-block">Product List</h3> 
    <button @click="addNew" class="btn btn-primary float-right">Add Product</button> 
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
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>
              <button @click="editProduct(product)" type="button" class="btn btn-primary">Edit</button>
              <button @click="deleteProduct(product)" type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>      
    </div>

    <!-- Edit Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags" :key="tag.index">
                            <span class="p-1">{{tag}}</span>
                        </p>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images" :key="image.index">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                             <span class="delete-img" @click="deleteImage(image, index)">x</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>                
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>   
  </div>
</template>

<script>
import {fb, db} from '@/firebase'
import { VueEditor } from "vue2-editor"

export default {
  name: "Products",
  props: {
    msg: String
  },
  components: {
    VueEditor
  },

  data(){
    return{
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      },
      activeItem: null,
      modal: null,
      tag: null
    }
  },

  // F I R E S T O R E 
  firestore () {
    return {
      products: db.collection('products')
    }
  },

  methods: {
    //  A D D N E W 
    addNew(){
      this.reset()
      this.modal = 'new'
      $('#product').modal('show')
    },

    // A D D  D A T A
    addProduct(){
      this.$firestore.products.add(this.product)
      // N O T E ---> You can use SweetAlert *Toast* to display ADD success msg
      // At Top right corner of screen instead of the code below for center msg
      // Just Register SweetAlert Toast in Main.js - Dasall!      
      Swal.fire(
        'Added!',
        'Added Successfully.',
        'success'
      )      
      $('#product').modal('hide')
    },

    // E D I T  D A T A
    editProduct(product){
      this.modal = 'edit'
      this.product = product
      $('#product').modal('show')
    },

    // U P D A T E  D A T A
    updateProduct(){
      this.$firestore.products.doc(this.product.id).update(this.product)
      // T O A S T 
      Toast.fire({
        icon: 'success',
        title: 'Updated successfully'
      })     
      $('#product').modal('hide')
    },  

    // D E L E T E  D A T A
    deleteProduct(product){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(product.id).delete()           

          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )
        }
      })
    },

    // T A G S
    addTag(){
      this.product.tags.push(this.tag)
      this.tag = ''
    },

    uploadImage(e){
      if(e.target.files[0]){
        let file = e.target.files[0]
        var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name)
        let uploadTask = storageRef.put(file)
        uploadTask.on('state_changed', (snapshot) => {        
        }, (error) => {
          // Handle unsuccessful uploads 
        }, () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //this.product.image = downloadURL
            this.product.images.push(downloadURL)
            console.log('DownloadURL', downloadURL)
          })
        })
      }
    },

    deleteImage(img, index){
      let image = fb.storage().refFromURL(img)
      this.product.images.splice(index, 1)
      image.delete().then(() => {
        console.log('Image Deleted!')
      }).catch((error) => {
        console.log('Error Occured!')
      })
    },

    // R E S E T 
    reset(){
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      }   
    } 
  },

  // C R E A T E D 
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn{
  margin-right: 5px;
}

.img-wrapp{
  position: relative;
}

.img-wrapp span.delete-img{
  position: absolute;
  top: -14px;
  left: -2px;
}

.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>

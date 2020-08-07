import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
import 'bootstrap'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'popper.js'
import './assets/app.scss'
import {fb} from '@/firebase'
import VueFirestore from 'vue-firestore'
import Swal from 'sweetalert2'
import VueCarousel from 'vue-carousel'
import Vue2Filters from 'vue2-filters'
import store from './store.js'


Vue.use(Vue2Filters)

Vue.use(VueCarousel)

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})
Vue.use(VueFirestore)

window.Swal = Swal

// T O A S T - SweetAlert
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast


Vue.config.productionTip = false

// G L O B L L Y  Register Component 
Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('add-to-cart', require('./components/AddToCart.vue').default)
Vue.component('mini-cart', require('./components/MiniCart.vue').default)
Vue.component('ProductList', require('./components/Sections/ProductList.vue').default)

Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes
})


// R O U T E G U A R D S
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})


// State Change Check before launching APP
let app = ''

fb.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")    
  }

});
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

Vue.config.productionTip = false

//Register Navbar Component Globally
Vue.component('Navbar', require('./components/Navbar.vue').default)

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
      render: h => h(App)
    }).$mount("#app")
    
  }

});
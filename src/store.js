import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : []  
  },

  // M U T A T I O N S - Used to A D D  OR  C H A N G E  stuff in State
  mutations: {
    addToCart(state, item){
      let found = state.cart.find(product => product.productID == item.productID)

      if (found) {
        found.productQuantity ++
      }else{
        state.cart.push(item)
      }

      this.commit('saveData')
    },

    // S A V E  D A T A  T O  LOCAL-STORAGE
    saveData(state){
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // R E M O V E  D A T A  F R O M  CART-STATE & LOCAL-STORAGE
    removeFromCart(state, item){
      let index = state.cart.indexOf(item)
      state.cart.splice(index, 1)
      this.commit('saveData')

    }
    
  },

  // G E T T E R S
  getters: {
    totalPrice: state => {
      let total = 0;
      state.cart.filter((item) => {
          total += (item.productPrice * item.productQuantity);
      });

      return total;
    }
  },

})
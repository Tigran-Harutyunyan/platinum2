export default {
  data() {
    return {
      items: []
    }
  },
  computed: {
    cartItems: {
      get: function () {
        return this.$store.getters.getCartItems;
      },
      set: function () {}
    },

    token() {
      return this.$store.getters.getToken;
    },

    isCartEmpty() {
      return this.cartItems.length === 0 ? true : false;
    }
  } 
}

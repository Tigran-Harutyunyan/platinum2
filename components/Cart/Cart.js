import CartTotals from './CartTotals/CartTotals.vue';
import CartItemActions from './CartItemActions/CartItemActions.vue';
import Preloader from '../../commonComponents/Preloader/Preloader.vue';
import {
  EventBus
} from '../../event-bus.js';
export default {
  data() {
    return {
      value: '',
      isLoading: false,
      isMovingToOrder: false
    }
  },
  components: {
    CartTotals,
    CartItemActions,
    Preloader
  },
  computed: {

    totalPrice() {
      let total = 0;
      this.cartItems.forEach(element => {
        total += parseFloat(element.price);
      });
      return total;
    },

    token() {
      return this.$store.getters.getToken;
    },

    cartItems: {
      get: function () {
        return this.$store.getters.getCartItems;
      },
      set: function () {}
    },

    isCartEmpty() {
      return this.cartItems.length === 0 ? true : false;
    }
  },
  methods: {
    showConfirmation(id) {

      this.pendingOrderId = id;

      this.$confirm(this.$t('cartItemDeletePrompt'), {
        confirmButtonText: this.$t('yes'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'

      }).then(() => {

        this._deleteCartItem();

      }).catch(() => {});
    },

    _deleteCartItem() {

      let formData = new FormData();
      formData.append('token', this.token);
      formData.append('id', this.pendingOrderId);

      this.$store.dispatch('removeBasketProduct', {
        formData
      }).then((response) => {

        this.isLoading = false;
        
        if (response.success) {

          this.$store.dispatch('getBasketProducts');

        } else {

          this.$notify({
            title: 'Shopping cart',
            message: response.message ? response.message : '',
            position: "bottom-right",
            type: "error"
          });

        }
      }).catch((error) => {

        this.isLoading = false;
        this.$notify({
          title: 'Shopping cart',
          message: "Server error",
          position: "bottom-right",
          type: "error"
        });

      });
    },

    moveProductToOrders() {
      this.isMovingToOrder = true;

      let productIds = [];
      this.cartItems.forEach(element => {
        productIds.push(element.id)
      });

      let formData = new FormData();
      formData.append('token', this.token);
      formData.append('basket_id', JSON.stringify(productIds));

      this.$store.dispatch('moveProductToOrders', {
        formData
      }).then((response) => {
        this.isMovingToOrder = false;
        if (response.success) {

          this.$notify({
            title: 'Shopping cart',
            message: 'Order is formed',
            position: "bottom-right",
            type: "success"
          });

          EventBus.$emit('orderIsPlaced');

          this.$router.push({
            name: 'Orders'
          });

        } else {

          if (response.message) {

            this.handleErrors(response.message);

          }
        }
      }).catch((error) => {

        this.isMovingToOrder = false;

      });
    },

    handleErrors(message) {

      this.$notify({
        title: 'Shopping cart',
        message: message,
        position: "bottom-right",
        type: "error"
      });

    }
  }
}

import OrderDetailsPopup from './OrderDetailsPopup/OrderDetailsPopup.vue';
import Preloader from '../../commonComponents/Preloader/Preloader.vue';

export default {
  data() {
    return {
      activeTab: '1',
      allOrders: [],
      orderitems: [],
      currentOrder: {},
      showSummary: false,
      isLoading: true
    }
  },
  components: {
    OrderDetailsPopup,
    Preloader
  },
  methods: {
    onClose() {
      this.showSummary = false;
    },
    openOrderDetailPopup(order) {
      this.currentOrder = order;
      this.showSummary = true;
    },
    handleClick() {
      this.orderitems = this.filterOrders(this.activeTab);
    },
    filterOrders(status_id) {
      let filteredOrders = [];
      filteredOrders = this.allOrders.filter(order => order.status_id == status_id);
      return filteredOrders;
    },
    getStatusName(statusID) {
      // let statusName = this.statuses.find(status => status.id == statusID);
      for (let item in this.statuses) {
        let status = this.statuses[item]
        if (status.id == statusID) {
          return status.name;
        }
      }
    },
    getOrders() {
      this.isLoading = true;

      this.$store.dispatch('getOrders').then((response) => {

        this.isLoading = false;
        if (response.error) {

          this.$notify.error({ 
            message: message,
            position: "bottom-right" 
          });
          
        } else { 

          this.statuses = response.statuses || [];

          if (Array.isArray(response.data)) {
            response.data.forEach(order => {
              order.statusName = this.getStatusName(order.status_id);
            });
          }

          this.allOrders = response.data;
          this.orderitems = this.filterOrders(1);
          this.isCartEmpty = this.allOrders.length === 0 ? true : false;
        }
      }).catch((error) => {});
    }
  },
  computed: {
    orders: {
      get: function () {
        return this.$store.getters.getOrders;
      },
      set: function () {}
    } 
  },
  mounted() {
    this.getOrders();
  }
}

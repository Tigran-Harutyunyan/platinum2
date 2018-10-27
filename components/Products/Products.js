import Preloader from '../commonComponents/Preloader/Preloader.vue';
export default {
  validate({ params }) {
    return !isNaN(+params.id)
  },
  data() {
    return {
      productList: [],
      categoryName: '',
      isLoading: true
    }
  },
  components: {
    Preloader
  },
  watch: {
    '$route'(to, from) {
      this._filterProducts();
    },
    products(newVal, oldVal) {
      this._filterProducts();
    }
  },
  computed: {
    products() {
      return this.$store.getters.products;
    }
  },
  mounted() { 
    this._filterProducts(); 
  },
  methods: {
    _filterProducts() {
      this.productList = [];
      for (const key in this.products) {
        if (this.products.hasOwnProperty(key)) {
          const items = this.products[key];
          if (this.$route.params.id == items[0].category_id) {
            this.categoryName = items[0].category_name;
            this.productList = items;
          }
        }
      }
      this.isLoading = false;
    }
  }
}

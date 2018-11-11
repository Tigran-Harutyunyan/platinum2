import Preloader from '../commonComponents/Preloader/Preloader.vue';
import ProductsApi from '../../api/productsApi';
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
/*   fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
    .then((res) => {
      store.commit('setStars', res.data)
    })
  }, */
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
    //this._filterProducts(); 
  },

 async asyncData (params, error, payload) { 
    return new Promise((resolve, reject) => { 
      if(payload) {
        return {
          productList: payload
        }
      }
    /*   ProductsApi.getProducts('en').then(response => { 
        resolve({
          productList : response
        });  
      }).catch(function (error) {
        reject(error);
      }) */
    });
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
      this.$forceUpdate;
    }
  }
}

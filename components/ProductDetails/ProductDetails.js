import {
  EventBus
} from '../event-bus.js';
import Preloader from '../commonComponents/Preloader/Preloader.vue';
import Uploader from "./FIleUploader/FIleUploader.vue";
import ProductImages from "./ProductImages/ProductImages.vue";
export default {
  data() {
    return {
      fileList1: [],
      fileList2: [],
      value: '',
      product: {},
      copyOfProduct: {},
      productInfo: {},
      isDirty: false,
      isLoading: true,
      showPriceTotal: false,
      isRequiredSelected: false,
      totalPrice: '',
      loading: false,
      selectedOptions: [],
      quantity: "",
      isAddingToCart: false,
      isOneSide: false
    }
  },
  components: {
    Preloader,
    Uploader,
    ProductImages
  },
  computed: { 
    filesWereUploaded() {
      if ( this.isOneSide && this.fileList1.length > 0 ) {
        return this.fileList1.length > 0; 
      } else {
        return  this.fileList1.length > 0 && this.fileList2.length > 0;
      } 
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  watch: {
    '$route'(to, from) {
      this.fileList1 = [];
      this.fileList2 = [];
      this.getProductById();
    }
  },
  methods: {
    onFileChange(data) {
      if (data.type == 1) {
        this.fileList1 = data.list
      } else {
        this.fileList2 = data.list;
      }
    },
    onDropDownChange() {
      let properties = this.product.sortedProperties;
      let quantityID = '';
      this.selectedOptions = []; 
      this.isDirty = true;
      properties.forEach(element => {
        if (element.selected != "") {
          element.options.forEach(option => {
            if (option.one_side){
              this.isOneSide = true;
            }
            if (option.quantity) {
              this.quantity = element.selected
            }
            if (option.id == element.selected) {
              this.selectedOptions.push(option.id);
            }
          });
        }
      });
      if (this.quantity) {
        // only send requests if quantity is selected   
        this.getProductPrice();
      }
    },

    getProductPrice() {
      if (!this.token) {
        this.$notify({
          title: 'Cart',
          message: "Please login first",
          position: "bottom-right",
          type: "error"
        });
        EventBus.$emit('logout');
        return;
      }

      if (!this.loading) {
        this.loading = true;

        let formData = this._constructFormData();

        this.$store.dispatch('getProductPrice', {
          formData
        }).then((response) => {

          this.loading = false;

          if (response.error) {

            this.$notify({
              title: 'Get price error',
              message: response.message,
              position: "bottom-right",
              type: "error"
            });

          } else {

            if (response[0].price) {
              this.showPriceTotal = true;
              this.isDirty = true;
              this.totalPrice = response[0].price;
            }

          }
        }).catch((error) => {
          this.loading = false;
          this.$notify({
            title: 'Get price error',
            message: "Server error",
            position: "bottom-right",
            type: "error"
          });
        });
      }
    },

    _constructFormData(addMode) {

      let formData = new FormData();
      formData.append('token', this.token);
      formData.append('product_id', this.product[0].id);
      formData.append('quantity_id', [this.quantity]);
      formData.append('properties', JSON.stringify(this.selectedOptions));

      if (addMode) {
        if (this.fileList1.length > 0) {
          formData.append('front_side', this.fileList1[0].raw, this.fileList1[0].name);
        }
        if (this.fileList2.length > 0 &&  !this.oneSide) {
          formData.append('back_side', this.fileList2[0].raw, this.fileList2[0].name);
        }
      }
      return formData;
    },

    addProductToCart() {


      if (!this.isAddingToCart && this.isDirty) {

        if (!this.token) {
          this.$notify({
            title: 'Cart',
            message: "Please login first",
            position: "bottom-right",
            type: "error"
          });

          EventBus.$emit('logout');

          return;
        }
        if ( !this.filesWereUploaded ) {
           
          this.$notify({
            title: 'Cart',
            message: `Please upload ${this.isOneSide  ? 'your file' : 'your files'}`,
            position: "bottom-right",
            type: "error"
          });
          return;

        }
        this.isAddingToCart = true;

        let formData = this._constructFormData('add');

        this.$store.dispatch('addProductToBasket', {
          formData
        }).then((response) => {

          this.isAddingToCart = false;

          if (response.error) {

            this.$notify({
              title: 'Shopping cart',
              message: response.message,
              position: "bottom-right",
              type: "error"
            });

          } else {

            this.$store.dispatch('getBasketProducts');

            this.$notify({
              title: 'Shopping cart',
              message: response.message ? response.message : 'Item is added to shopping cart!',
              position: "bottom-right",
              type: "success"
            });

            this.$router.push({
              name: 'Cart'
            });
          }
        }).catch((error) => {

          this.isAddingToCart = false;

          this.$notify({
            title: 'Shopping cart',
            message: "Server error",
            position: "bottom-right",
            type: "error"
          });

        });
      }


    },

    getProductById() {
      this.$store.dispatch('getProductById', {
        id: this.$route.params.id
      }).then((response) => {
        this.isLoading = false;
            
        if (response.error){
          this.$notify({ 
            message: response.message ? response.message : "Error getting product info",
            position: "bottom-right",
            type: "error"
          });
        }

        if (response[0]) {
          this.product = response;
          this.isLoading = false;
          this.showPriceTotal = Object.keys(this.product.properties).length > 0;
          this.copyOfProduct = JSON.parse(JSON.stringify(this.product));
          this.isDirty = false;
        }
      }).catch((error) => {
        this.isLoading = false;
      });
    },
    reset() {
      this.product = JSON.parse(JSON.stringify(this.copyOfProduct));
      this.isDirty = false;
      this.showPriceTotal = false;
      this.isOneSide = false;
    },

  },
  created() {
    this.getProductById();
  },
  mounted() {
    EventBus.$on('authChanged', () => {
      this.reset();
    });
  }
}

import {
  required,
  minLength,
  email,
  sameAs
} from 'vuelidate/lib/validators';


export default {
  data() {
    return {
      isLoading: false,
      productList: [],
      fileList: [],
      product_id: "",
      height: "",
      width: "",
      message: "",
      colors: ""
    }
  },
 
  computed: {
    products() {
      return this.$store.getters.getProductsArray;
    },
    isFormValid() {
      return this.$v.$invalid == false && this.fileList.length > 0 && this.product_id;
    }
  },

  methods: {
    onSubmit() {
      if (this.isFormValid) {

        this.isLoading = true;
        let formData = new FormData();

        formData.append('height', this.height);
        formData.append('width', this.width);
        formData.append('colors', this.colors);
        formData.append('product_id', this.product_id);
        formData.append('message', this.message);

        if (this.fileList.length > 0) {
          formData.append('logo', this.fileList[0].raw, this.fileList[0].name);
        }

        this.$store.dispatch('customOrder', {
          formData
        }).then((response) => {
          this.isLoading = false;
          if (!response.error) {
            this.$notify.success({
              message: 'Order is placed',
              position: "bottom-right"
            });
            this.$router.push({
              name: 'Categories',
              params: {
                id: 1
              }
            })
          } else {
            this.$notify.error({
              message: response.message ? response.message : 0,
              position: "bottom-right"
            });
          }
        }).catch((error) => {
          this.isLoading = false
        });
      }
    }, 
    handleUpload(file, fileList) {

      var fr = new FileReader();
      fr.onload = () => {
        let obj = {
          'background-image': `url(${fr.result})`,
          'background-color': 'transparent'
        };
      }
      fr.readAsDataURL(file.raw);
      this.fileList = fileList.slice(-1);
    },
  },
  validations: {
    height: {
      required
    },
    width: {
      required
    },
    message: {
      required
    },
    colors: {
      required
    }
  }
}

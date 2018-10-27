import {
  required,
  minLength,
  sameAs
} from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
      isLoading: false
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid
    },
    storage() {
      return this.$store.getters.getStorage;
    }
  },
  methods: {
    changePassword() {
      if (!this.isLoading && this.isFormValid) {
        this.isLoading = true;
        this.$store.dispatch('changePassword', {
          password: this.password,
          token: this.token
        }).then((response) => {
          this.isLoading = false;
          if (response.error) {
            this.$notify.error({ 
              message: response.message ? response.message : 'Failed to change the password',
              position: "bottom-right" 
            });
          } else {
            this.$notify.success({ 
              message: 'Password change success!',
              position: "bottom-right" 
            });
            this.password = this.passwordConfirm = '';
            this.$v.$reset();
          }
        }).catch((error) => {
          this.isLoading = false;
          this.$notify.error({ 
            message: error.message || '' ,
            position: "bottom-right" 
          });
        });
      }
    } 
  },
  mounted() {
    if (this.storage && this.storage.user) {
      this.token = this.storage.user.token;
    } 
  }, 
  validations: {
    password: {
      minLength: minLength(6),
      required
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
}
import VueRecaptcha from 'vue-recaptcha';
import {
  required,
  minLength,
  email,
  sameAs
} from 'vuelidate/lib/validators';
//https://www.google.com/recaptcha/admin#site/341190406
export default {
  data() {
    return {
      agree: false,
      recaptchaResponse: "",
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      password: "",
      receive_promotions: false,
      recaptcha: '',
      passwordConfirm: '',
      isLoading: false,
      birthday_at: "",
      phone: "",
      pickerOptions1: {
        format: 'yyyy-MM-dd'
      },
      birthday_at: ''
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid && this.agree && this.recaptchaResponse.length>0;
    }
  },
  methods: {
    _login() { 

      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then((response) => { 
        if (response.error) {
          this.$notify({
            title: 'Login',
            message: response.message ? response.message : 'Failed to login',
            position: "bottom-right",
            type: "error"
          });
        }
        if (response.success) {
          this.$emit('LoginSuccess', response);   
          this.$router.push({
            name: 'Categories',
            params: {
              id: 1
            }
          })
        } 
      }).catch((error) => {});
    },
    onSubmitSignup() {
      if (!this.isLoading && this.isFormValid) {
        this.isLoading = true;
        let data = {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          company_name: this.company_name,
          phone: this.phone,
          receive_promotions: this.receive_promotions,
          recaptcha: this.recaptchaResponse
        }
        if (this.birthday_at) {
          data.birthday_at = this.birthday_at;
        }

        this.$store.dispatch('signup', data).then((response) => {
          this.isLoading = false;
          if (response.error) {
            if (response.message == "Invalid Recaptcha") {
              this.$refs.recaptcha.reset();
            } else {
              this.$notify({
                title: 'Sign up',
                message: response.message ? response.message : 'Failed to sign up',
                position: "bottom-right",
                type: "error"
              }); 
            }
          } else {
            this.$notify({
              title: 'Sign up',
              message: 'Signup success!',
              position: "bottom-right",
              type: "success"
            });
            
            this._login(); 
          }
        }).catch((error) => {
          this.isLoading = false
        });
      }
    },
    onVerify(response) {
      this.recaptchaResponse = response
    },
    onExpired() {
      this.$refs.recaptcha.reset();
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset(); // Direct call reset method
    }
  },
  components: {
    VueRecaptcha
  },
  validations: {
    first_name: {
      required
    },
    last_name: {
      required
    },
    email: {
      required,
      email
    }, 
    password: {
      required,
      minLength: minLength(6)
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    },  
    phone: {
      required
    },
  }
}
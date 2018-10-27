import {
  required,
  minLength,
  email,
  sameAs
} from 'vuelidate/lib/validators';
import {
  EventBus
} from '../event-bus.js';
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      dialogTableVisible: true,
      recoveryMail: '',
      loginMode: true
    }
  },
  computed: {
    isLoginFormValid() {
      return !this.$v.email.$invalid && !this.$v.password.$invalid && !this.isLoading;
    },
    isValidRecovery() {
      return !this.$v.recoveryMail.$invalid
    }
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        this.isLoading = false;
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
          this.close();
        }
        EventBus.$emit('authChanged');
      }).catch((error) => {
        this.isLoading = false;
        this.$notify({
          title: 'Login',
          message: error ? error : 'Failed to login',
          position: "bottom-right",
          type: "error"
        });
      });
    },
    recoverPass() {
      this.isLoading = true;
      this.$store.dispatch('recover', {
        email: this.recoveryMail
      }).then((response) => {
        this.isLoading = false;
        if (response.success) {
          this.$notify({
            title: 'Password recovery',
            message: "Password recovery success",
            position: "bottom-right",
            type: "success"
          });
          this.close();
        }
      }).catch((error) => {
        this.isLoading = false;
      });
    },
    close() {
      this.$emit("close");
      this.dialogTableVisible = false;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    },
    recoveryMail: {
      required,
      email
    }
  }
}

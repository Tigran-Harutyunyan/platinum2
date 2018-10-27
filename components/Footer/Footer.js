import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators';

import SocialMedia from "../Home/SocialMedia/SocialMedia.vue";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      if (!this.isLoading && !this.$v.$invalid) {

        this.isLoading = true;

        this.$store.dispatch('subscribe', {
          contact_email_subscribe: this.email
        }).then((response) => {

          this.isLoading = false;

          if (response.success) {

            this.$notify({
              title: 'Subscribe',
              message: 'You have been successfully subscribed',
              position: "bottom-right",
              type: "success"
            });

            this.email = '';

          } else {

            this.$notify({
              title: 'Subscribe',
              message: 'Subscription error',
              position: "bottom-right",
              type: "error"
            });

          }
        }).catch((error) => {

          this.isLoading = false;

          this.$notify({
            title: 'Subscribe',
            message: 'Server error',
            position: "bottom-right",
            type: "error"
          });
          
        });
      }
    }
  },
  computed: {
    customData() {
      return this.$store.getters.getCustomData;
    }
  },
  mounted() {
    this.$store.dispatch('getCustomData');
  },
  components: {
    'social-media': SocialMedia
  },
  validations: {
    email: {
      required,
      email
    }
  }
}

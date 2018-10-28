import {
  EventBus
} from '../event-bus.js';
export default {
  data() {
    return {
      activeNames: [], //'0' 
    };
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },
    token() {
      return this.$store.getters.getToken;
    },
    dropdownOpened() {
      return this.$store.getters.dropdownOpened;
    },
  },
  watch: {
    dropdownOpened() {
      if (this.dropdownOpened) {
        document.body.classList.add('hide-it');
      } else {
        document.body.classList.remove('hide-it'); 
      }
    }
    /* $route(to, from) { 
    } */
  },
  methods: {
    close() {
      document.body.classList.remove('hide-it'); 
      this.$store.dispatch('setDropDownState', !this.dropdownOpened);
    },

    navigateTo(action) {
      this.close();
      switch (action) {
        case 'login':
          setTimeout(() => {
            EventBus.$emit('showLogin');
          }, 250);
          break;
        case 'signUp':
          this.$router.push({
            path: '/signup'
          });
          break;
        case 'logout':
          EventBus.$emit('logout');
          break;
        case 'design':
          this.$router.push({
            path: '/design'
          });
          break;
        case 'categories':
          this.$router.push({
            path: '/category/1'
          });
          break;
        case 'Orders':
          this.$router.push({
            path: '/orders'
          });
          break;
        case 'changePassword':
          this.$router.push({
            path: '/change-password'
          });
          break;
        case 'profile':
          this.$router.push({
            path: '/profile'
          });
          break;
      }
    },

    scrollTo(section) {
      let param = '';
      let customOffset = 0;
      switch (section) {
        case 'services':
          customOffset = 20;
          param = '#section-services';
          break;
        case 'about-us':
          customOffset = 30;
          param = '#section-about-us';
          break;
        case 'projects':
          customOffset = 20;
          param = '#section-portfolio';
          break;
        case 'why':
          customOffset = 20;
          param = '#reasons-section';
          break;
        case 'staff':
          param = '#staff-section';
          customOffset = 190;
          break;
        case 'contact-us':
          param = '#section-5';
          customOffset = -140;
          break;
        default:
          param = '';
      }

      this.close();

      if (this.$route.name === 'Home') {
        $('html, body').animate({
          scrollTop: !param ? 0 : $(param).offset().top - customOffset
        }, 0);
      } else {
        let params = {
          param: param,
          offset: customOffset
        }
        this.$store.dispatch('setScrollParams', params);
        this.$router.push({
          path: '/home'
        });
      }
    }
  }
}

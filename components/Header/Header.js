import {
  EventBus
} from '../event-bus.js';
import Login from '../Login/Login.vue';
import Search from '../Search/Search.vue';
import SearchMobile from '../SearchMobile/SearchMobile.vue';
//import Hamburger from './Hamburger/Hamburger.vue';
import NewBurger from './NewBurger/NewBurger.vue';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      showLogin: false,
      isMobileSearch: false,
      isBurgerOn: false 
    }
  },
  components: {
    Login,
    Search,
    SearchMobile,
    NewBurger,
    //Hamburger,
    LanguageSwitcher
  },

  computed: {
    classObject () {
      return {
        'hamburger--squeeze': this.isBurgerOn,
        'is-active': this.isBurgerOn
      }
    },

    user: {
      get: function () {
        return this.$store.getters.getUser;
      },
      set: function () {}
    },

    isAuthenticated() {
      return this.$store.getters.getToken;
    },

    cartItems: {
      get: function () {
        return this.$store.getters.getCartItems;
      },
      set: function () {}
    },
  },
  methods: {

    logout() {
      this.$store.dispatch('logout').then((response) => {
        this.removeUser();
      }).catch((error) => {
        this.removeUser();
      });
    },

    goToCart(){ 
      this.$router.push({name:'Cart'})
    },
    removeUser() {
      
      EventBus.$emit('onLogout');
      EventBus.$emit('authChanged');
      if (this.$route.name !== 'Home', this.$route.name !== 'ProductDetail') {
        this.$router.push({
          name: 'Categories',
          params: {
            id: 1
          }
        });
      }
    },

    toSignupPage() {
      this.$router.push({
        name: 'SignUp'
      });
    },

    onLoginSuccess(response) {
      this.$store.dispatch('getBasketProducts'); 
    },
  },
  mounted() {

    EventBus.$on('logout', () => {
      this.logout();
    });

    EventBus.$on('showLogin', () => {
      this.showLogin = true;
    });
     
  }
}

import {
  EventBus
} from '../event-bus.js';
import Login from '../Login/Login.vue';
import Search from '../Search/Search.vue';
import SearchMobile from '../SearchMobile/SearchMobile.vue'; 
import NewBurger from './NewBurger/NewBurger.vue';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.vue';
 
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
    LanguageSwitcher
  },

  computed: {
    classObject() {
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
    }
  },
  methods: {

    logout() {

      this.$store.dispatch('logout').then((response) => {
        this.removeUser();
      }).catch((error) => {
        this.removeUser();
      });

    },

    goToCart() {

      this.$router.push({
        path: '/cart'
      })

    },

    removeUser() {

      EventBus.$emit('onLogout'); 

      EventBus.$emit('authChanged');
      
      if (this.$route.name !== 'Home', this.$route.name !== 'ProductDetail') {
        this.$router.push({
          path: '/category/1'
        });
      }
    },

    toSignupPage() {
      this.$router.push({
        path: '/signup'
      });
    },

    onLoginSuccess(response) {
      this.$store.dispatch('getBasketProducts');
    },
  },
 
  mounted() {
    
    let token = localStorage.getItem('token') ? localStorage.getItem("token") : '';
    if (token.length) {
      this.$store.dispatch('setToken', token);
    }
  
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : {};
    if (Object.keys(user).length > 0) {
      this.$store.dispatch('setUser', user);
    } 

    EventBus.$on('logout', () => {
      this.logout();
    });

    EventBus.$on('showLogin', () => {
      this.showLogin = true;
    });

  }
}

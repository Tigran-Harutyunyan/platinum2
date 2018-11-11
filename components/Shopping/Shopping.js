import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
import Slider from '../Slider/Slider.vue';
import Sidebar from '../Sidebar/Sidebar.vue';
import HelperLinks from '../HelperLinks/HelperLinks.vue';
import InfoTabs from '../InfoTabs/InfoTabs.vue';
import HeaderCategories from '../MobileProductList/MobileProductList.vue';
import generalMiddleware from '../../apiMiddlewares/generalMiddleware';
import productsMiddleware from '../../apiMiddlewares/productsMiddleware'; 

import {
  config
} from '../../api/config';

import axios from 'axios';
export default {
  components: {
    Header,
    Slider,
    Footer,
    Sidebar,
    HelperLinks,
    InfoTabs,
    HeaderCategories,
    fullWidth: false
  },
  
  data() {
    return {
      showSidebar: false,
      showCategoryDropdown: false,
      showInfoTabs: false
    };
  },

  async asyncData(context, error, payload) {
    let [res, res2, res3] = await Promise.all([
      axios.get(`${config.host}getSliderImages?lang=en`),
      axios.get(`${config.host}getSamples?lang=en`),
      axios.get(`${config.host}getProductsList?lang=en`)
    ])
    return {
      sliderImages: generalMiddleware.fromBackEnd.getSliderImages(res.data),
      links: generalMiddleware.fromBackEnd.getSamples(res2.data),
      products: productsMiddleware.fromBackEnd.parseProducts(res3.data),
    } 
  },
  watch: {
    $route(to, from) {
      this.checkRoute(to.name);
    }
  },
 
  mounted() {

    /* if (storage.getToken()) {
      this.$store.dispatch('getBasketProducts');
    } */
  },
  methods: {
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },
    checkRoute(route) {
      this.showSidebar = route != 'index-advertisements';
      this.showInfoTabs = route == 'index-category-id' || route == 'index-category-id' ? true : false;
      this.fullWidth = route === 'index-advertisements';
    }
  },
  created() {
    this.checkRoute(this.$route.name);
  }
};

import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue"; 
import PortfolioPopup from './PortfolioPopup/PortfolioPopup.vue';
import _  from 'lodash.debounce';
import Preloader from '../commonComponents/Preloader/Preloader.vue';
import HeaderCategories from '../MobileProductList/MobileProductList.vue';

if (process.browser) { 
  
  //debounce = require('lodash.debounce');
}

export default {
  data() {
    // called every time before loading the component
    return {
      counter: 0,
      currentSlideID: '',
      showContent: false,
      loading: true,
      isScrolled: false,
      showCategoryDropdown: false
    }
  },

  watch: {
    completedWorks() {
      this.loading = false;
      this.showContent = true;
    }
  },
  
  computed: {
    completedWorks() {
      return this.$store.getters['getCompletedWorks']
    }
  },
  methods: {
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    }, 
   /*  startScrolling: _.debounce(function () {
      let offsetTop = $('.portfolio-modal').scrollTop();
      this.isScrolled = offsetTop > 80;
    }, 10),   */

    getOptions: function () {
      var _this = this
      return {
        name: '.grid-item',
        masonry: {
          columnWidth: 348,
          gutter: 16,
          originTop: true,
          layoutMode: 'packery',
          horizontalOrder: true
        }
      }
    },
    onPopupClosed() {
      this.currentSlideID = -1;
    }
  },
  mounted() {
    this.$store.dispatch('getCompletedWorks');
    //document.getElementById("scrolledDiv").addEventListener('scroll', this.startScrolling);
   
  },
  destroy() {
    window.removeEventListener('scroll');
  },
  components: {
    Header,
    Footer,
    PortfolioPopup, 
    Preloader,
    HeaderCategories, 
  }
}

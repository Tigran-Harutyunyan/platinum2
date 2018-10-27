import Header from "../Header/Header.vue";
import Services from "./Services/Services.vue";
import About from "./About/About.vue";
import Staff from "./Staff/Staff.vue";
import ProjectsSlider from "./ProjectsSlider/ProjectsSlider.vue";
import Reasons from "./Reasons/Reasons.vue";
import Contact from "./Contact/Contact.vue";
import BigSlider from "./BigSlider/BigSlider.vue";
import HeaderCategories from '../MobileProductList/MobileProductList.vue';
let ScrollMagic;
if (process.browser) {
  ScrollMagic = require('scrollmagic');
  
  /* var reviewsController = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onEnter",
      duration: "200%"
    }
  });
  var scene2 = new ScrollMagic.Scene({
      triggerElement: "#parallax-trigger"
    })
    .setTween("#parallax1", {
      y: "10%",
      ease: Linear.easeNone
    })
    .addTo(reviewsController); */
}
 
export default {
  data() {
    return {
      minScreenWidth: 1150,
      canvas: {},
      stage: {},
      exportRoot: {},
      anim_container: {},
      dom_overlay_container: {},
      showCategoryDropdown: false
    }
  },
  computed: {
    scrollParams() {
      return this.$store.getters.scrollParams
    }
  },
  methods: {
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },
    setZindex() {
      //************* SET BANNER Z-INDEX **********************************

      var bannerController = new ScrollMagic.Controller();
      var scene = new ScrollMagic.Scene({
          triggerElement: "#main-section",
          triggerHook: '0'
        })
        .addTo(bannerController);
      scene.setClassToggle("#mainSlider", "changed-zindex");
      //trackMouse(sliders); 
    },
    initBannerParallaxScroller() {
      if ($(window).width() > this.minScreenWidth) {
        var controllerBanner = new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "200%"
          }
        });
        var sceneBanner = new ScrollMagic.Scene({
            triggerElement: "#main-section",
          })
          .setTween("#mainSlider", {
            y: "-8%",
            ease: Linear.easeNone
          })
          //.addIndicators()  
          .addTo(controllerBanner);
      }
    },
    
    checkToScrollOrNot() {
      if (this.scrollParams) {
        $('html, body').animate({
          scrollTop: $(this.scrollParams.param).offset().top - this.scrollParams.offset
        }, 0, () => this.$store.dispatch('setScrollParams', ''));
      }
    }
  },
  components: {
    Services,
    About,
    Contact,
    Reasons,
    Staff,
    Header,
    ProjectsSlider,
    BigSlider,
    HeaderCategories
  },
  mounted() {
   
  }
}

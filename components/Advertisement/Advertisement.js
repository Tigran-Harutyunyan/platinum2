import CarouselPopup from '../commonComponents/CarouselPopup/CarouselPopup.vue';
import Preloader from '../commonComponents/Preloader/Preloader.vue';
export default {
  data() {
    return {
      index: 0,
      dialogTableVisible: false,
      audioAds: [],
      adCategories: {},
      category: {},
      isLoading: true
    }
  },
  components: {
    CarouselPopup,
    Preloader
  },
  watch: {
    advertisements: {
      handler: function (ads) {
        for (const key in ads) {
          if (ads.hasOwnProperty(key)) {
            if (key == 'audio') {
              this.audioAds = ads[key];
              delete ads[key];
              break;
            }
          }
        }
        this.isLoading = false;
        this.adCategories = ads;
      }
    }
  },
  computed: {
    advertisements: {
      get: function () {
        return this.$store.getters.getAdvertisements;
      },
      set: function () {}
    }
  },
  created() {
    this.$store.dispatch('getAdvertisements');
  },
  methods: {
    openPopup(index, category) {
      this.index = index;
      this.category = category;
      this.dialogTableVisible = true;
    },
  },
  directives: {
    carousel: {
      inserted: function (el, binding) {
        let slidesToShow = binding.value < 7 ? binding.value : 7;
        $(el).slick({
          autoplay: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          draggable: false,
          responsive: [{
              breakpoint: 1640,
              settings: {
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1350,
              settings: {
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1090,
              settings: {
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 830,
              settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 560,
              settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                draggable: true,
                arrows: false
              }
            }
          ]
        });
      },
    }
  },
}

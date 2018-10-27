import CarouselPopup from '../../commonComponents/CarouselPopup/CarouselPopup.vue'; 
export default {
  data() {
    return { 
      index: 0,
      dialogTableVisible: false,
    }
  },
  computed: {
    projectsSliderImages(){
      return this.$store.getters.projectsSliderImages;
    }
  },
  components: {
    CarouselPopup
  },
  created() {
    let data = this.$store.getters.projectsSliderImages;
    if (!data.length) {
      this.$store.dispatch('getProjectSliderImages');
    }
  },
  directives: {
    carousel: {
      inserted: function (el) { 
        $(el).slick({
          autoplay: true,
          rows : 0,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 7,
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
                arrows: false, 
              }
            }
          ]
        });
      },
    }
  },

  methods: {
    openPopup(index) {
      this.index = index;
      this.dialogTableVisible = true;
    }
  }
}

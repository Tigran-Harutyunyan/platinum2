export default {
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    staffData() {
      return this.$store.getters.getStaffData;
    }
  },
  mounted() {
    let data = this.$store.getters.getStaffData;
    if (!data) {
      this.$store.dispatch('getStaff');
    }
  },
  directives: {
    carousel: {
      inserted: function (el) {
        $(el).slick({
          autoplay: true,
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: false,
          responsive: [{
            breakpoint: 1250,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });
      },
    }
  }
};

export default {
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  props: {
    staff: {
      type: Array
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

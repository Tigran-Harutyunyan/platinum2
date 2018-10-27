import { mapGetters } from 'vuex';
export default { 
  directives: {
    carousel: {
      inserted: function (el) {
        $(el).slick({
          autoplay: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 7,
          draggable: true,
          responsive: [ 
            {
              breakpoint: 1600,
              settings: { 
                slidesToShow: 6,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1200,
              settings: { 
                slidesToShow: 5,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1010,
              settings: { 
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 850,
              settings: { 
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 650,
              settings: { 
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 500,
              settings: { 
                slidesToShow:2,
                slidesToScroll: 1,
                arrows: false 
              }
            }
          ]
        });
      },
    }
  },
  computed: {
    partnersImages() {
      return this.$store.getters.partnersImages;
    }
  },
  mounted() {
    let data = this.$store.getters.partnersImages;
    if (!data.length) {
      this.$store.dispatch('getPartnerImages');
    }
  }
}
import CarouselPopup from '../commonComponents/CarouselPopup/CarouselPopup.vue';
import Preloader from '../commonComponents/Preloader/Preloader.vue';
import generalApi from '../../api/generalApi';

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
  async asyncData (context, error, payload) { 
   
    return new Promise((resolve, reject) => {  
      generalApi.getAdvertisements('en').then(response => {   
        let audioAds; 
        for (const key in response) { 
          if (response.hasOwnProperty(key) && key == 'audio') { 
              audioAds = response[key];  
              delete response[key];
              break; 
          }
        }
        resolve({
          adCategories : response,
          audioAds: audioAds
        });  
      }).catch(function (error) {
        reject(error);
      })  
    });
  }, 
  components: {
    CarouselPopup,
    Preloader
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
          rows : 0,
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
  }
}
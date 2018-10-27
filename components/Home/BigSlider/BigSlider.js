 import LogoAnimation from './LogoAnimation/LogoAnimation.vue';
 import SocialMedia from "../SocialMedia/SocialMedia.vue";
 import {
   EventBus
 } from '../../event-bus.js';
 export default {
   data() {
     return {
       currentSlide: 1,
       slidesLength: '',
       showBoxes: false,
       isLogoActive: false
     }
   },
   directives: {
     carousel: {
       inserted: function (el) {  
         $(el).slick({
           autoplay: true,
           dots: false,
           infinite: true,
           speed: 800,
           autoplaySpeed: 6500,
           dots: true,
           fade: true,
           cssEase: 'linear',
           slidesToShow: 1,
           slidesToScroll: 1,
           draggable: false,
         });  
         $(el).on('afterChange', (event, slick, currentSlide) => {
           slick.autoplaySpeed = 4000;
           EventBus.$emit('slideChange', currentSlide + 1);
         });
       },
     }
   },
   components: {
     'logo-animation': LogoAnimation,
     'social-media': SocialMedia
   },
 
   updated(){ 
    setTimeout(() => {
      this.isLogoActive = true;
    }, 2000);
   },
   mounted() {
   
     EventBus.$on('slideChange', (currentSlide) => {
       if (currentSlide === 2) {
         this.showBoxes = true;
       }
       this.setSlidesItems(currentSlide);
     });
     this.setSlidesItems(1); //set slide item info. 
   },

   methods: {
     setSlidesItems(currentIndex) {
       let slidesLength = 2;
       this.slidesLength = (currentIndex < 10) ? '/0' + slidesLength : '/' + slidesLength;
       this.currentSlide = (currentIndex < 10) ? '0' + currentIndex : currentIndex;
     }
   }
 };

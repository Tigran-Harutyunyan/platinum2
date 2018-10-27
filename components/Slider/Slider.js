export default {
    name: 'slider',
    data() {
        return {}
    },
    computed:{ 
        sliderImages() {
            return this.$store.getters.getSliderImages;
        } 
    },
    mounted() {
        let sliderImages = this.$store.getters.sliderImages; 
        if (!sliderImages) {
           this.$store.dispatch('getSliderImages');
        } 
    }
}
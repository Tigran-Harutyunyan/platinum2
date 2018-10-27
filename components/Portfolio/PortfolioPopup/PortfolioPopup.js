 
 export default {
   props: ['completedWorks', 'currentSlideID'], 
   data() {
     return {
       counter: 0,
       currentSlide: "",
       loading: false,
       dialogVisible: false
     }
   }, 
   computed: {
     amount() {
       return this.completedWorks.length;
     },
   },
   watch: {
     'currentSlideID': function (newVal, oldVal) {
       if (newVal > 0) {
         this.loading = true;
         this.getCompletedWorkById(newVal);
         this.counter = newVal;
       }
     }
   },
   methods: {
     closePopup() {
       this.$emit('popupClosed');
       this.dialogVisible = false;
       this.currentSlide = '';
     },
     navigate(direction) {
       this.counter = this.counter + direction;
       if (direction === -1 && this.counter < 0) {
         this.counter = this.amount - 1;
       }
       if (direction === 1 && !this.completedWorks[this.counter]) {
         this.counter = 0;
       }
       let id;
       this.completedWorks.forEach((element, index) => {
         if (index == this.counter) {
           id = element.id
         }
       }); 
       this.getCompletedWorkById(id);
     },
     getCompletedWorkById(id) {
       this.$store.dispatch('getCompletedWorkById', id).then((response) => {
         this.loading = false;
         if (response[0] && response[0].id) {
           this.currentSlide = response;
           this.dialogVisible = true;
         }
       }).catch((error) => {
         this.loading = false;
       });
     }
   }
 }

 export default {
   props: ['item'],
   methods: {
    deleteCartItem(id) {
       this.$emit('deleteCartItem', id);
     }
   }
 }
 export default { 
   computed:{
    isVisible:{
      get: function () {
        return this.visible;
      },
      set: function () {} 
    }
   },
   props: {
     order:{
         type: Object
     },
     visible: {
         type: Boolean
     }
   } 
 }

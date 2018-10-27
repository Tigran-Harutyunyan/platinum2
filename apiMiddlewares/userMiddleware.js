 import storage from '../storage';
 import {
  config
} from '../api/config';

 const userMiddleware = {
   fromBackEnd: { 
     getBasketProducts(response) { 
       response.forEach(element => { 
         if (element.front_side) {
           element.front_side = `${config.imgBaseUrl}${element.front_side }`;
           element.frontBGstyle = `background-image:url(${ element.front_side});`;
         }
         if (element.back_side) {
           element.back_side = `${config.imgBaseUrl}${element.back_side }`;
           element.backBGstyle = `background-image: url(${ element.back_side});`;
         }
       });
       return response;
      }, 
   },
   toBackEnd: {
     appendToken() {
       storage.getToken();
       let formData = new FormData();
       formData.append('token', storage.getToken());
       return formData;
     },
   }
 };

 export default userMiddleware

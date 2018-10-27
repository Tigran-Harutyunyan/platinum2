 const utils = {

   getSortId(key, propertyNames) {
     for (const _key in propertyNames) {
       if (propertyNames.hasOwnProperty(_key) && key === propertyNames[_key].name) {
         return parseInt(propertyNames[_key].order_id);
       }
     }
   },

   getProductsArray(products) {
     let productList = [];

     for (const key in products) {
       if (products.hasOwnProperty(key)) {
         const element = products[key];
         element.forEach(element => {
           productList.push({
             name: element.name,
             id: element.id,
             selected: false
           });
         });
       }
     } 
     return productList;
   }
 };

 export default utils;

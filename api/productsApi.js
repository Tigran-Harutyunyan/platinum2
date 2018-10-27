import api from './api';
 
let lang = 'en';

import productsMiddleware from '../apiMiddlewares/productsMiddleware';
const productsApi = {
  getProductById(productId) {
    return api.get(`getProductById?id=${productId}&lang=${lang}`).then(res => { 
      res = productsMiddleware.fromBackEnd.parseProduct(res);
      return res;
    });
  },

  getProducts() {
    return api.get(`getProductsList?lang=${lang}`).then(res => {
      res = productsMiddleware.fromBackEnd.parseProducts(res);
      return res;
    });
  },

  getSearchResults(params) {
    return api.post(`search?lang=${lang}` ,params).then(res => {
      res = productsMiddleware.fromBackEnd.parseSearchResults(res);
      return res;
    });
  },

  getCategories(params) {
    return api.post(`search?getCategories=${lang}` ,params).then(res => { 
      return res;
    });
  },

};

export default productsApi; 
import api from './api';  
import productsMiddleware from '../apiMiddlewares/productsMiddleware';

const productsApi = {
  getProductById(productId, locale) {
    return api.get(`getProductById?id=${productId}&lang=${locale}`).then(res => { 
      res = productsMiddleware.fromBackEnd.parseProduct(res);
      return res;
    });
  },

  getProducts(locale) {  
    return api.get(`getProductsList?lang=${locale}`).then(res => {
      res = productsMiddleware.fromBackEnd.parseProducts(res);
      return res;
    });
  },

  getProductsByCategoryId(id,locale) {  
    return api.get(`getProductsByCategoryId?id=${id}&lang=${locale}`).then(res => {
      res = productsMiddleware.fromBackEnd.parseCategoryProducts(res);
      return res;
    });
  },

  getSearchResults(params, locale) {
    return api.post(`search?lang=${locale}`,params).then(res => {
      res = productsMiddleware.fromBackEnd.parseSearchResults(res);
      return res;
    });
  },

  getCategories(params,locale) {
    return api.post(`search?getCategories=${locale}` ,params).then(res => { 
      return res;
    });
  },

};

export default productsApi; 
import api from './api';
import storage from '../storage';
import userMiddleware from '../apiMiddlewares/userMiddleware'; 

const userApi = {

  login(params) {
    let url = 'login?'; 
    return api.post(url, params).then(res => { 
      if (res.success) {
        if (process.browser){
          storage.setUser(res);
          if(res.token){
            storage.setToken(res.token);
          }
        } 
      }
      return res;
    });
  },

  logout() {
    let url = 'logout?';
    let formData = userMiddleware.toBackEnd.appendToken();
    return api.post(url, formData).then(res => {
      storage.removeUser();
      storage.deleteToken();
      return res;
    });
  },

  changePassword(params) {
    let url = 'changePassword?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  signup(params) {
    let url = 'register?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  recover(params) {
    let url = 'resetPassword?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  sendEmail(params) {
    let url = 'sendEmail?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  subscribe(params) {
    let url = 'addSubscriber?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  updateProfileInfo(params) {
    let url = 'updateProfileInfo?';
    return api.post(url, params).then(res => {
      if (res.success) {
        storage.setUser(res);
      }
      return res;
    });
  },

  addProductToBasket(params) {
    let url = 'addProductToBasket?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  moveProductToOrders(params) {
    let url = 'moveProductToOrders?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  getBasketProducts(token) {
    let url = 'getBasketProducts?';
    let formData = userMiddleware.toBackEnd.appendToken(token);
    
    return api.post(url, formData).then(response => {
      if (Array.isArray(response)) {
        let data = userMiddleware.fromBackEnd.getBasketProducts(response);
      }
      return response;
    });
  },

  removeBasketProduct(params) {
    let url = 'removeBasketProduct?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  customOrder(params) {
    let url = 'customOrder?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  getProductPrice(params) {
    let url = 'getProductPrice?';
    return api.post(url, params).then(res => {
      return res;
    });
  },

  getOrders() {
    let url = 'getOrders?';
    let formData = userMiddleware.toBackEnd.appendToken();
    return api.post(url, formData).then(res => {
      return res;
    });
  },
};

export default userApi;

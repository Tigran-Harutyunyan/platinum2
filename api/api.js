 
import {
  config
} from './config';

import axios from 'axios';

import {
  EventBus
} from '../components/event-bus';

axios.interceptors.response.use(function (response) { 
  if (response.data.error && response.data.message === "Invalid token") {
    EventBus.$emit('logout');
  }
  return response

}, function (err) {
  return Promise.reject(err);
});
const api = {
  get(url) { 
    return new Promise((resolve, reject) => {  
      axios({
        url: config.host + url,
        method: 'get' 
      }).then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });

    });
  },
  post(url, params) {
    let configs = {
      url: config.host + url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
      
    if (url.includes('addProductToBasket') || url.includes('logout')  || 
        url.includes('getBasketProducts') || url.includes('removeBasketProduct') || 
        url.includes('customOrder') || url.includes('getProductPrice') || 
        url.includes('getOrders') || url.includes('moveProductToOrders'))  { 
      configs.data = params;
    } else {
      configs.params = params;
    }
     
    return new Promise((resolve, reject) => {
      axios(configs).then(response => { 
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      })
    });
  }
};

export default api;

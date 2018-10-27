 import userApi from '../../api/userApi';
 import storage from '../../storage';
 import {
   EventBus
 } from '../../components/event-bus.js';
 export const actions = {
   setDropDownState: ({
     commit
   }, payload) => {
     commit('SET_DROPDOWN_STATE', payload);
   },

   setUser: ({
     commit
   }, payload) => {
     commit('SET_USER', payload);
   },

   setLocale: ({
     commit
   }, payload) => {
     storage.setLocale(payload);
     commit('SET_LOCALE', payload)
   },

   setToken: ({
     commit
   }, payload) => {
     storage.setToken(payload);
     commit('SET_TOKEN', payload)
   },

   deleteToken: ({
     commit
   }, payload) => {
     storage.deleteToken();
     commit('DELETE_TOKEN')
   },

   login: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.login(data).then(
         (response) => {
           if (response.success) {
             commit('SET_USER', response);
             if (response.token) {
               commit('SET_TOKEN', response.token);
             }
           }
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },
   logout: ({
     commit,
     state
   }) => {
     return new Promise((resolve, reject) => {
       userApi.logout().then(
         (response) => {
           commit('SET_USER', {});
           commit('DELETE_TOKEN');
           resolve(response);
         },
         (errorResponse) => {
           commit('SET_USER', {});
           commit('DELETE_TOKEN');
           reject(errorResponse);
         }
       );
     });
   },

   changePassword: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.changePassword(data).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   signup: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.signup(data).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   recover: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.recover(data).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   sendEmail: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.sendEmail(data).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   subscribe: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.subscribe(data).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   updateProfileInfo: ({
     commit,
     state
   }, data) => {
     return new Promise((resolve, reject) => {
       userApi.updateProfileInfo(data).then(
         (response) => {
           if (response.success) {
             commit('SET_USER', response);
           }
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },


   addProductToBasket: ({
     commit,
     state
   }, {
     formData
   }) => {
     return new Promise((resolve, reject) => {
       userApi.addProductToBasket(formData).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   removeBasketProduct: ({
     commit,
     state
   }, {
     formData
   }) => {
     return new Promise((resolve, reject) => {
       userApi.removeBasketProduct(formData).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   moveProductToOrders: ({
     commit,
     state
   }, {
     formData
   }) => {
     return new Promise((resolve, reject) => {
       userApi.moveProductToOrders(formData).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   getBasketProducts: ({
     commit,
     state
   }) => {
     return new Promise((resolve, reject) => {
       userApi.getBasketProducts().then(
         (response) => {
           if (Array.isArray(response)) {
             commit('UPDATE_CART_ITEMS', response);
           }
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   customOrder: ({
     commit,
     state
   }, {
     formData
   }) => {
     return new Promise((resolve, reject) => {
       userApi.customOrder(formData).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   getProductPrice: ({
     commit,
     state
   }, {
     formData
   }) => {
     return new Promise((resolve, reject) => {
       userApi.getProductPrice(formData).then(
         (response) => {
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   },

   getOrders: ({
     commit,
     state
   }) => {
     return new Promise((resolve, reject) => {
       userApi.getOrders().then(
         (response) => {
           if (!response.data.error) {
             commit('UPDATE_ORDERS_DATA', response.data);
           }
           resolve(response);
         },
         (errorResponse) => {
           reject(errorResponse);
         }
       );
     });
   }
 }

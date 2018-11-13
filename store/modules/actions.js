import productsApi from '../../api/productsApi';
import generalApi from '../../api/generalApi';
import userApi from '../../api/userApi';
import utils from '../../utils'; 
import storage from '../../storage';
export default  {

  getProducts: ({
    commit,
    state
  }, data) => {
    return new Promise((resolve, reject) => { 
      productsApi.getProducts(state.locale).then(
        (response) => {
          commit('UPDATE_PRODUCTS', response);

          let productsArray = utils.getProductsArray(response);
          commit('UPDATE_PRODUCTS_ARRAY', productsArray);

          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getCompletedWorks: ({
    commit 
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getCompletedWorks(state.locale).then(
        (response) => {
          if (Array.isArray(response)) {   
             commit('UPDATE_COMPLETED_WORKS', response);
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getCompletedWorkById: ({
    commit,
    state
  }, id) => {
    return new Promise((resolve, reject) => {
      generalApi.getCompletedWorkById(id,state.locale).then(
        (response) => {
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getSliderImages: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getSliderImages(state.locale).then(
        (response) => {
          if (Array.isArray(response)) {
            commit('UPDATE_SLIDER_IMAGES', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getProjectSliderImages: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getProjectSliderImages(state.locale).then(
        (response) => {
          if (Array.isArray(response)) {
            commit('PROJECTS_SLIDER_IMAGES', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getPartnerImages: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getPartnerImages(state.locale).then(
        (response) => {
          if (Array.isArray(response)) {
            commit('UPDATE_PARTNERS_IMAGES', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getCategories: ({
    commit,
    state
  }, data) => {
    return new Promise((resolve, reject) => {
      productsApi.getCategories().then(
        (response) => {
          resolve(response);
          commit('UPDATE_CATEGORIES', response)
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getSearchResults: ({
    commit,
    state
  }, params) => {
    return new Promise((resolve, reject) => {
      productsApi.getSearchResults(params,state.locale).then(
        (response) => {
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getProductById: ({
    commit,
    state
  }, {
    id
  }) => {
    return new Promise((resolve, reject) => {
      productsApi.getProductById(id, state.locale).then(
        (response) => {
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getCustomData : ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getCustomData(state.locale).then(
        (response) => {
          if (response) {
            commit('SET_CUSTOM_DATA', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getStaff: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getStaff(state.locale).then(
        (response) => {
          if (response) {
            commit('UPDATE_STAFF', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  getSamples: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => {
      generalApi.getSamples(state.locale).then(
        (response) => {
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },

  setScrollParams: ({
    commit,
    state
  }, params) => {
    commit('STORE_SCROLL_PARAMS', params);
  },

  setSideBarProducts: ({
    commit,
    state
  }, products) => {
    commit('SET_SIDEBAR', products);
  },

  getAdvertisements: ({
    commit,
    state
  }) => {
    return new Promise((resolve, reject) => { 

      generalApi.getAdvertisements(state.locale).then(
        (response) => {
          if (response) {
            commit('SET_ADVERTISEMENTS', response)
          }
          resolve(response);
        },
        (errorResponse) => {
          reject(errorResponse);
        }
      );
    });
  },
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
    if (process.browser) {
      storage.setLocale(payload);
    } 
    commit('SET_LOCALE', payload)
  },

  setToken: ({
    commit
  }, payload) => {
    if (process.browser) {
      storage.setToken(payload);
    } 
    commit('SET_TOKEN', payload)
  },

  deleteToken: ({
    commit
  }, payload) => {
    //storage.deleteToken();
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

      userApi.getBasketProducts(state.token).then(
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

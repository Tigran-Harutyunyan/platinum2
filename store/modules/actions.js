import productsApi from '../../api/productsApi';
import generalApi from '../../api/generalApi';
import utils from '../../utils'; 
 
export default  {

  getProducts: ({
    commit,
    state
  }, data) => {
    return new Promise((resolve, reject) => {
      productsApi.getProducts().then(
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
      generalApi.getCompletedWorks().then(
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
      generalApi.getCompletedWorkById(id).then(
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
      generalApi.getSliderImages().then(
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
      generalApi.getProjectSliderImages().then(
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
      generalApi.getPartnerImages().then(
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
      productsApi.getSearchResults(params).then(
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
      productsApi.getProductById(id).then(
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
      generalApi.getCustomData().then(
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
      generalApi.getStaff().then(
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
      generalApi.getSamples().then(
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
      generalApi.getAdvertisements().then(
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
  }
}

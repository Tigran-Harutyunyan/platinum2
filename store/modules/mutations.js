export default {

  SET_LANG: (state, locale) => {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  },

  UPDATE_PRODUCTS: (state, products) => {
    state.products = products;
  },

  UPDATE_CATEGORIES: (state, categories) => {
    state.categories = categories;
  },

  SET_CUSTOM_DATA: (state, payload) => {
    state.customData = payload;
  },
  PROJECTS_SLIDER_IMAGES: (state, payload) => {
    state.projectsSliderImages = payload;
  },

  SET_ADVERTISEMENTS: (state, payload) => {
    state.advertisements = payload;
  },

  UPDATE_SLIDER_IMAGES: (state, payload) => {
    state.sliderImages = payload;
  },

  UPDATE_PARTNERS_IMAGES: (state, payload) => {
    state.partnersImages = payload;
  },

  UPDATE_STAFF: (state, items) => {
    state.staff = items;
  },

  UPDATE_COMPLETED_WORKS: (state, items) => {  
    state.completedWorks = items;
  },

  SEARCH: (state, items) => {
    state.searchResults = items;
  },

  STORE_SCROLL_PARAMS: (state, params) => {
    state.scrollParams = params;
  },

  SET_PRODUCT_LIST: (state, products) => {
    state.sidebarProducts = products;
  },

  SET_SIDEBAR: (state, products) => {
    state.sidebarProducts = products;
  },

  UPDATE_PRODUCTS_ARRAY: (state, products) => {
    state.productsArray = products;
  }
}

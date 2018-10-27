 export const mutations = {
   UPDATE_ORDERS_DATA: (state, items) => {
     state.orders = items;
   },
   SET_USER: (state, payload) => {
     state.user = payload;
   },
   UPDATE_CART_ITEMS: (state, items) => {
     state.cart = items;
   },
   SET_LOCALE: (state, locale) => {
     state.locale = locale;
   },
   SET_TOKEN: (state, token) => {
     state.token = token;
   },
   DELETE_TOKEN: (state, token) => {
     state.token = '';
   },
   SET_DROPDOWN_STATE : (state, payload) => {
     state.dropdownOpened = payload;
   },
   SET_LANG: (state, locale) => {
     if (state.locales.indexOf(locale) !== -1) {
       state.locale = locale
     }
   }
 }

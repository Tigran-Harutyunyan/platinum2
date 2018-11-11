 import Vuex from 'vuex';

 import actions from './modules/actions';
 import getters from './modules/getters';
 import mutations from './modules/mutations';

 const store = () => {
   return new Vuex.Store({
     state: () => ({
       locales: [{
           localeName: 'ՀԱՅ',
           activeLocale: false,
           locale: 'am'
         },
         {
           localeName: 'ENG',
           activeLocale: false,
           locale: 'en'
         }
       ],
       locale: '',
       data: {},
       products: '',
       productsArray: '',
       categories: [],
       customData: {},
       sliderImages: [],
       partnersImages: [],
       staff: '',
       completedWorks: [],
       projectsSliderImages: '',
       searchResults: '',
       scrollParams: '',
       sidebarProducts: '',
       advertisements: [],
       cart: '',
       orders: '',
       user: {},
       locale: '',
       token: '',
       dropdownOpened: false,
     }),
     mutations,
     actions,
     getters
   })
 }
 export default store;

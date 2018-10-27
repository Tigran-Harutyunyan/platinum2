 import Vuex from 'vuex';

 import actions from './modules/actions';
 import getters from './modules/getters';
 import mutations from './modules/mutations';

 const store = () => {
   return new Vuex.Store({
     state: () => ({
       locales: [{
           code: 'de',
           name: 'DE'
         },
         {
           code: 'en',
           name: 'EN'
         },
         {
           code: 'ru',
           name: 'RU'
         }
       ],
       locale: 'en',
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
     }),
     mutations, 
     actions,
     getters
   })
 }
 export default store;

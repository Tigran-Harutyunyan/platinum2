 export default {
   appData: state => state.data,
   products: state => state.products,
   categories: state => state.categories,
   getCustomData: state => state.customData,
   getSliderImages: state => state.sliderImages,
   getStaffData: state => state.staff,
   getOrders: state => state.orders,
   getCompletedWorks: state => state.completedWorks,
   partnersImages: state => state.partnersImages,
   projectsSliderImages: state => state.projectsSliderImages,
   scrollParams: state => state.scrollParams,
   sidebarProducts: state => state.sidebarProducts,
   getAdvertisements: state => state.advertisements,
   getProductsArray: state => state.productsArray,
   storage: state => state.storage,
   getCartItems: state => {
     return state.cart
   },
   getUser: state => {
     return state.user
   },
   getLocale: state => {
     return state.locale
   },
   getToken: state => {
     return state.token
   },
   getCartItems: state => {
     return state.cart
   },
   dropdownOpened: state => {
     return state.dropdownOpened
   }
 }

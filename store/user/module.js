import {mutations} from './userMutations';
import {getters} from './userGetters';
import {actions} from './userActions'; 

export default {
  state: () => ({
    cart: '',
    orders: '',
    user: {},
    locale: '',
    token: '',
    dropdownOpened: false, 
  }),
  // namespaced: false,
  getters,
  actions,
  mutations, 
} 
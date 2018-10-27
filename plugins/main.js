// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
 
// ATTENTION. Forgetting .vue extension next to App will cause "Failed to mount component: template or render function not defined" error
 
import Vuelidate from 'vuelidate';



import {
  Carousel,
  CarouselItem,
  Select,
  Option,
  Input,
  Button,
  Checkbox,
  Upload,
  MessageBox,
  Notification,
  Loading,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Form,
  FormItem,
  DatePicker,
  Popover,
  Dialog,
  Collapse,
  CollapseItem
} from 'element-ui';
Vue.use(Loading.directive);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Collapse);
Vue.use(CollapseItem);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang); 

import $ from 'jquery'; 
let slick;
if (process.browser) {  
  require('gsap'); 
  slick = require('slick-carousel'); 
  Vue.component('isotope',  require('vueisotope'));
  //debounce = require('lodash.debounce');
}


/* import VueAnalytics from 'vue-analytics';
const isProd = process.env.NODE_ENV === 'production';
Vue.use(VueAnalytics, {
    id: 'UA-127799677-1', 
    debug: {
      enabled: !isProd,
      sendHitTask: isProd
    }
    
});
 */
 
 
Vue.config.productionTip = false;
Vue.use(Vuelidate);
 

/* let token = localStorage.getItem('token') ? localStorage.getItem("token") : '';
if (token.length) {
  store.dispatch('setToken', token);
}

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : {};
if (Object.keys(user).length > 0) {
  store.dispatch('setUser', user);
} */
 
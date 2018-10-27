import api from './api';
 
import generalMiddleware from '../apiMiddlewares/generalMiddleware';
let lang = 'en';

const generalApi = {

  getCompletedWorks() {
    let url = `getCompletedWorks?lang=${lang}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getCompletedWorks(res);
      }
      return res;
    });
  },

  getCompletedWorkById(id) {
    let url = `getCompletedWorkById?id=${id}&lang=${lang}`;
    return api.get(url).then(res => {
      if (res.images && Array.isArray(res.images)) {
        generalMiddleware.fromBackEnd.getCompletedWorksById(res.images);
      }
      return res;
    });
  },

  getSliderImages() {
    let url = `getSliderImages?lang=${lang}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getSliderImages(res);
      }
      return res;
    });
  },

  getProjectSliderImages() {
    let url = `getProjectSliderImages?lang=${lang}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getProjectSliderImages(res);
      }
      return res;
    });
  },

  getPartnerImages() { 
    let url = `getPartnerImages?lang=${lang}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getPartnerImages(res);
      }
      return res;
    });
  },

  getCustomData() { 
    let url = `getCustomData?lang=${lang}`;
    return api.get(url).then(res => { 
      return res;
    });
  },

  getStaff() { 
    let url = `getStaff?lang=${lang}`;
    return api.get(url).then(res => { 
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getStaff(res);
      }
      return res;
    });
  },

  getSamples() { 
    let url = `getSamples?lang=${lang}`;
    return api.get(url).then(res => { 
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getSamples(res);
      }
      return res;
    });
  },

  getAdvertisements(){ 
    let url = `getAdvertisements?lang=${lang}`;
    return api.get(url).then(res => { 
      if (Object.keys(res).length > 0) { 
        generalMiddleware.fromBackEnd.getAdvertisements(res); 
      }
      return res;
    });
  },
};

export default generalApi;

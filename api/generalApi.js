import api from './api';

import generalMiddleware from '../apiMiddlewares/generalMiddleware';

const generalApi = {

  getCompletedWorks(locale) {
    let url = `getCompletedWorks?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getCompletedWorks(res);
      }
      return res;
    });
  },

  getCompletedWorkById(id, locale) {
    let url = `getCompletedWorkById?id=${id}&lang=${locale}`;
    return api.get(url).then(res => {
      if (res.images && Array.isArray(res.images)) {
        generalMiddleware.fromBackEnd.getCompletedWorksById(res.images);
      }
      return res;
    });
  },

  getSliderImages(locale) {
    let url = `getSliderImages?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getSliderImages(res);
      }
      return res;
    });
  },

  getProjectSliderImages(locale) {
    let url = `getProjectSliderImages?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getProjectSliderImages(res);
      }
      return res;
    });
  },

  getPartnerImages(locale) {
    let url = `getPartnerImages?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getPartnerImages(res);
      }
      return res;
    });
  },

  getCustomData(locale) {
    let url = `getCustomData?lang=${locale}`;
    return api.get(url).then(res => {
      return res;
    });
  },

  getStaff(locale) {
    let url = `getStaff?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getStaff(res);
      }
      return res;
    });
  },

  getSamples(locale) {
    let url = `getSamples?lang=${locale}`;
    return api.get(url).then(res => {
      if (Array.isArray(res)) {
        generalMiddleware.fromBackEnd.getSamples(res);
      }
      return res;
    });
  },

  getAdvertisements(locale) { 

    let url = `getAdvertisements?lang=${locale}`;
    
    return api.get(url).then(res => {
      if (Object.keys(res).length > 0) {
        generalMiddleware.fromBackEnd.getAdvertisements(res);
      }
      return res;
    });
  },
};

export default generalApi;

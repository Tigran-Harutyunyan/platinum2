import {
  config
} from '../api/config';

const generalMiddleware = {
  fromBackEnd: {

    getCompletedWorks(response) {
      response.forEach(element => {
        element.imageStyle = {
            'background-image': `url(${config.imgBaseUrl}${element.image})`
          },
          element.image = `${config.imgBaseUrl}${element.image}`
      });
      return response;
    },

    getCompletedWorksById(images) {
      images.forEach(element => {
        element.image = `${config.imgBaseUrl}${element.image}`;
      });
      return images;
    },

    getSliderImages(images) {
      images.forEach(element => {
        element.imageStyle = {
          'background-image': `url(${config.imgBaseUrl}${element.image})`
        }
        element.image = `${config.imgBaseUrl}${element.image}`;
        element.productLink = `/product/${element.product_id}`;
      });
      return images;
    },

    getProjectSliderImages(images) {
      images.forEach(element => {
        element.thumbnail = `${config.imgBaseUrl}${element.image}`;
        element.image = `${config.imgBaseUrl}${element.popup_image}`;
      });
      return images;
    },

    getPartnerImages(images) {
      images.forEach(element => {
        element.image = `${config.imgBaseUrl}${element.image}`;
      });
      return images;
    },

    getStaff(images) {
      images.forEach(element => {
        element.image = `${config.imgBaseUrl}${element.image}`;
        element.name = `${ element.first_name} ${ element.last_name}`;
      });
      return images;
    },

    getSamples(images) {
      images.forEach(element => {
        element.image = `${config.imgBaseUrl}${element.image}`;
        element.pdf = `${config.imgBaseUrl}${element.pdf}`;
      });
      return images;
    },

    getAdvertisements(response) {
      if (Object.keys(response).length > 0) {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const category = response[key];
            if (key !== 'audio') {
              if (category.length > 0) {
                category.forEach(item => {
                  if (item.image) {
                    item.thumbnail = `${config.imgBaseUrl}${item.image}`;
                    item.image = `${config.imgBaseUrl}${item.popup_image}`;
                  }
                });
              }
            }
            if (key == 'audio') {
              if (category.length > 0) {
                category.forEach(item => {
                  if (item.audio) {
                    item.audio = `${config.imgBaseUrl}${item.audio}`;
                  }
                });
              }
            }
          }
        }
      }
      return response;
    },
  },
  toBackEnd: {}
};

export default generalMiddleware

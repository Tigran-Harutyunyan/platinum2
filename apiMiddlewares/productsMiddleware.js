import {
  config
} from '../api/config.js';
import utils from '../utils';

const middleware = {
  fromBackEnd: {
    parseProducts(products) {
      for (const key in products) {
        if (products.hasOwnProperty(key)) {
          const element = products[key];
          element[0].categoryHref = `/category/${element[0].category_id}`;
          element.forEach(product => {
            product.href = `/product/${product.id}`;
            if (product.images.length) {
              product.image = `${config.imgBaseUrl}${product.images[0].image}`
            } else {
              product.image = '../assets/img/no-image.svg'
            }
          });
        }
      } 
      return products;
    },
    parseProduct(response) {
      if (response.images) {
        response.images.forEach(element => {
          element.image = `${config.imgBaseUrl}${element.image}`;
        });
      }
      let object = response.properties;
      let propertyNames = response.property_names;
      let sortedProperties = [];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          object[key] = {};
          object[key].selected = "";
          object[key].options = element;
          object[key].order_id = utils.getSortId(key, propertyNames);
          object[key]._key = key;
          sortedProperties.push(object[key]);
        }
      }

      sortedProperties.sort(function (a, b) {
        if (a.order_id < b.order_id) return -1;
        if (a.order_id > b.order_id) return 1;
        return 0;
      });

      response.sortedProperties = sortedProperties; 
      return response;
    },

    parseSearchResults(response) {
      let results = []; 
      if (response.categories && Array.isArray(response.categories)) {
        response
          .categories
          .forEach(element => {
            element.url = `/category/${element.id}`;
            results.push(element)
          });
      }
      if (response.products && Array.isArray(response.products)) {
        response
          .products
          .forEach(element => {
            element.url = `/product/${element.id}`;
            results.push(element)
          });
      }
      return results;
    }
  },
  toBackEnd: {

  }
};

export default middleware;

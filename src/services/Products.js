import HttpService from './HttpService';
import RestConstants from './RestConstants';

export default {
  getProducts() {
    let token = localStorage.getItem('user-token');
    return new Promise(function(resolve, reject) {
      HttpService.get(RestConstants.PRODUCTS, token)
        .then(result => resolve(result))
        .catch(err => {
          return reject(err);
        });
    });
  },
}
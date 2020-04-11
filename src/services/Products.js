import HttpService from './HttpService';
import RestConstants from './RestConstants';
import Utils from './Utils';

export default {
  getProducts() {
    let token = localStorage.getItem('user-token');
    return new Promise(function(resolve, reject) {
      HttpService.get(RestConstants.PRODUCTS, token)
        .then(result => resolve(result))
        .catch(Utils.handleErros)
    });
  },
}
import HttpService from './HttpService';
import RestConstants from './RestConstants';

export default {
    registerUser: function (user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.REGISTER, user)
                .then(result => {
                    if (result.status === 200) {
                        return resolve(result);
                    }
                })
                .catch(function(error) {
                    console.error(error);
                });
        });
    },    
    login: function (user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.LOGIN, user)
                .then(result => {
                    if (result.status === 200) {
                        localStorage.setItem('user-token', result.data.accessToken);
                        return resolve(result);
                      }
                })
                .catch(err => {
                    localStorage.removeItem('user-token');
                    return reject(err);
                });
        });
    }
};

import HttpService from './HttpService';
import RestConstants from './RestConstants';
import Utils from './Utils';

export default {
    registerUser(user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.REGISTER, user)
                .then(result => {
                    if (result.status === 200) {
                        localStorage.setItem('user-token', result.data.accessToken);
                        return resolve(result);
                    }
                })
                .catch(error => {
                    if(error.response.status === 422){
                        window.alert(error.response.data.errors.email[0]);
                    } else {
                        console.log(error);
                    }
                });               
        });
    },
    login(user) {
        return new Promise(function (resolve, reject) {
            HttpService.post(RestConstants.LOGIN, user)
                .then(result => {
                    if (result.status === 200) {
                        localStorage.setItem('user-token', result.data.accessToken);
                        return resolve(result);
                    }
                })
                .catch(Utils.handleErros)
        });
    }
};

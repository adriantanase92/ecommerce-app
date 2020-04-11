class HttpService {
    constructor() {
      this.axios = require('axios');
    }
    setContext(appCtx) {
      this.appCtx = appCtx;
    }
    post(url, data) {
      return this.axios.post(process.env.VUE_APP_ROOT_API + url, data);
    }
    get(url, token) {
      return this.axios.get(process.env.VUE_APP_ROOT_API + url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
}
  
export default new HttpService();
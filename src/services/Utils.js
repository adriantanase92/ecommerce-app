export default {
    handleErros(err) {
        if(err.response) {
            console.log("Problem with response ", err.response.status);
        } else if(err.request) {
            console.log("Problem with request!");
        } else {
            console.log('Error: ', err.message);
        }
    }
}

let request = 
{
    get : (uri) => 
    {
        return axios.get(apiURL.concat(uri))
                .then( response => {
                    return response;
                })
                .catch( error => {
                    return error;
                });        
    },

    post : (uri, data) => 
    {
        return axios.post(apiURL.concat(uri), data)
                .then( response => {
                    return response;
                })
                .catch( error => {
                    return error;
                });   
    }

}
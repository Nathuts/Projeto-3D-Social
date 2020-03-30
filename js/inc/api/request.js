
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

        // return new Promise( (resolve,reject) => 
        // {
        //     let uri = apiURL.concat(uri);
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('GET', uri);
        //     xhr.responseType = 'json';
        //     xhr.send();
        //     xhr.onload = () =>
        //     {
        //         if( xhr.status != 200 )
        //         {
        //             reject('error while trying to get data');
        //         }
        //         else 
        //         {
        //             resolve(xhr.response);
        //         }
        //     };
        //     xhr.onerror = () => 
        //     {
        //         reject('error while trying to get data');
        //     }
        //})
        
    }

}
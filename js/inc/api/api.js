if( location.href.indexOf('.com') != -1 )
{
    let apiURL = 'https://rserver01.azurewebsites.net/api/';
}
else 
{
    let apiURL = 'http://127.0.0.1:5000/api/';
};
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

};let Center = 
{
    get : () => {
        return request.get('Center')
        .then( response => {
            response.data.forEach(item => {
                item.address = `${item.street}, ${item.addressNumber} - ${item.district}, ${item.city}, ${item.zipCode}`
            });
            return response.data;
        })
        .catch( response => {
            return response;
        })
    },

    getById : id =>  
    {
        return request.get(`Center/${id}`)
        .then( response => {
            return response.data;
        })
        .catch( response => {
            return response;
        });
    }
};let Demand = 
{
    get : () => {
        return request.get('Demand')
        .then( response => {
            response.data.forEach(item => {
                item.percent = Math.round(item.totalDelivered * 100 / item.totalNeed);
            });
            return response.data;
        })
        .catch( response => {
            return response;
        });
    }
};let Project = 
{
    get : () => {
        return request.get('Project')
        .then( response => {
            response.data.forEach(item => {
              //  item.address = `${item.street}, ${item.addressNumber} - ${item.district}, ${item.city}, ${item.zipCode}`
            });
            return response.data;
        })
        .catch( response => {
            return response;
        })
    },

    getById : id =>  
    {
        return request.get(`Project/${id}`)
        .then( response => {
            return response.data;
        })
        .catch( response => {
            return response;
        });
    }
}
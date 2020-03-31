if( location.href.indexOf('.com') != -1 )
{
    var apiURL = 'https://rserver01.azurewebsites.net/api/';
}
else 
{
    var apiURL = 'http://127.0.0.1:5000/api/';
} ;
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
    },

    add : (data) => 
    {
        return request.post('Project',data)
        .then( response => {
            return response.data;
        })
        .catch( response => {
            return response;
        });
    },

    instance : () => 
    {
        return {
            "name": "",
            "description": "",
            "file": "mask.zip",
        };
    }

}
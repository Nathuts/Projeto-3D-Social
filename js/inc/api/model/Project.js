let Project = 
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
let Center = 
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
}
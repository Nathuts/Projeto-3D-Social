let Demand = 
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
    },
    add : (data) => 
    {
        return request.post('Demand',data)
        .then( response => {
            return response.data;
        })
        .catch( response => {
            return response;
        });
    },
    instance : function()
    {
        return { 
            projectId : "",
            totalNeed : "",
            centerZipCode : "",
            centerStreet : "",
            centerDistrict : "",
            centerAddressNumber : "",
            centerCity : "",
            centerName : "",
            centerDocument : ""
        };
    }
}
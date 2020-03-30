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
    }
}
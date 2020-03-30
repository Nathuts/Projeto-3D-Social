"use strict";

if (location.href.indexOf('.com') != -1) {
  var _apiURL = 'https://rserver01.azurewebsites.net/api/';
} else {
  var _apiURL2 = 'http://127.0.0.1:5000/api/';
}

;
var request = {
  get: function get(uri) {
    return axios.get(apiURL.concat(uri)).then(function (response) {
      return response;
    }).catch(function (error) {
      return error;
    }); // return new Promise( (resolve,reject) => 
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
};
var Center = {
  get: function get() {
    return request.get('Center').then(function (response) {
      response.data.forEach(function (item) {
        item.address = "".concat(item.street, ", ").concat(item.addressNumber, " - ").concat(item.district, ", ").concat(item.city, ", ").concat(item.zipCode);
      });
      return response.data;
    }).catch(function (response) {
      return response;
    });
  },
  getById: function getById(id) {
    return request.get("Center/".concat(id)).then(function (response) {
      return response.data;
    }).catch(function (response) {
      return response;
    });
  }
};
var Demand = {
  get: function get() {
    return request.get('Demand').then(function (response) {
      response.data.forEach(function (item) {
        item.percent = Math.round(item.totalDelivered * 100 / item.totalNeed);
      });
      return response.data;
    }).catch(function (response) {
      return response;
    });
  }
};
var Project = {
  get: function get() {
    return request.get('Project').then(function (response) {
      response.data.forEach(function (item) {//  item.address = `${item.street}, ${item.addressNumber} - ${item.district}, ${item.city}, ${item.zipCode}`
      });
      return response.data;
    }).catch(function (response) {
      return response;
    });
  },
  getById: function getById(id) {
    return request.get("Project/".concat(id)).then(function (response) {
      return response.data;
    }).catch(function (response) {
      return response;
    });
  }
};
//# sourceMappingURL=api.es5.js.map

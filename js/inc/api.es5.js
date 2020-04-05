"use strict";

if (location.href.indexOf('.com') != -1) {
  var apiURL = 'https://rserver01.azurewebsites.net/api/';
} else {
  var apiURL = 'http://127.0.0.1:5000/api/';
}

;
var request = {
  get: function get(uri) {
    return axios.get(apiURL.concat(uri)).then(function (response) {
      return response;
    }).catch(function (error) {
      return error;
    });
  },
  post: function post(uri, data) {
    return axios.post(apiURL.concat(uri), data).then(function (response) {
      return response;
    }).catch(function (error) {
      return error;
    });
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
  },
  add: function add(data) {
    return request.post('Demand', data).then(function (response) {
      return response.data;
    }).catch(function (response) {
      return response;
    });
  },
  instance: function instance() {
    return {
      projectId: "",
      totalNeed: "",
      centerZipCode: "",
      centerStreet: "",
      centerDistrict: "",
      centerAddressNumber: "",
      centerCity: "",
      centerName: "",
      centerDocument: ""
    };
  }
};
var Project = {
  get: function get() {
    return request.get('Project').then(function (response) {
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
  },
  add: function add(data) {
    return request.post('Project', data).then(function (response) {
      return response.data;
    }).catch(function (response) {
      return response;
    });
  },
  instance: function instance() {
    return {
      "name": "",
      "description": "",
      "file": ""
    };
  }
};
//# sourceMappingURL=api.es5.js.map

angular.module('MyApp')
  .factory('Locations', function() {
    return {
      getStates: function() {
        return [
			{"value":"NSW","label":"NSW"},
			{"value":"ACT","label":"ACT"},
			{"value":"QLD","label":"QLD"},
			{"value":"VIC","label":"VIC"},
			{"value":"NT","label":"NT"},
			{"value":"SA","label":"SA"},
			{"value":"WA","label":"WA"},
			{"value":"TAS","label":"TAS"},
			{"value":"Anywhere","label":"Anywhere"},
		];
      },
      getAddress: function(viewValue) {
	      var params = {address: viewValue, sensor: false};
	      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
	      .then(function(res) {
	        console.log(res.data.results)
	        return res.data.results;
	      });
      }
    };
  });	
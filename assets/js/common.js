angular.module('MyApp')
  .directive('passwordStrength', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var indicator = element.children();
        var dots = Array.prototype.slice.call(indicator.children());
        var weakest = dots.slice(-1)[0];
        var weak = dots.slice(-2);
        var strong = dots.slice(-3);
        var strongest = dots.slice(-4);

        element.after(indicator);

        element.bind('keyup', function() {
          var matches = {
                positive: {},
                negative: {}
              },
              counts = {
                positive: {},
                negative: {}
              },
              tmp,
              strength = 0,
              letters = 'abcdefghijklmnopqrstuvwxyz',
              numbers = '01234567890',
              symbols = '\\!@#$%&/()=?¿',
              strValue;

          angular.forEach(dots, function(el) {
            el.style.backgroundColor = '#ebeef1';
          });
          
          if (ngModel.$viewValue) {
            // Increase strength level
            matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
            matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
            matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
            matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
            matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
            matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

            counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
            counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
            counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
            counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

            counts.positive.numChars = ngModel.$viewValue.length;
            tmp += (counts.positive.numChars >= 8) ? 1 : 0;

            counts.positive.requirements = (tmp >= 3) ? tmp : 0;
            counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
            counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

            // Decrease strength level
            matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
            matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
            matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
            matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
            matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

            counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
            counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
            counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

            // Calculations
            strength += counts.positive.numChars * 4;
            if (counts.positive.upper) {
              strength += (counts.positive.numChars - counts.positive.upper) * 2;
            }
            if (counts.positive.lower) {
              strength += (counts.positive.numChars - counts.positive.lower) * 2;
            }
            if (counts.positive.upper || counts.positive.lower) {
              strength += counts.positive.numbers * 4;
            }
            strength += counts.positive.symbols * 6;
            strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
            strength += counts.positive.requirements * 2;

            strength -= counts.negative.consecLower * 2;
            strength -= counts.negative.consecUpper * 2;
            strength -= counts.negative.consecNumbers * 2;

            if (matches.negative.onlyNumbers) {
              strength -= counts.positive.numChars;
            }
            if (matches.negative.onlyLetters) {
              strength -= counts.positive.numChars;
            }

            strength = Math.max(0, Math.min(100, Math.round(strength)));

            if (strength > 85) {
              angular.forEach(strongest, function(el) {
                el.style.backgroundColor = '#008cdd';
              });
            } else if (strength > 65) {
              angular.forEach(strong, function(el) {
                el.style.backgroundColor = '#6ead09';
              });
            } else if (strength > 30) {
              angular.forEach(weak, function(el) {
                el.style.backgroundColor = '#e09115';
              });
            } else {
              weakest.style.backgroundColor = '#e01414';
            }
          }
        });
      },
      template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
    };
  });
angular.module('MyApp')
.filter('noHTML', function () {
    return function(text) {
        return text.replace(/<\/?[^>]+>/gi, '')
    }
});
angular.module('MyApp')
  .factory('Account', function($http, $auth) {
    return {
      find: function() {
        var userId = $auth.getPayload().sub;
        return $http.get('/user/'+ userId);
      },
      update: function(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
      },
      profile: function(profileData) {
        var userId = $auth.getPayload().sub;
        return $http.put('/user/'+ userId, profileData);
      }
    };
  });
angular.module('MyApp')
  .factory('Campaign', function($http, $auth) {
    return {
      find: function() {
        return $http.get('/campaign/');
      },
      create: function(campaign) {
        return $http.post('/campaign/', campaign);
      },
      update: function(campaign) {
        return $http.put('/campaign/' + campaign.id, campaign);
      },
      destory: function(id) {
        return $http.delete('/campaign/' + id);
      },
      addAdmin: function(campaign, user) {
        return $http.post('/campaign/' + campaign.id + '/admin/' + user.id);
      },
      removeAdmin: function(campaign, user) {
        return $http.delete('/campaign/' + campaign.id + '/admin/' + user.id);
      }
    }
  });
angular.module('MyApp')
  .factory('Email', function($http, $auth) {
    return {
      subscribe: function(user) {
        return $http.post('/subscribe/', user);
      }
    };
  });
angular.module('MyApp')
  .factory('Job', function($http, $auth) {
    return {
      getFeed: function(limit) {
        return $http.get('/api/jobs/all');
      },
      getFav: function(limit) {
        return $http.get('/api/jobs/favorites');
      },
      addFav: function(data) {
        return $http.post('/api/jobs/favorites', data);
      },
      deleteFav: function(data) {
        return $http.delete('/api/jobs/favorites', data);
      },
      getJobs: function(limit) {
        return $http.get('/api/jobs/');
      },
      getJob: function(id) {
        return $http.get('/api/jobs/' + id);
      },
      addJob: function(data) {
        return $http.post('/api/jobs/', data);
      },
      updateJob: function(data) {
        return $http.put('/api/jobs/' + data.id, data);
      },
      deleteJob: function(id) {
        return $http.delete('/api/jobs/' + id);
      }
    };
  });
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
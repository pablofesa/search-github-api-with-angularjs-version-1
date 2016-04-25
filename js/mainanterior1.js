(function () {
    'use strict';

    angular.module('githubNav', ['ngMaterial','ngSanitize']);

    // Set up the controller
    angular.module('githubNav')
        .controller('mainCtrl', mainCtrl)

    // Inject dependencies
    mainCtrl.$inject = ['$scope','$http','$timeout','$watch'];

    // Controller
    function mainCtrl ($scope, $http, $timeout, $watch) {
	   	// declaracion de variables
	   	var vm = this;

    	// declaracion de funciones

	    vm.fetch = function() {
	      var asd = {};
	      asd.code = null;
	      asd.response = null;

	      $http({
	      	method: 'get',
	      	url: 'https://api.github.com/search/users',
	      	params: {
	      		q: 'sica'
	      	}
	      }).
	        then(function(response) {
	          asd.status = response.status;
	          asd.data = response.data;
	        }, function(response) {
	          asd.data = response.data || "Request failed";
	          asd.status = response.status;
	      });

	      return asd;
	    };

	    // watchers

		$scope.$watch(function () {
		    return vm.username;
		  }, function (current, original) {
		    console.log(current);
		});

	    vm.responseTemp = vm.fetch();

        $timeout(function (){
        	console.log(vm.responseTemp);
        },5000);

    }

})();
(function () {
    'use strict';

    angular.module('githubNav', ['ngSanitize']);
    angular.module('githubNav').controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$http','$timeout'];

    function mainCtrl ($http, $timeout) {
	   	// declaracion de variables
	   	var vm = this,
	   		timer;
	   	vm.username = '',
	   	vm.usersLoaded = [],
	   	vm.followers = [];
	   	vm.searchWasFilled = false;

    	// declaracion de funciones

    	vm.goBackToHome = function (){
	   		vm.username = '';
	   		vm.searchWasFilled = false;
	   	}

	    vm.fetchUserName = function(username) {
	      var resultUserName = {};
	      vm.usersLoaded = [];
	      vm.loadingUsernameSearch = true;
	      resultUserName.response = null;

	      $http({
	      	method: 'get',
	      	url: 'https://api.github.com/search/users',
	      	params: {
	      		q: username
	      	}
	      }).
	        then(function(response) {
	          // resultUserName.status = response.status;
	          resultUserName.data = response.data;
	          vm.usersLoaded = resultUserName.data.items;
	          vm.loadingUsernameSearch = false;
	        }, function(response) {
	          resultUserName.data = response.data || "Request failed";
	          // resultUserName.status = response.status;
	          console.log(resultUserName.data);
	          vm.loadingUsernameSearch = 'error';
	      });
	    };

	    vm.determinateChange = function(username){
	    	if (username.length > 0){
		    	vm.searchWasFilled = true;
		    }
		    if (username.length < 4){
		    	vm.loadingUsernameSearch = 'more';
		    } else {
		    	vm.loadingUsernameSearch = true;
		    	$timeout.cancel(timer);
		    	var timer = $timeout(function(){
		    		vm.fetchUserName(username);
		    	},800)
		    	
		    }
	    }

    }
})();
// Coded by Pablo Ferreira.
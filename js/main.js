(function () {
    'use strict';

    angular.module('githubNav', ['ngMaterial','ngSanitize']);
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
	   		vm.username = ''; // por alguna razón esto a veces no funciona
	   		vm.searchWasFilled = false;
	   	}

    	function assignFollowers(e, i, a){
    		var arrayEachUserFollowers = [];
    		arrayEachUserFollowers[i] = e.login;
    		return arrayEachUserFollowers;
    	}
    	function assignFollowersArray(e, i, a) {
    		if (i<3){
    			console.log(e);
    			//vm.followers[i] = e.forEach(assignFollowers);
    		}
		}
		function crossingUsersAndFollowers(e, i, a){
			vm.fetchFollowers(e.login);
		}
    	vm.fetchFollowers = function(targetUsername) {
	      var resultFollowers = {};
	      resultFollowers.response = null;

	      $http({
	      	method: 'get',
	      	url: 'https://api.github.com/users/' + targetUsername + '/followers'
	      }).
	        then(function(response) {
	          resultFollowers.status = response.status;
	          resultFollowers.data = response.data;
	          resultFollowers.data.forEach(assignFollowersArray);

	        }, function(response) {
	          resultFollowers.data = response.data || "Request failed";
	          resultFollowers.status = response.status;
	          console.log(resultFollowers.data);
	      });
	    };

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
	          resultUserName.status = response.status;
	          resultUserName.data = response.data;
	          vm.usersLoaded = resultUserName.data.items;
	          vm.usersLoaded.forEach(crossingUsersAndFollowers);
	          console.log(resultUserName.data);
	          vm.fetchFollowers(vm.usersLoaded[0].login);
	          vm.loadingUsernameSearch = false;
	        }, function(response) {
	          resultUserName.data = response.data || "Request failed";
	          resultUserName.status = response.status;
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
		    	},500)
		    	
		    }
	    }

    }
})();
// Coded by Pablo Ferreira.
var app = angular.module('App');

app.factory('auth', ['$resource', '$window', function($resource, $window){
	var auth = {};

	auth.saveToken = function (token){
	  $window.localStorage['xero_token'] = token;
	};

	auth.getToken = function (){
	  return $window.localStorage['xero_token'];
	};
	
	auth.isLoggedIn = function(){
	  var token = auth.getToken();

	  if(token){
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.exp > Date.now() / 1000;
	  } else {
	    return false;
	  }
	};

	auth.currentUser = function(){
	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.username;
	  }
	};

	auth.register = function(user){
	  return $resource('/register').save(user, function(data){
	    auth.saveToken(data.token);
	    return data;
	  }, function (res){
	  	return res;
	  });
	};

	auth.logIn = function(user){
	return $resource('/login').save(user, function(data){
	    auth.saveToken(data.token);
	    return data;
	  }, function (res){
	  	return res;
	  });
	};

	auth.logOut = function(){
	  $window.localStorage.removeItem('xero_token');
	};


	return auth;
}])


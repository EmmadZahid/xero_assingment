angular.module('App', ['ngMaterial', 'ui.router', 'ngResource'])
.config(function ($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/login');
	$stateProvider.state('home', {
	  url: '/home',
	  templateUrl: '/javascripts/home/home.html',
	  controller: 'HomeController',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(!auth.isLoggedIn()){
	      $state.go('login');
	    }
	  }]
	})
	.state('login', {
	  url: '/login',
	  templateUrl: '/javascripts/login/login.html',
	  controller: 'LoginController',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})
	.state('register', {
	  url: '/register',
	  templateUrl: '/javascripts/login/register.html',
	  controller: 'LoginController',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	});
});

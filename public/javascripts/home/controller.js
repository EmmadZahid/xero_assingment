var app = angular.module('App');

app.controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', 'auth'];


function HomeController($scope, $state, auth){
      $scope.user = auth.currentUser();

      $scope.logout = function(){
      		auth.logOut();
      		$state.go('login');
      }
}

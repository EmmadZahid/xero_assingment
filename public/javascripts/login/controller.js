var app = angular.module('App');

app.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$state','auth'];


function LoginController($scope, $state, auth){
       
        $scope.init = function () {

        };

        $scope.signIn = function (signInForm) {
            if (signInForm.$valid) {
                var user = {};
                user.username = $scope.username;
                user.password = $scope.password;
                auth.logIn(user).$promise.then(signInSuccess, signInError);
            }
        };

        var signInSuccess = function (data) {
            
            $state.go('home');
        };

        var signInError = function (response) {
            
            if (response.status == 401) {
                $scope.signInForm['username'].$setValidity('invalidAuth', false);
            }
            else {
                alert("Your network is down.")
            }
        };

        $scope.onNumberFieldChange = function () {
            $scope.signInForm['username'].$setValidity('invalidAuth', true);
        };
}

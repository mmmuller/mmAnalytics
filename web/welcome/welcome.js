(function(mod) {

    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/welcome', {
            templateUrl: 'welcome/welcome.html',
            controller: 'welcomeCtrl'
        });
    }]);

    mod.controller('welcomeCtrl', function($scope) {

    });

})(angular.module('welcome', ['ngRoute']));
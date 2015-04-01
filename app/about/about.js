'use strict';

var module_about = angular.module('myApp.about', ['ngRoute']);

module_about.controller('AboutCtrl', ['$scope', function($scope) {
    $scope.appName = 'My movies app';

}]);





'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'MovieService',
  'myApp.movies',
  'myApp.about'

]);


myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/movies', {
            templateUrl: 'movies/list.html',
            controller: 'MovieDetailCtrl'
        });
        $routeProvider.when('/movies/:movieId', {
            templateUrl: 'movies/list.html',
            controller: 'MovieDetailCtrl'
        });
        $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/about'});
    }]);

'use strict';

var module_movies = angular.module('myApp.movies', ['ngRoute', 'ngSanitize', 'MovieService']);

module_movies.controller('MovieDetailCtrl',
    ['$scope', '$routeParams', '$sce', '$localStorage', 'MovieService',
    function($scope, $routeParams, $sce, $localStorage, movieService) {
        //$scope.movies = [];
        if( $routeParams.movieId ){
            $scope.movieId = $routeParams.movieId;
            $scope.selectedMovie = getMovie($routeParams.movieId);
            $scope.showMovie = Boolean($scope.selectedMovie);
        }
        else{
            $scope.movieId = '';
            $scope.selectedMovie = null;
            $scope.showMovie = false;
        }
        $scope.$storage = $localStorage;
        $scope.showDetails = function(movie){
                showMovie(movie);
            };
        $scope.trustSrc = function(vid) {
                return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + vid);
            };

        $scope.update = function(movie){
            $scope.$storage.movies = $scope.movies;
        };

        $scope.revert = function(movie){
            var vid = movie.id.toString();
            clearData();
            loadRemoteData(
                function(d){
                    $scope.movies=d['movies'];
                    var newMovie = getMovie(vid);
                    showMovie(newMovie);
                }
            );
        };

        if( !$scope.movies ){
            if( $scope.$storage.movies && $scope.$storage.movies.length>0 ){
                $scope.movies = $scope.$storage.movies;
            }
            else{
                loadRemoteData( function(d){$scope.movies=d['movies'];} );
            }
        }



        //----------------------------------
        function clearData() {
            $scope.movies = [];
            $scope.movieId = '';
            $scope.selectedMovie = null;
            $scope.showMovie = false;
        }

        function loadRemoteData(callback) {
            // MovieService returns a promise.
            movieService.getMovies()
                .then(callback
//                    function( data ) {
//                        $scope.movies = data['movies'];
//                    }
                )
            ;
        }

        function showMovie(movie){
            if(movie){
                $scope.selectedMovie = movie;
                $scope.movieId = movie.id;
                $scope.showMovie = Boolean($scope.selectedMovie);
            }
        }

        function getMovie(id) {
            if( $scope.movies ){
                for(var i=0; i<$scope.movies.length; i++){
                    var movie = $scope.movies[i];
                    if( movie.id === id ){
                        return movie;
                    }
                }
            }
            return null;
        }


    }]);


var module_movies_service = angular.module('MovieService', ['ngResource']);
module_movies_service.service( "MovieService",
    function( $http, $q ) {

        // Return public API.
        return({
            getMovies: getMovies
        });

        // ----------------------------------- PUBLIC METHODS.
        function getMovies() {

            var request = $http({
                method: "get",
                url: "movies.json",
                params: {
                    action: "get"
                }
            });
            return( request.then(handleSuccess, handleError) );
        }

        // ----------------------------------- PRIVATE METHODS
        function handleSuccess(response) {
            return( response.data );
        }

        function handleError(response) {
            if ( !angular.isObject(response.data) || !response.data.message ) {
                return( $q.reject("An unknown error occurred.") );
            }
            return( $q.reject(response.data.message) );
        }
    });

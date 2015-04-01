'use strict';

var module_movies = angular.module('myApp.movies', ['ngRoute', 'ngSanitize', 'MovieService']);

//module_movies.controller('MovieListCtrl',
//    ['$scope', 'MovieService',
//        function($scope, movieService) {
//            $scope.movieId = '';
//            $scope.bmovie = Boolean($scope.movieId);
//            $scope.movies = [];
//            loadRemoteData();
//            $scope.showDetails = function(movie){
//                $scope.selectedMovie = movie;
//            };
//
//            function loadRemoteData() {
//                // MovieService returns a promise.
//                movieService.getMovies()
//                    .then(
//                        function( data ) {
//                            $scope.movies = data['movies'];
//                        }
//                    )
//                ;
//            }
//        }
//    ]
//);


module_movies.controller('MovieDetailCtrl',
    ['$scope', '$routeParams', '$sce', 'MovieService',
    function($scope, $routeParams, $sce, movieService) {
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

        $scope.showDetails = function(movie){
                if(movie){
                    $scope.selectedMovie = movie;
                    $scope.movieId = movie.id;
                    $scope.showMovie = Boolean($scope.selectedMovie);
                }
            };
        $scope.trustSrc = function(vid) {
                return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + vid);
            };

        if( !Boolean($scope.movies) )
            loadRemoteData();

        function loadRemoteData() {
            // MovieService returns a promise.
            movieService.getMovies()
                .then(
                    function( data ) {
                        $scope.movies = data['movies'];
                    }
                )
            ;
        }

        function getMovie(id) {
            if( Boolean($scope.movies) ){
                for(var m in $scope.movies){
                    if( m.id === id ){
                        return m;
                    }
                }
            }
            return null;
        }


    }]);



module_movies.service(
    "MovieService",
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

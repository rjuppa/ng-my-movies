var m_movies_service = angular.module('MovieService', ['ngResource']);

m_movies_service.factory('Movies_resource', ['$resource',
  function($resource){
    return $resource('movies.json', {}, {
      query: {method:'GET', params:{}, isArray:false}
    });
  }]);

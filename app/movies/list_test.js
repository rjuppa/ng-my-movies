'use strict';

describe('myApp.movies module', function() {

  beforeEach(module('myApp.movies'));

  describe('movies controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('MovieListCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});
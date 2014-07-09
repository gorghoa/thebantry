"use strict";

define([], function() {

	return ['$scope', 'Paths', function($scope, Paths) {
		// You can access the scope of the controller from here
		$scope.toto = 'ntm';

        $scope.paths = Paths.query();


		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});



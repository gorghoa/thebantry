"use strict";

define([], function() {

	return ['$scope', '$routeParams','Paths', function($scope, $routeParams, Paths) {
		// You can access the scope of the controller from here

        console.log($routeParams);
        $scope.paths = Paths.query({path:$routeParams.path});



		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});



'use strict';

define(['angular', 'services'], function (angular) {

	/* Controllers */
	
	return angular.module('bantry.controllers', ['bantry.services'])
		// Sample controller where service is being used
		.controller('index', ['$scope', '$injector', function ($scope, $injector) {
			require(['controllers/index'], function(ctrl) {
				$injector.invoke(ctrl, this, {'$scope': $scope});
            });
		}])
		.controller('sessionDetail', ['$scope', '$injector', function ($scope, $injector) {
			require(['controllers/sessionDetail'], function(ctrl) {
				$injector.invoke(ctrl, this, {'$scope': $scope});
            });
		}])
});

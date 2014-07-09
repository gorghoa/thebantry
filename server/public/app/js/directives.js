'use strict';

define(['angular', 'services'], function(angular, services) {

	/* Directives */
	
	angular.module('bantry.directives', ['bantry.services'])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		};
	}]);
});

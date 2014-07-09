'use strict';

define(['angular', 'services'], function (angular, services) {

	/* Filters */
	
	var Bantry = angular.module('bantry.filters', ['bantry.services'])

    Bantry.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}]);

    Bantry.filter('escape', [function() {
			return function(text) {
				return encodeURIComponent(text);
			};
	}]);

    Bantry.filter('urlencode', [function() {
			return function(text) {
				return encodeURI(text);
			};
	}]);
});

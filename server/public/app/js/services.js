'use strict';

define(['angular','angularResource'], function (angular) {
	
	/* Services */

	// Demonstrate how to register services
	// In this case it is a simple value service.
	var Bantry = angular.module('bantry.services', ['ngResource']);

    Bantry.value('version', '0.1');

    Bantry.factory('Paths',['$resource',function($resource) {
        return $resource('sessions/:path', {}, {
            query: {method:'GET',params:{path:''}}
        });

    }]);

    return Bantry;


});

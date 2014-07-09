'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'app/partials/index.html',
			controller: 'index'
		});
		$routeProvider.when('/session/:path', {
			templateUrl: 'app/partials/sessionDetail.html',
			controller: 'sessionDetail'
		});
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);

});

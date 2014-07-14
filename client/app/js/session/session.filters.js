'use strict';

	/* Filters */
	
angular.module('bantry.filters', [])

    .filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}])

    .filter('duration',[function() {

        return function(seconds) {
               return moment() .startOf('day')
                        .seconds(seconds)
                        .format('H:mm:ss');
                };
    }])

    .filter('playpause', [function() {
			return function(text) {
                switch(text) {
                    case 'play':
                        return '/app/img/ear.png';

                    default:
                        return text;
                }
			};
	}])

    .filter('escape', [function() {
			return function(text) {
                text=text.replace('/','~~~~');
				return encodeURIComponent(text);
			};
	}])

    .filter('urlencode', [function() {
			return function(text) {
				return encodeURI(text);
			};
	}])
;

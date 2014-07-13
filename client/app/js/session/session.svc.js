
'use strict';
/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('bantry.services',['ngResource'])

    .value('version', '0.1')

    .factory('Sessions',['$resource',function($resource) {
        return $resource('sessions', {}, {
            query: {method:'GET',params:{},isArray: true}
        });
    }])
    .factory('Session',['$resource',function($resource) {
        return $resource('sessions/:path', {}, {
            query: {method:'GET',params:{path:''},isArray: false}
        });
    }])
    .factory('Song',['$resource',function($resource) {
        return $resource('file', {}, {
            save: {method:'PUT'}
        });
    }])
;

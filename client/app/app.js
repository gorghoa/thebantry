'use strict';
		
angular.module('bantry', [
    'ngRoute',
    'bantry.filters',
    'bantry.services',
    'bantry.directives',
    'bantry.controllers'
]);

'use strict';

angular.module('bantry.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
    };
    }])
    .directive("clickToEdit", function() {

    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<a ng-click="enableEditor()" class="edit">Edit</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
            '<input ng-model="view.editableValue">' +
            '<a ng-click="save()" class="save">Save</a>' +
            ' or ' +
            '<a ng-click="disableEditor()" class="cancel">cancel</a>.' +
        '</div>' +
    '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
        },
        controller: function($scope,$element) {

            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
            };
        }
    };
    })

;

'use strict';

angular.module('bantry').config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/', {
			templateUrl: 'app/partials/index.html',
			controller: 'index'
		});
		$routeProvider.when('/session/:path', {
			templateUrl: 'app/partials/sessionDetail.html',
			controller: 'sessionDetail'
		});
		//$routeProvider.otherwise({redirectTo: '/view1'});
}]);



"use strict";
angular.module('bantry.controllers',['bantry.services','bantry.directives'])

    .controller('index', ['$scope', 'Sessions', function ($scope, Sessions) {

            $scope.paths = Sessions.query();
    }])

    .controller('sessionDetail', ['$scope', '$routeParams','Session', function($scope, $routeParams, Session) {
        $scope.session = Session.query({path:$routeParams.path});
        $scope.changeAudioSong=function(song) {
            $scope.song=song;
            
        };
	}])

    .controller('SongController',['$scope','Song',function($scope,Song) {

        $scope.$watch('file',function(current,old) {
            if(angular.equals(current,old)) return;

            Song.save(current);
            console.log(old,current);
        },true);

    }])
;



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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMuanMiLCJkaXJlY3RpdmVzLmpzIiwicm91dGVzLmpzIiwic2Vzc2lvbi9zZXNzaW9uLmN0cmwuanMiLCJzZXNzaW9uL3Nlc3Npb24uZmlsdGVycy5qcyIsInNlc3Npb24vc2Vzc2lvbi5zdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNsaWVudC9hcHAvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXHRcdFxuYW5ndWxhci5tb2R1bGUoJ2JhbnRyeScsIFtcbiAgICAnbmdSb3V0ZScsXG4gICAgJ2JhbnRyeS5maWx0ZXJzJyxcbiAgICAnYmFudHJ5LnNlcnZpY2VzJyxcbiAgICAnYmFudHJ5LmRpcmVjdGl2ZXMnLFxuICAgICdiYW50cnkuY29udHJvbGxlcnMnXG5dKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2JhbnRyeS5kaXJlY3RpdmVzJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnYXBwVmVyc2lvbicsIFsndmVyc2lvbicsIGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbG0sIGF0dHJzKSB7XG4gICAgICAgICAgICBlbG0udGV4dCh2ZXJzaW9uKTtcbiAgICB9O1xuICAgIH1dKVxuICAgIC5kaXJlY3RpdmUoXCJjbGlja1RvRWRpdFwiLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBlZGl0b3JUZW1wbGF0ZSA9ICc8ZGl2IGNsYXNzPVwiY2xpY2stdG8tZWRpdFwiPicgK1xuICAgICAgICAnPGRpdiBuZy1oaWRlPVwidmlldy5lZGl0b3JFbmFibGVkXCI+JyArXG4gICAgICAgICAgICAne3t2YWx1ZX19ICcgK1xuICAgICAgICAgICAgJzxhIG5nLWNsaWNrPVwiZW5hYmxlRWRpdG9yKClcIiBjbGFzcz1cImVkaXRcIj5FZGl0PC9hPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IG5nLXNob3c9XCJ2aWV3LmVkaXRvckVuYWJsZWRcIj4nICtcbiAgICAgICAgICAgICc8aW5wdXQgbmctbW9kZWw9XCJ2aWV3LmVkaXRhYmxlVmFsdWVcIj4nICtcbiAgICAgICAgICAgICc8YSBuZy1jbGljaz1cInNhdmUoKVwiIGNsYXNzPVwic2F2ZVwiPlNhdmU8L2E+JyArXG4gICAgICAgICAgICAnIG9yICcgK1xuICAgICAgICAgICAgJzxhIG5nLWNsaWNrPVwiZGlzYWJsZUVkaXRvcigpXCIgY2xhc3M9XCJjYW5jZWxcIj5jYW5jZWw8L2E+LicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgJzwvZGl2Pic7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJBXCIsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlOiBlZGl0b3JUZW1wbGF0ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIj1jbGlja1RvRWRpdFwiLFxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsJGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgJHNjb3BlLnZpZXcgPSB7XG4gICAgICAgICAgICAgICAgZWRpdGFibGVWYWx1ZTogJHNjb3BlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGVkaXRvckVuYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkc2NvcGUuZW5hYmxlRWRpdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXcuZWRpdG9yRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXcuZWRpdGFibGVWYWx1ZSA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRzY29wZS5kaXNhYmxlRWRpdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZpZXcuZWRpdG9yRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHNjb3BlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmlldy5lZGl0YWJsZVZhbHVlO1xuICAgICAgICAgICAgICAgICRzY29wZS5kaXNhYmxlRWRpdG9yKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB9KVxuXG47XG4iLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdiYW50cnknKS5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG5cblx0XHQkcm91dGVQcm92aWRlci53aGVuKCcvJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvcGFydGlhbHMvaW5kZXguaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnaW5kZXgnXG5cdFx0fSk7XG5cdFx0JHJvdXRlUHJvdmlkZXIud2hlbignL3Nlc3Npb24vOnBhdGgnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC9wYXJ0aWFscy9zZXNzaW9uRGV0YWlsLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ3Nlc3Npb25EZXRhaWwnXG5cdFx0fSk7XG5cdFx0Ly8kcm91dGVQcm92aWRlci5vdGhlcndpc2Uoe3JlZGlyZWN0VG86ICcvdmlldzEnfSk7XG59XSk7XG5cbiIsIlxuXCJ1c2Ugc3RyaWN0XCI7XG5hbmd1bGFyLm1vZHVsZSgnYmFudHJ5LmNvbnRyb2xsZXJzJyxbJ2JhbnRyeS5zZXJ2aWNlcycsJ2JhbnRyeS5kaXJlY3RpdmVzJ10pXG5cbiAgICAuY29udHJvbGxlcignaW5kZXgnLCBbJyRzY29wZScsICdTZXNzaW9ucycsIGZ1bmN0aW9uICgkc2NvcGUsIFNlc3Npb25zKSB7XG5cbiAgICAgICAgICAgICRzY29wZS5wYXRocyA9IFNlc3Npb25zLnF1ZXJ5KCk7XG4gICAgfV0pXG5cbiAgICAuY29udHJvbGxlcignc2Vzc2lvbkRldGFpbCcsIFsnJHNjb3BlJywgJyRyb3V0ZVBhcmFtcycsJ1Nlc3Npb24nLCBmdW5jdGlvbigkc2NvcGUsICRyb3V0ZVBhcmFtcywgU2Vzc2lvbikge1xuICAgICAgICAkc2NvcGUuc2Vzc2lvbiA9IFNlc3Npb24ucXVlcnkoe3BhdGg6JHJvdXRlUGFyYW1zLnBhdGh9KTtcbiAgICAgICAgJHNjb3BlLmNoYW5nZUF1ZGlvU29uZz1mdW5jdGlvbihzb25nKSB7XG4gICAgICAgICAgICAkc2NvcGUuc29uZz1zb25nO1xuICAgICAgICAgICAgXG4gICAgICAgIH07XG5cdH1dKVxuXG4gICAgLmNvbnRyb2xsZXIoJ1NvbmdDb250cm9sbGVyJyxbJyRzY29wZScsJ1NvbmcnLGZ1bmN0aW9uKCRzY29wZSxTb25nKSB7XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnZmlsZScsZnVuY3Rpb24oY3VycmVudCxvbGQpIHtcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuZXF1YWxzKGN1cnJlbnQsb2xkKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBTb25nLnNhdmUoY3VycmVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvbGQsY3VycmVudCk7XG4gICAgICAgIH0sdHJ1ZSk7XG5cbiAgICB9XSlcbjtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cblx0LyogRmlsdGVycyAqL1xuXHRcbmFuZ3VsYXIubW9kdWxlKCdiYW50cnkuZmlsdGVycycsIFtdKVxuXG4gICAgLmZpbHRlcignaW50ZXJwb2xhdGUnLCBbJ3ZlcnNpb24nLCBmdW5jdGlvbih2ZXJzaW9uKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gU3RyaW5nKHRleHQpLnJlcGxhY2UoL1xcJVZFUlNJT05cXCUvbWcsIHZlcnNpb24pO1xuXHRcdFx0fTtcblx0fV0pXG5cbiAgICAuZmlsdGVyKCdkdXJhdGlvbicsW2Z1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzZWNvbmRzKSB7XG4gICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCkgLnN0YXJ0T2YoJ2RheScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2Vjb25kcyhzZWNvbmRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvcm1hdCgnSDptbTpzcycpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgfV0pXG5cbiAgICAuZmlsdGVyKCdwbGF5cGF1c2UnLCBbZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcvYXBwL2ltZy9lYXIucG5nJztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fTtcblx0fV0pXG5cbiAgICAuZmlsdGVyKCdlc2NhcGUnLCBbZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgIHRleHQ9dGV4dC5yZXBsYWNlKCcvJywnfn5+ficpO1xuXHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuXHRcdFx0fTtcblx0fV0pXG5cbiAgICAuZmlsdGVyKCd1cmxlbmNvZGUnLCBbZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJKHRleHQpO1xuXHRcdFx0fTtcblx0fV0pXG47XG4iLCJcbid1c2Ugc3RyaWN0Jztcbi8qIFNlcnZpY2VzICovXG5cbi8vIERlbW9uc3RyYXRlIGhvdyB0byByZWdpc3RlciBzZXJ2aWNlc1xuLy8gSW4gdGhpcyBjYXNlIGl0IGlzIGEgc2ltcGxlIHZhbHVlIHNlcnZpY2UuXG5cblxuYW5ndWxhci5tb2R1bGUoJ2JhbnRyeS5zZXJ2aWNlcycsWyduZ1Jlc291cmNlJ10pXG5cbiAgICAudmFsdWUoJ3ZlcnNpb24nLCAnMC4xJylcblxuICAgIC5mYWN0b3J5KCdTZXNzaW9ucycsWyckcmVzb3VyY2UnLGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCdzZXNzaW9ucycsIHt9LCB7XG4gICAgICAgICAgICBxdWVyeToge21ldGhvZDonR0VUJyxwYXJhbXM6e30saXNBcnJheTogdHJ1ZX1cbiAgICAgICAgfSk7XG4gICAgfV0pXG4gICAgLmZhY3RvcnkoJ1Nlc3Npb24nLFsnJHJlc291cmNlJyxmdW5jdGlvbigkcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSgnc2Vzc2lvbnMvOnBhdGgnLCB7fSwge1xuICAgICAgICAgICAgcXVlcnk6IHttZXRob2Q6J0dFVCcscGFyYW1zOntwYXRoOicnfSxpc0FycmF5OiBmYWxzZX1cbiAgICAgICAgfSk7XG4gICAgfV0pXG4gICAgLmZhY3RvcnkoJ1NvbmcnLFsnJHJlc291cmNlJyxmdW5jdGlvbigkcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSgnZmlsZScsIHt9LCB7XG4gICAgICAgICAgICBzYXZlOiB7bWV0aG9kOidQVVQnfVxuICAgICAgICB9KTtcbiAgICB9XSlcbjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
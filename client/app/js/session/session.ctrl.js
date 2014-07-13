
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



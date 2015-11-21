'use strict';

/**
 * @ngdoc directive
 * @name walve.calendar
 * @description
 * # custom calendar for walve
 */
angular.module('walveApp')
	.directive('calendar',function() {
    return {
        templateUrl:'scripts/directives/calendar/calendar.html',
        restrict: 'E',
        transclude: true,
        scope: {
	        //'click': '&on-click'
  		}
    };
  });

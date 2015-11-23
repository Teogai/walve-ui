'use strict';

/**
 * @ngdoc directive
 * @name walve.calendar
 * @description
 * # custom calendar for walve
 */
angular.module('walveApp')
	.directive('calendar',function() {

    var controller = ['$scope', function($scope) {

      var date = new Date();
      var curMon = getMonday(date);
      var curMonloop = curMon;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      $scope.calendar = $scope.data;
      $scope.calendar.mon = curMonloop.getDate();
      curMonloop.setDate(curMonloop.getDate() + 1);
      $scope.calendar.tue = curMonloop.getDate();
      curMonloop.setDate(curMonloop.getDate() + 1);
      $scope.calendar.wed = curMonloop.getDate();
      curMonloop.setDate(curMonloop.getDate() + 1);
      $scope.calendar.thu = curMonloop.getDate();
      curMonloop.setDate(curMonloop.getDate() + 1);
      $scope.calendar.fri = curMonloop.getDate();

      $scope.calendar.month = monthNames[curMon.getMonth()];
      $scope.calendar.year = curMon.getFullYear();
      
      $scope.clicked = function () {
        console.log('clicked');
        $scope.calendar.month = 'December';
      };

      $scope.previousMonth = function () {
        console.log('lastMonth');
        // $scope.calendar.month = 'December';
      };

      $scope.previousWeek = function () {
        console.log('lastWeek');
        // $scope.calendar.month = 'December';
      };

      $scope.nextWeek = function () {
        console.log('nextWeek');
        // $scope.calendar.month = 'December';
      };

      $scope.clicked = function () {
        console.log('nextMonth');
        // $scope.calendar.month = 'December';
      };

      function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

    }];

    return {
      templateUrl:'scripts/directives/calendar/calendar.html',
      restrict: 'E',
      transclude: true,
      scope: {
          data: '=',
		  },
      controller: controller,
    };
  });

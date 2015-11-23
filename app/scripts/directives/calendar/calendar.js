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
      var curMon = date;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
      $scope.calendar = $scope.data;

      refreshTable(date);
      
      $scope.clicked = function () {
        console.log('click tum mai, yung mai dai tum');
      };

      $scope.previousMonth = function () {
        console.log('lastMonth');
        var d = curMon;
        d.setDate(d.getDate() - 28);
        refreshTable(d);
      };

      $scope.previousWeek = function () {
        console.log('lastWeek');
        var d = curMon;
        d.setDate(d.getDate() - 7);
        refreshTable(d);
      };

      $scope.nextWeek = function () {
        console.log('nextWeek');
        var d = curMon;
        d.setDate(d.getDate() + 7);
        refreshTable(d);
      };

      $scope.nextMonth = function () {
        console.log('nextMonth');
        var d = curMon;
        d.setDate(d.getDate() + 28);
        refreshTable(d);
      };

      function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

      function refreshTable(d) {
        curMon = getMonday(d);
        console.log(curMon);
        var curMonloop = new Date(curMon);

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

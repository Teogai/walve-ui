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

      $scope.calendar = $scope.data;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      $scope.calendar.clicked = function () {
        console.log('click tum mai, yung mai dai tum');
      };

      $scope.calendar.previousMonth = function () {
        var d = curMon;
        d.setDate(d.getDate() - 28);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.previousWeek = function () {
        var d = curMon;
        d.setDate(d.getDate() - 7);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.nextWeek = function () {
        var d = curMon;
        d.setDate(d.getDate() + 7);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.nextMonth = function () {
        var d = curMon;
        d.setDate(d.getDate() + 28);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.getMonday = function(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

      $scope.calendar.refreshTable = function(d) {
        curMon = $scope.calendar.getMonday(d);
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

        $scope.calendar.year = curMon.getFullYear();
        if(curMonloop.getFullYear()!=curMon.getFullYear()) {
          $scope.calendar.month = monthNames[curMon.getMonth()] + " " + $scope.calendar.year + " -";
          $scope.calendar.year = monthNames[curMonloop.getMonth()] + " " + curMonloop.getFullYear();
        } else {
          $scope.calendar.month = monthNames[curMon.getMonth()];
          if(curMonloop.getMonth()!=curMon.getMonth()) $scope.calendar.month += " - " + monthNames[curMonloop.getMonth()];
        } 
      }

      var date = new Date($scope.calendar.wantDate);
      if($scope.calendar.wantDate == null) date = new Date();
      var curMon = date;
      $scope.calendar.refreshTable(date);

      $scope.number = 40;
      $scope.getNumber = function(num) {
        return new Array(num);   
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

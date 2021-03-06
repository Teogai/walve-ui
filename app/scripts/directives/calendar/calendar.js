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

      $scope.Math = window.Math;
      $scope.calendar = $scope.data;
      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      // $scope.calendar.clicked = function (i, j) {
      //   console.log(i + ' ' + j);
      // };

      $scope.calendar.previousMonth = function () {
        var d = $scope.calendar.curMon;
        d.setDate(d.getDate() - 28);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.previousWeek = function () {
        var d = $scope.calendar.curMon;
        d.setDate(d.getDate() - 7);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.nextWeek = function () {
        var d = $scope.calendar.curMon;
        d.setDate(d.getDate() + 7);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.nextMonth = function () {
        var d = $scope.calendar.curMon;
        d.setDate(d.getDate() + 28);
        $scope.calendar.refreshTable(d);
      };

      $scope.calendar.getMonday = function(d) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

      // $scope.calendar.updateInsideTable = function(){      
      //   for (var i = 0; i < $scope.number; i++) {
      //       $scope.calendar.table[i] = [];
      //     for (var j = 0; j < $scope.number2; j++) {
      //       $scope.calendar.table[i][j] = Math.floor((Math.random() * 100) + 1);
      //     };
      //   };
      // }

      $scope.calendar.refreshTable = function(d) {
        $scope.calendar.curMon = $scope.calendar.getMonday(d);
        var curMonloop = new Date($scope.calendar.curMon);

        $scope.calendar.mon = curMonloop.getDate(); 
        curMonloop.setDate(curMonloop.getDate() + 1);
        $scope.calendar.tue = curMonloop.getDate(); 
        curMonloop.setDate(curMonloop.getDate() + 1);
        $scope.calendar.wed = curMonloop.getDate(); 
        curMonloop.setDate(curMonloop.getDate() + 1);
        $scope.calendar.thu = curMonloop.getDate(); 
        curMonloop.setDate(curMonloop.getDate() + 1);
        $scope.calendar.fri = curMonloop.getDate();

        $scope.calendar.year = $scope.calendar.curMon.getFullYear();
        if(curMonloop.getFullYear()!=$scope.calendar.curMon.getFullYear()) {
          $scope.calendar.month = monthNames[$scope.calendar.curMon.getMonth()] + " " + $scope.calendar.year + " -";
          $scope.calendar.year = monthNames[curMonloop.getMonth()] + " " + curMonloop.getFullYear();
        } else {
          $scope.calendar.month = monthNames[$scope.calendar.curMon.getMonth()];
          if(curMonloop.getMonth()!=$scope.calendar.curMon.getMonth()) $scope.calendar.month += " - " + monthNames[curMonloop.getMonth()];
        } 
        $scope.calendar.updateInsideTable();
      }

      var date = new Date($scope.calendar.wantDate);
      if($scope.calendar.wantDate == null) date = new Date();
      $scope.calendar.curMon = date;
      $scope.calendar.table = [];

      $scope.number = 20;
      $scope.number2 = 5;
      $scope.getNumber = function(num) {
        var x = new Array(num);
        for (var i = 0; i < num; i++) {
          x[i] = i;     
        };
        return x;
      }

      $scope.isLessthan = function(num,num2) {
        return num < num2;
      }

      $scope.isModable = function(num,num2,num3) {
        return num%num2 < num3;
      }

      $scope.calendar.refreshTable(date);

      //------------------------------Preparation for database tableData---------------------------------------//
      var db = []; //link here with callback from db; //Array of [Date][TimePeriod]

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

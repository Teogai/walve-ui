'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('ScheduleCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.makeSchedule = [];
  	$scope.makeSchedule.doctorID = '';
  	$scope.makeSchedule.date = '';
	$scope.makeSchedule.style = '';
	$scope.makeSchedule.endDate = '';
	
	//---------------------------------------Choose date to add-----------------------------------//
   	
   	$scope.makeSchedule.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'schedule',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				doctorID : $scope.makeSchedule.doctorID,
				date : $scope.makeSchedule.date,
				style : $scope.makeSchedule.style,
				endDate : $scope.makeSchedule.endDate
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

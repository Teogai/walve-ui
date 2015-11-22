'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('removeScheduleCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.removeSchedule = [];
  	$scope.removeSchedule.doctorID = '';
  	$scope.removeSchedule.oldDate = [];
	$scope.removeSchedule.style = '';
	$scope.removeSchedule.endDate = '';
	
	//---------------------------------------Choose date to add-----------------------------------//
   	
   	$scope.removeSchedule.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'removeSchedule',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				doctorID : $scope.removeSchedule.doctorID,
				oldDate : $scope.removeSchedule.oldDate,
				style : $scope.removeSchedule.style,
				endDate : $scope.removeSchedule.endDate
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

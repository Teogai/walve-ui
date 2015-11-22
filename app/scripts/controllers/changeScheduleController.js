'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('ChangeScheduleCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.changeSchedule = [];
  	$scope.changeSchedule.doctorID = '';
  	$scope.changeSchedule.oldDate = [];
	$scope.changeSchedule.style = '';
	$scope.changeSchedule.endDate = '';
	$scope.changeSchedule.newDate = '';
	
	//---------------------------------------Choose date to add-----------------------------------//
   	
   	$scope.changeSchedule.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'changeSchedule',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				doctorID : $scope.changeSchedule.doctorID,
				date : $scope.changeSchedule.date,
				style : $scope.changeSchedule.style,
				endDate : $scope.changeSchedule.endDate,
				newDate : $scope.changeSchedule.newDate
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

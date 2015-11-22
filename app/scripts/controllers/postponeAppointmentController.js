'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('PostponeAppointmentCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.postpone = [];
  	$scope.postpone.number = '';
  	$scope.postpone.oldDate = '';
	
	$scope.confirmPostpone = [];
	$scope.confirmPostpone.patientID = '';
	$scope.confirmPostpone.doctor = '';
	$scope.confirmPostpone.newDate = '';
	
	//---------------------------------------Input to find appointment data------------------------------------------//
   	
   	$scope.postpone.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'postpone',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.postpone.number,
				oldDate : $scope.postpone.oldDate
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	//---------------------------------------Choose New Date-----------------------------------------------//
  	$scope.confirmPostpone.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'postpone2',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				patientID : $scope.responseData.patientID,
				doctor: $scope.responseData.doctor,
				oldDate: $scope.postpone.date,
				newDate: $scope.confirmPostpone.newDate
			}
		}).then(function successCallback(response) {
			
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('DispenseCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.findPatient = [];
  	$scope.findPatient.patientID = '';
  	$scope.dispense = [];
  	$scope.dispense.medicineName = '';
  	$scope.dispense.amount = '';
	
	//---------------------------------------Input to find Patient-----------------------------------//
   	
   	$scope.findPatient.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'dispense',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				patientID : $scope.findPatient.patientID
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};


  	//---------------------------------------Add patient's medicine-----------------------------------------------//
  	$scope.dispense.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'dispense2',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				patientID : $scope.findPatient.patientID,
				medicineName: $scope.dispense.medicineName,
				amount: $scope.dispense.amount
			}
		}).then(function successCallback(response) {
			
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('AppointmentCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.findPatient = [];
  	$scope.findPatient.patientID = '';
  	$scope.basicData = [];
  	$scope.basicData.weight = '';
  	$scope.basicData.height = '';
  	$scope.basicData.temperature = '';
  	$scope.basicData.heartRate = '';
  	$scope.basicData.pressure = '';
	
	//---------------------------------------Input to find Patient-----------------------------------//
   	
   	$scope.findPatient.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'appointment',
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


  	//---------------------------------------Add patient's basic data-----------------------------------------------//
  	$scope.basicData.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				patientID : $scope.findPatient.patientID,
				weight: $scope.basicData.weight,
				height: $scope.basicData.height,
				temperature: $scope.basicData.temperature,
				heartRate: $scope.basicData.heartRate,
				pressure: $scope.basicData.pressure
			}
		}).then(function successCallback(response) {
			
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('SymptomCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.findPatient = [];
  	$scope.findPatient.patientID = '';
  	$scope.symptom = [];
  	$scope.symptom.icd10 = '';
  	$scope.symptom.medicineType = '';
  	$scope.symptom.amount = '';
  	$scope.symptom.comment = '';
	
	//---------------------------------------Input to find Patient-----------------------------------//
   	
   	$scope.findPatient.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'symptom',
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


  	//---------------------------------------Add patient's symptom-----------------------------------------------//
  	$scope.symptom.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'symptom2',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				patientID : $scope.findPatient.patientID,
				icd10: $scope.symptom.icd10,
				medicineType: $scope.symptom.medicineType,
				amount: $scope.symptom.amount,
				comment: $scope.symptom.comment
			}
		}).then(function successCallback(response) {
			
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

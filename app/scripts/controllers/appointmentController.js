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
  	$scope.isNextStep = false;

  	$scope.makeData = [];
  	$scope.makeData.number = '';
  	$scope.makeData.types = [{
	  	id: 1,
	  	label: 'Department',
	  	details: [
	  		{
	  			id: 1,
	  			label: 'Department A',	
	  		},
	  		{
	  			id: 2,
	  			label: 'Department B',	
	  		},
		]
	}, {
	  id: 2,
	  label: 'Doctors',
	  details: [
	  		{
	  			id: 1,
	  			label: 'Doctor A',	
	  		},
	  		{
	  			id: 2,
	  			label: 'Doctor B',	
	  		},
		]
	}];
	
	$scope.makeData.selectedType = [];
  	$scope.makeData.selectedTypeDetail = [];

	$scope.confirmData = [];
	$scope.confirmData.date = [];
	
	//---------------------------------------Input to find fastest date-----------------------------------//
   	
   	$scope.makeData.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.makeData.number,
				selectedType : $scope.makeData.selectedType,
				selectedTypeDetail : $scope.makeData.selectedTypeDetail
			}
		}).then(function successCallback(response) {
			$scope.isNextStep = true;
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	//---------------------------------------Choose Date-----------------------------------------------//
  	$scope.confirmData.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.makeData.number,
				doctorID: $scope.confirmData.doctorID,
				date: $scope.confirmData.date
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
			if ($scope.responseData.success) {
				//show dialog like a confirmation card
			}
		  	// console.log(response.data);
			else {
				//"Sorry but it's full already; try selecting a new date"
				// do this again
			}		  	


		  	}
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  });

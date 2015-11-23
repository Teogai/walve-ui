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
  	$scope.getDepartmentList = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'department/get',
			headers: {
			'Content-Type': 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.departmentList = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

	$scope.getDepartmentList = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'doctor/get',
			headers: {
			'Content-Type': 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.doctorList = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	$scope.showMake = true;
  	$scope.showConfirm = false;
  	$scope.showCalendar = false;

  	$scope.makeData = [];
  	$scope.makeData.number = '';
  	$scope.makeData.types = [{
	  	id: 1,
	  	label: 'Department',
	  	details: $scope.departmentList,
	}, {
		id: 2,
		label: 'Doctor',
		details: $scope.doctorList,
	}];
	
	$scope.makeData.selectedType = [];
  	$scope.makeData.selectedTypeDetail = [];

	$scope.confirmData = [];
	$scope.confirmData.date = [];
	
	//---------------------------------------Input to find fastest date-----------------------------------//
   	
   	$scope.makeData.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.makeData.number,
				selectedType : $scope.makeData.selectedType,
				selectedTypeDetail : $scope.makeData.selectedTypeDetail
			}
		}).then(function successCallback(response) {
			$scope.showMake = false;
			$scope.showConfirm = true;
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
			url: $scope.global.laravelURL + 'appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.makeData.number,
				doctor: $scope.responseData.doctor,
				date: $scope.confirmData.date
			}
		}).then(function successCallback(response) {
			
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};


  	$scope.confirmData.changeDate = function(){
  		$scope.showCalendar = true;
  		$scope.showConfirm = false;
  	}

  	$scope.calendar = [];
  	$scope.calendar.month = 'November';
  	 
  });

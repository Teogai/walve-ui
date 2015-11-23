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
  	
  	function setTypes(){
  		$scope.makeData.types = [{
		  	id: 1,
		  	label: 'Department',
		  	details: $scope.departmentList,
		}, {
			id: 2,
			label: 'Doctor',
			details: $scope.doctorList,
		}];
  	}

  	$scope.getDepartmentList = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'department/get',
			headers: {
			'Content-Type': 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.departmentList = response.data;
			$scope.getDoctorList();
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

	$scope.getDoctorList = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'doctor/get',
			headers: {
			'Content-Type': 'application/json'
			}
		}).then(function successCallback(response) {
			$scope.doctorList = response.data;
		  	setTypes();
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	

  	$scope.showMake = true;
  	$scope.showConfirm = false;
  	$scope.showCalendar = false;

  	$scope.makeData = [];
  	$scope.makeData.disableNumber = false;
  	$scope.makeData.number = '';
  	if($scope.global.user.type == 'patient'){
  		$scope.makeData.disableNumber = true;
  		$scope.makeData.number = $scope.global.user.data.hospital_number;
  	}

	$scope.getDepartmentList();

	$scope.makeData.selectedType = [];
  	$scope.makeData.selectedDepartment = [];
  	$scope.makeData.selectedDoctor = [];

	$scope.confirmData = [];
	$scope.confirmData.date = [];
	
	//---------------------------------------Input to find fastest date-----------------------------------//
   	
   	$scope.makeData.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'appointment/make',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.makeData.number,
				selectedType : $scope.makeData.selectedType,
				selectedDepartment : $scope.makeData.selectedDepartment,
				selectedDoctor : $scope.makeData.selectedDoctor
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
			url: $scope.global.laravelURL + 'appointment/confirm',
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
  		// $scope.calendar.refreshTable("2016-12-23");
  	}

  	$scope.calendar = [];
  	 
  });

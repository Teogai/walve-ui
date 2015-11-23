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
  		$scope.makeData.number = $scope.global.user.data.hospital_number;
  	}

	$scope.getDepartmentList();

	$scope.makeData.selectedType = [];
  	$scope.makeData.selectedDepartment = [];
  	$scope.makeData.selectedDoctor = [];

	$scope.confirmData = [];
	$scope.confirmData.date = [];

	$scope.calendar = [];
	
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
			$scope.confirmData = response.data;
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
			data: $scope.confirmData
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	function fillTableData(data){
		for (var i = 0; i < data.mon.length; i++) {
			if(data.mon[i].schedule_id != i + 1) {
				var n = data.mon[i].schedule_id - i
				for (var j = 0; j < n ; j++) {
					data.mon.splice(i,0,null);
					i++;
				}
			}
		}
		for (var i = 0; i < data.tue.length; i++) {
			if(data.tue[i].schedule_id != i + 1) {
				var n = data.tue[i].schedule_id - i
				for (var j = 0; j < n ; j++) {
					data.tue.splice(i,0,null);
					i++;
				}
			}
		}
		for (var i = 0; i < data.wed.length; i++) {
			if(data.wed[i].schedule_id != i + 1) {
				var n = data.wed[i].schedule_id - i
				for (var j = 0; j < n ; j++) {
					data.wed.splice(i,0,null);
					i++;
				}
			}
		}
		for (var i = 0; i < data.thu.length; i++) {
			if(data.thu[i].schedule_id != i + 1) {
				var n = data.thu[i].schedule_id - i
				for (var j = 0; j < n ; j++) {
					data.thu.splice(i,0,null);
					i++;
				}
			}
		}
		for (var i = 0; i < data.fri.length; i++) {
			if(data.fri[i].schedule_id != i + 1) {
				var n = data.fri[i].schedule_id - i
				for (var j = 0; j < n ; j++) {
					data.fri.splice(i,0,null);
					i++;
				}
			}
		}
		return data;
	};

  	$scope.changeDate = function(){
  		$scope.calendar.updateInsideTable = function(){  
  			var date = $scope.calendar.curMon.getDate();
  			var month = $scope.calendar.curMon.getMonth() + 1;
  			var year = $scope.calendar.curMon.getFullYear();

  			var fullDate = year + '-' + month + '-' + date;

	  		$http({
	  			method: 'POST',
				url: $scope.global.laravelURL + 'appointment/getdata',
				headers: {
				'Content-Type': 'application/json'
				},
				data: {
					selectedDoctor: $scope.confirmData.doctor,
					date: fullDate
				}
			}).then(function successCallback(response) {
				$scope.calendar.table = fillTableData(response.data);
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
	  	};
  		$scope.calendar.refreshTable($scope.confirmData.earliestTime);
  		$scope.showCalendar = true;
  		$scope.showConfirm = false;
  	};
  	 
  	$scope.calendar.updateInsideTable = function(){  };

  });

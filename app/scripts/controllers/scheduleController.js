'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('ScheduleCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';


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

  	$scope.doctorList = [];
  	$scope.departmentList = [];

  	$scope.selectedDoctor = [];
  	$scope.selectedDepartment = [];
	
	$scope.calendar = [];
	$scope.calendar.hideHn = false;

	$scope.getDepartmentList();

	//---------------------------------------Choose date to add-----------------------------------//
   	function fillTableData(data){
  		for (var k = 0; k < data.length; k++) {
  			for (var i = 0; i < data[k].length; i++) {
				if(data[k][i].schedule_id != i + 1) {
					var n = data[k][i].schedule_id - i
					for (var j = 0; j < n ; j++) {
						data[k].splice(i,0,null);
						i++;
					}
				}
			}
  		};
		
		return data;
	};

	$scope.calendar.updateInsideTable = function(){  
		var date = $scope.calendar.curMon.getDate();
		var month = $scope.calendar.curMon.getMonth() + 1;
		var year = $scope.calendar.curMon.getFullYear();

		var fullDate = year + '-' + month + '-' + date;

		$http({
			method: 'POST',
		url: $scope.global.laravelURL + 'appointment/getcalendardata',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			selectedDoctor: $scope.selectedDoctor,
			date: fullDate
		}
	}).then(function successCallback(response) {
		$scope.calendar.table = fillTableData(response.data);
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
  	};

  });

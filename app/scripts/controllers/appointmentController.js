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

  console.log($scope.global.patientData);
  			

  	
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

  	$scope.calendar = [];

  	$scope.showMake = true;
  	$scope.showConfirm = false;
  	$scope.showCalendar = false;
  	$scope.showComplete = false;

  	$scope.makeData = [];
  	$scope.makeData.disableNumber = false;
  	$scope.makeData.number = '';
  	if($scope.global.user.type == 'patient'){
  		$scope.makeData.number = $scope.global.user.data.hospital_number;
  		$scope.calendar.hideHn = true;
  	}
  	else{
  		$scope.calendar.hideHn = false;
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
			$scope.confirmData.patient = response.data.patient;
			$scope.confirmData.doctor = response.data.doctor;
			$scope.confirmData.earliestTime = response.data.earliestTime;
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
				patient: $scope.confirmData.patient,
				doctor: $scope.confirmData.doctor,
				earliestTime: $scope.confirmData.earliestTime,
			}
		}).then(function successCallback(response) {
			$scope.showConfirm = false;
			$scope.showComplete = true;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	function fillTableData(data){
  		for (var k = 0; k < data.length; k++) {
  			for (var i = 0; i < data[k].length; i++) {
				if(data[k][i].schedule_id != i + 1) {
					var n = data[k][i].schedule_id - i - 1;
					for (var j = 0; j < n ; j++) {
						data[k].splice(i,0,null);
						i++;
					}
				}
			}
  		};
		
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
				url: $scope.global.laravelURL + 'appointment/getcalendardata',
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

	  	$scope.calendar.clicked = function (i, j) {
	        if($scope.calendar.table[i][j].hospital_number==null) {
	        	var date = angular.copy($scope.calendar.curMon);
	        	date.setDate(date.getDate() + i);

	        	var day = date.getDate();
	  			var month = date.getMonth() + 1;
	  			var year = date.getFullYear();

	  			var fullDate = year + '-' + month + '-' + day;

		  		$http({
		  			method: 'POST',
					url: $scope.global.laravelURL + 'schedule/gettime',
					headers: {
					'Content-Type': 'application/json'
					},
					data: {
						schedule_id: j + 1
					}
				}).then(function successCallback(response) {
					$scope.confirmData.earliestTime = fullDate + ' ' + response.data;
					$scope.showCalendar = false;
  					$scope.showConfirm = true;
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
	        }
	    };

  		$scope.calendar.refreshTable($scope.confirmData.earliestTime);
  		$scope.showCalendar = true;
  		$scope.showConfirm = false;
  	};
  	 
  	$scope.calendar.updateInsideTable = function(){  };

  });

'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('TreatmentCtrl', function($scope, $http) {
	$scope.showTreatment = false;

  	$scope.findPatient = [];
  	$scope.findPatient.patientID = '';

  	$scope.editBasicData = true;
  	$scope.basicData = [];
  	$scope.basicData.height = '';
  	$scope.basicData.weight = '';
  	$scope.basicData.bloodType = '';
  	$scope.basicData.pulseRate = '';
  	$scope.basicData.bloodPressure = '';
  	$scope.basicData.temperature = '';
  	$scope.basicData.symptom = '';
  	$scope.basicData.duration = '';
  	$scope.basicData.drugAllergy = '';

	$scope.editDiagnose = false;
  	$scope.diagnose = [];
  	$scope.diagnose.icd10 = '';
  	$scope.diagnose.method = '';
  	$scope.diagnose.medicineList = '';
  	$scope.diagnose.detail = '';

  	$scope.calendar = [];
  	$scope.calendar.hideHn = false;
	
	//---------------------------------------Input to find Patient-----------------------------------//
   	
   	$scope.findPatient.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'treatment',
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
  		$scope.editBasicData = false;
  		$scope.editDiagnose = true;
  		$http({
  			method: 'POST',
			url: $scope.global.laravelURL + 'treatment2',
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
				selectedDoctor: $scope.global.user.data,
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
  		if($scope.calendar.table[i][j].hospital_number!=null){
				$scope.showTreatment = true;
		}
  		
  	};

  });

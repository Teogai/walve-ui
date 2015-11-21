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
		  	console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

  	$scope.confirmData;
  });

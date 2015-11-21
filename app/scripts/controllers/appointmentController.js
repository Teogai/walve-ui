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
  	$scope.laravelURL = '../../';
  	$scope.number = '';
  	$scope.types = [{
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
  	$scope.selectedType = [];
  	$scope.selectedTypeDetail = [];
  	$scope.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'public/appointment',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.number,
				selectedType : $scope.selectedType,
				selectedTypeDetail : $scope.selectedTypeDetail
			}
		}).then(function successCallback(response) {
		  	console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};


  });

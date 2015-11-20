'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
<<<<<<< HEAD
  .controller('AppointmentCtrl', function($scope) {
  	$scope.func = {
  		send: function(){

  		}
  	};
=======
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
		  method: 'GET',
		  url: $scope.laravelURL + 'public/appointment'
		}).then(function successCallback(response) {
		  	$scope.number = response.data;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
>>>>>>> origin/teogai
  });

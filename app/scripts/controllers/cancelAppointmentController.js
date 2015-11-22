'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('CancelAppointmentCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.cancel = [];
  	$scope.cancel.number = '';
  	$scope.cancel.oldDate = '';
	
	//---------------------------------------Input to find appointment data------------------------------------------//
   	
   	$scope.cancel.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'cancel',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				number : $scope.cancel.number,
				oldDate : $scope.cancel.oldDate
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};
  });

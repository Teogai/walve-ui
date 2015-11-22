'use strict';
/**
 * @ngdoc function
 * @name walveApp.controller:AppointmentCtrl
 * @description
 * # AppointmentCtrl
 * Controller of the walveApp
 */
angular.module('walveApp')
  .controller('ViewTableCtrl', function($scope, $http) {
  	$scope.laravelURL = '../../public/';

  	$scope.viewTable = [];
  	$scope.viewTable.selectedType = [];
  	$scope.viewTable.selectedTypeDetail = [];
	
	//---------------------------------------Input to find Patient-----------------------------------//
   	
   	$scope.viewTable.submit = function(){
  		$http({
  			method: 'POST',
			url: $scope.laravelURL + 'viewTable',
			headers: {
			'Content-Type': 'application/json'
			},
			data: { 
				selectedType : $scope.viewTable.selectedType,
				selectedTypeDetail : $scope.viewTable.selectedTypeDetail
			}
		}).then(function successCallback(response) {
			$scope.responseData = response.data;
		  	// console.log(response.data);
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
  		};

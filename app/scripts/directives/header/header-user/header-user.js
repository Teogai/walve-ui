'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('walveApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-user/header-user.html',
        restrict: 'E',
        replace: true,
    	}
	});



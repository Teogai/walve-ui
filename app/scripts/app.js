'use strict';
/**
 * @ngdoc overview
 * @name walveApp
 * @description
 * # walveApp
 *
 * Main module of the application.
 */
angular
  .module('walveApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .run(['$rootScope','$http', function($rootScope, $http) {
    $rootScope.global = [];
    $rootScope.global.laravelURL = '';
    $rootScope.global.getUser = function(){
      $http({
        method: 'POST',
        url: $rootScope.global.laravelURL + 'user'
      }).then(function successCallback(response) {
          $rootScope.global.user = response.data;
          // console.log(response.data);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      };

    $rootScope.global.getUser();
  }])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'walveApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-user/header-user.js',
                    'scripts/directives/header/header-search/header-search.js',
                    'scripts/directives/sidebar/sidebar.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    // ============= Walve pages ============
      .state('dashboard.home',{
        templateUrl:'views/home.html',
        url:'/home'
    })
      .state('dashboard.appointment',{
        url:'/appointment',
        templateUrl:'views/appointment.html',
        controller: 'AppointmentCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'walveApp',
              files:[
                'scripts/controllers/appointmentController.js',
                'scripts/directives/calendar/calendar.js'
              ]
            })
          }
        }
    })
    //   .state('dashboard.postponeAppointment',{
    //     url:'/postponeAppointment',
    //     templateUrl:'views/postponeAppointment.html',
    //     controller: 'PostponeAppointmentCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/postponeAppointmentController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
    //   .state('dashboard.cancelAppointment',{
    //     url:'/cancelAppointment',
    //     templateUrl:'views/cancelAppointment.html',
    //     controller: 'CancelAppointmentCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/cancelAppointmentController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
      .state('dashboard.schedule',{
        url:'/schedule',
        templateUrl:'views/schedule.html',
        controller: 'ScheduleCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'walveApp',
              files:[
                'scripts/controllers/scheduleController.js',
                'scripts/directives/calendar/calendar.js'
              ]
            })
          }
        }
    })
    //   .state('dashboard.changeSchedule',{
    //     templateUrl:'views/changeSchedule.html',
    //     url:'/changeSchedule',
    //     templateUrl:'views/changeSchedule.html',
    //     controller: 'ChangeScheduleCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/changeScheduleController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
    //   .state('dashboard.removeSchedule',{
    //     templateUrl:'views/removeSchedule.html',
    //     url:'/removeSchedule',
    //     templateUrl:'views/removeSchedule.html',
    //     controller: 'RemoveScheduleCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/removeScheduleController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
    //   .state('dashboard.viewTable',{
    //     templateUrl:'views/viewTable.html',
    //     url:'/viewTable',
    //     templateUrl:'views/viewTable.html',
    //     controller: 'ViewTableCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/viewTableController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
      .state('dashboard.treatment',{
        templateUrl:'views/treatment.html',
        url:'/treatment',
        templateUrl:'views/treatment.html',
        controller: 'TreatmentCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'walveApp',
              files:[
                'scripts/controllers/treatmentController.js',
                'scripts/directives/calendar/calendar.js'
              ]
            })
          }
        }
    })
    //   .state('dashboard.symptom',{
    //     templateUrl:'views/symptom.html',
    //     url:'/symptom',
    //     templateUrl:'views/symptom.html',
    //     controller: 'SymptomCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/symptomController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
    //   .state('dashboard.dispense',{
    //     templateUrl:'views/dispense.html',
    //     url:'/dispense',
    //     templateUrl:'views/dispense.html',
    //     controller: 'DispenseCtrl',
    //     resolve: {
    //       loadMyFiles:function($ocLazyLoad) {
    //         return $ocLazyLoad.load({
    //           name:'walveApp',
    //           files:[
    //             'scripts/controllers/dispenseController.js'
    //           ]
    //         })
    //       }
    //     }
    // })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('loginError',{
        templateUrl:'views/pages/login-error.html',
        url:'/loginerror'
    })
    // =========== Framework pages ==========
      .state('dashboard.dash',{
        url:'/dash',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/dashboard.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'walveApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'walveApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    

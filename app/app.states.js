angular.module('starterApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        ////Error page show for unknown URL
        $urlRouterProvider.otherwise('/404');

        //ROUTES
        $stateProvider
        .state('basicLayout', {
            abstract: true,
            views: {
                layout: {
                    templateUrl: 'app/shared/views/layouts/basic-layout.view.html',
                }
            }
        })
        .state('home', {
            url: '/',
            templateUrl: 'app/pages/home/home.view.html',
            parent: 'basicLayout',
            controller: 'HomeController',
            data: {
                cssClassnames: 'home-page',
                pageTitle: "Home Page"
            }
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/shared/views/404.html',
            data: {
                cssClassnames: 'error'
            }
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

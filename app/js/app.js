'use strict';


// Declare app level module which depends on filters, and services
angular
    .module('zb', ['zb.filters', 'zb.services', 'zb.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl:'partials/home.html',
            controller:Home
        });
        $routeProvider.when('/work-samples', {
            templateUrl:'partials/work-samples.html',
            controller:WorkSamples
        });
        $routeProvider.when('/work-samples/web', {
            templateUrl:'partials/work-samples/web.html',
            controller:Web
        });
        $routeProvider.when('/work-samples/mobile', {
            templateUrl:'partials/work-samples/mobile.html',
            controller:Mobile
        });
        $routeProvider.when('/work-samples/node', {
            templateUrl:'partials/work-samples/node.html',
            controller:Node
        });
        $routeProvider.when('/work-samples/java', {
            templateUrl:'partials/work-samples/java.html',
            controller:Java
        });
        $routeProvider.when('/qualifications', {
            templateUrl:'partials/qualifications.html',
            controller:Qualifications
        });
        $routeProvider.when('/education', {
            templateUrl:'partials/education.html',
            controller:Education
        });
        $routeProvider.when('/work-experience', {
            templateUrl:'partials/work-experience.html',
            controller:WorkExperience
        });
        $routeProvider.when('/references', {
            templateUrl:'partials/references.html',
            controller:References
        });
        $routeProvider.when('/contact', {
            templateUrl:'partials/contact.html',
            controller:Contact
        });
        $routeProvider.when('/resume', {
            templateUrl:'partials/resume.html',
            controller:Resume
        });
        $routeProvider.otherwise({
            redirectTo:'/'
        });
    }])
;

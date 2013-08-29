'use strict';

var controllers = angular.module('ngApp.controllers', ['ngApp.services', 'ngApp.library']);

controllers.controller('HelloCtrl', ['$scope', function ($scope, $timeout, _) {
    $scope.name = 'World';
}]);
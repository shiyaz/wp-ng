'use strict';

var services = angular.module('ngApp.services', ['ngResource']);

services.factory('ItemTypes', ['$resource', function ($resource) {
    return $resource('http://localhost/itemtypes');
}]);


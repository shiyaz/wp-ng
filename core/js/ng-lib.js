'use strict';

var ngLib = angular.module('ngApp.library', []);

ngLib.factory('_', function () {
    return window._;
});

ngLib.factory('$', function () {
    return window.jQuery;
});


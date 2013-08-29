'use strict';

var directives = angular.module('ngApp.directives', []);


// Basic file upload directive use as:
// <file-upload action="form-action" label="Upload file" handle="uploadf" results="results">
// </file-upload>
// inside a form. Note: The form should not have an action specified.
directives.directive('fileUpload', ['$', function ($) {
    return {
        restrict: 'E',
        scope: {
            action: '@',
            label: '@',
            handle: '@',
            results: '='
        },
        controller: ['$scope', function ($scope) {
            $scope.sendFile = function (el) {
                var $form = $(el).parents('form');

                $form.attr('action', $scope.action);

                $form.ajaxSubmit({
                    error: function (event, statusText, responseText, form) {
                        $form.removeAttr('action');

                        console.info('File upload failed');
                    },
                    success: function (responseText, statusText, xhr, form) {
                        $form.removeAttr('action');

                        $scope.$apply(function () {
                            $scope.results = responseText;
                        });
                    }
                });
            }
        }],

        link: function (scope, elem, attrs, ctrl) {
            elem.find('.file-upload-button').click(function () {
                elem.find('#file-upload-input').click();
            });
        },

        replace: false,

        template: '<div class="file-upload-element">' +
            '<input id="file-upload-input" type="file" size="1" name="{{handle}}" style="display:none;" ' +
            '  onchange="angular.element(this).scope().sendFile(this);"/>' +
            '<button class="file-upload-button" title="Click to select file" >{{label}}</button>'+
            '</div>'
    };
}]);


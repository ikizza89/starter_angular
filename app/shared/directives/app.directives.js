(function () {
    'use strict';

    angular.module('starterApp')
        .directive('routeCssClassnames', function ($rootScope) {
            return {
                restrict: 'A',
                scope: {},
                link: function (scope, element) {

                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.cssClassnames) ? fromState.data.cssClassnames : null;
                        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.cssClassnames) ? toState.data.cssClassnames : null;

                        // don't do anything if they are the same
                        if (fromClassnames != toClassnames) {
                            if (fromClassnames) {
                                element.removeClass(fromClassnames);
                            }

                            if (toClassnames) {
                                element.addClass(toClassnames);
                            }
                        }


                    });
                }
            }
        })
        .directive('updateTitle', ['$rootScope', '$timeout',
            function ($rootScope, $timeout) {
                return {
                    link: function (scope, element) {
                        var listener = function (event, toState) {

                            var title = 'Engleski';

                            if (toState.data && toState.data.pageTitle) {
                                title = toState.data.pageTitle;
                            }

                            $timeout(function () {
                                element.text("Engleski - " + title);
                            }, 0, false);
                        };

                        $rootScope.$on('$stateChangeSuccess', listener);
                    }
                };
            }
        ])
        .directive('enEnterPress', function () {
            return function (scope, element, attrs) {

                element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode;
                    if (keyCode === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.tscEnterPress);
                        });
                        event.preventDefault();
                    }
                });
            };
        })
        .directive('goToUrl', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.attr('style', 'cursor:pointer');
                    element.on('click', function (e) {
                        if ($(e.target).closest('a').length === 0) {
                            window.open(attrs.goToUrl, '_blank');
                            scope.$apply();
                        }
                    });
                }
            }
        })
        .directive('pmdRadio', function () {
            return function (scope, element) {
                element.siblings('label').click(function() {
                    element.parent('div').addClass('checked');
                    element.parent('div').siblings('div').removeClass('checked');
                })
            }
        })
       .directive('pmdCheckbox', function () {
          return function (scope, element, attrs) {
              if(attrs.checked) {
                  element.parents('.checkbox').addClass('checked');
              }
              element.siblings('label').click(function() {
                  attrs.checked = !attrs.checked;
              });
          }
       })
}());

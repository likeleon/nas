// http://southdesign.de/blog/mock-angular-js-modules-for-test-di.html

"use strict";

angular.module("socketMockServices", []).
    factory("socket", function($rootScope) {
        var events = {};

        return {
            on: function(eventName, callback) {
                if (!events[eventName])
                    events[eventName] = [];
                events[eventName].push(callback);
            },
            emit: function(eventName, data, emitCallback) {
                if (events[eventName]) {
                    angular.forEach(events[eventName], function(callback) {
                        $rootScope.$apply(function() {
                            callback(data);
                        });
                    });
                }
                if (emitCallback)
                    emitCallback();
            }
        };
    });
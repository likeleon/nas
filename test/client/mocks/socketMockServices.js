// http://southdesign.de/blog/mock-angular-js-modules-for-test-di.html

"use strict";

angular.module("socketMockServices", []).
    factory("socket", function($rootScope) {
        var events = {};

        return {
            on: function(eventName, dataCallback, emitDataCallback) {
                if (!events[eventName])
                    events[eventName] = [];

                events[eventName].push({
                    'dataCallback': dataCallback,
                    'emitDataCallback': emitDataCallback
                });
            },
            emit: function(eventName, data, emitCallback) {
                if (!events[eventName])
                    return;

                angular.forEach(events[eventName], function(event) {
                    $rootScope.$apply(function() {
                        event.dataCallback(data);
                    });

                    if (emitCallback) {
                        event.emitDataCallback === 'undefined' ?
                            emitCallback() :
                            emitCallback(event.emitDataCallback(data))
                    }
                });
            }
        };
    });
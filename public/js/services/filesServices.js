"use strict";

var app = angular.module('filesServices', []);

app.factory('filesService', function($rootScope) {
    var socket = io.connect();
    return {
        onFiles : function(callback) {
            this._on('files', callback);
        },

        listFiles : function(path) {
            this._emit('list files', path);
        },

        _on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        _emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

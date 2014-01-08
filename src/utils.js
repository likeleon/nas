"use strict";

exports.isAbsolute = function(path) {
    if (path[0] == '/')
        return true;
    else
        return path[1] == ':' && path[2] == '\\';
};
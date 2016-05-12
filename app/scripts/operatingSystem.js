/*
    Copyright (c) 2016 eyeOS

    This file is part of Open365.

    Open365 is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

define(["./browserFactory"], function(BrowserFactory) {

    var windows = "Windows";
    var macosx = "MacOs";
    var unix = "Unix";
    var linux = "Linux";

    var osname = null;
    var eyeRunOs = null;

    function isOs(os) {
        return navigator.appVersion.indexOf(os) != -1;
    }

    if(isOs("Win")) {
        osname = windows;
        eyeRunOs = "windows";
    }
    else if(isOs("Mac")) {
        osname = macosx;
        eyeRunOs = "darwin";
    }else if (isOs('Linux') || isOs('X11')) {
        osname = 'Linux';
        eyeRunOs = 'linux';
    } else {
        osname = 'UNKNOWN';
        eyeRunOs = 'UNKNOWN';
    }

    var browser = BrowserFactory.getBrowser();
    var test = 'removeMe';
    var OperatingSystem = {
        WINDOWS : windows,
        MACOSX : macosx,
        UNIX : unix,
        Linux : linux,

        getName : function() {
            return osname;
        },

        getBrowser : function() {
            return browser;
        },

        getEyeRunDownloadLink: function (cb, extension) {
            var url = "/eyerun/latest-"+eyeRunOs;
            if(extension) {
                url=url+'-'+ extension;
            }
            $.get(url, function (response) {
                var data = JSON.parse(response);
                cb(data.installurl);
            });
        }
    };
    return OperatingSystem;
});

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var libs = process.cwd() + '/libs/';
var playlistService = require(libs + 'service/playlistService');
var url = require('url');
var cntOfItems = undefined,
    dataNewPlaylist = undefined;

var playlistController = (function () {
    function playlistController() {
        _classCallCheck(this, playlistController);
    }

    _createClass(playlistController, null, [{
        key: 'getPlaylists',

        // Get all playlists from playlists (or size playlists)
        value: function getPlaylists(req, res) {
            var countOfItems, tmp, size, playlistResponses;
            return regeneratorRuntime.async(function getPlaylists$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        countOfItems = url.parse(req.url, true).query.counts;
                        tmp = (typeof countOfItems).localeCompare("undefined");

                        if (tmp == 0) {
                            cntOfItems = 10000;
                        } else {
                            cntOfItems = parseInt(countOfItems);
                        }
                        size = parseInt(req.query.size, 10) || cntOfItems;
                        context$2$0.prev = 4;
                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(playlistService.getPlaylists(size));

                    case 7:
                        playlistResponses = context$2$0.sent;

                        res.send(playlistResponses);
                        context$2$0.next = 16;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](4);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: playlistController/getPlaylists' }));
                        console.log("Error: playlistController/getPlaylists");

                    case 16:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[4, 11]]);
        }

        // Get a specific playlist from playlists-table
    }, {
        key: 'getSpecificPlaylist',
        value: function getSpecificPlaylist(req, res) {
            var playlistId, playlistResponses;
            return regeneratorRuntime.async(function getSpecificPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        playlistId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(playlistService.getSpecificPlaylist(playlistId));

                    case 4:
                        playlistResponses = context$2$0.sent;

                        res.send(playlistResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error in playlistController/getSpecificPlaylist' }));
                        console.log("Error: playlistController/getSpecificPlaylist");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create new playlist in playlists-table
    }, {
        key: 'createNewPlaylist',
        value: function createNewPlaylist(req, res) {
            var usrId, playlistResponses;
            return regeneratorRuntime.async(function createNewPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        usrId = parseInt(req.body.User_id).toString().localeCompare("NaN");

                        if (!(usrId != 0)) {
                            context$2$0.next = 17;
                            break;
                        }

                        dataNewPlaylist = req.body;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(playlistService.createNewPlaylist(dataNewPlaylist));

                    case 6:
                        playlistResponses = context$2$0.sent;

                        res.send(playlistResponses);
                        context$2$0.next = 15;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log("Error: playlistController/createNewPlaylist");
                        res.sendStatus(400);
                        res.send(JSON.stringify({ message: 'Error: playlistController/createNewPlaylist' }));

                    case 15:
                        context$2$0.next = 18;
                        break;

                    case 17:
                        res.send("Введите корректные данные");

                    case 18:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 10]]);
        }

        // Update specific playlist in playlists-table
    }, {
        key: 'updatePlaylist',
        value: function updatePlaylist(req, res) {
            var playlistId, usrId, dataUpdatePlaylist, playlistResponses;
            return regeneratorRuntime.async(function updatePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        playlistId = req.params.id;
                        usrId = parseInt(req.body.User_id).toString().localeCompare("NaN");

                        if (!(usrId != 0)) {
                            context$2$0.next = 18;
                            break;
                        }

                        dataUpdatePlaylist = req.body;
                        context$2$0.prev = 4;
                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(playlistService.updatePlaylist(dataUpdatePlaylist, playlistId));

                    case 7:
                        playlistResponses = context$2$0.sent;

                        res.send(playlistResponses);
                        context$2$0.next = 16;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](4);

                        console.log("Error: playlistController/updatePlaylist");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: playlistController/updatePlaylist' }));

                    case 16:
                        context$2$0.next = 19;
                        break;

                    case 18:
                        res.send("Введите корректные данные");

                    case 19:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[4, 11]]);
        }

        // Delete a specific playlist in playlists-table
    }, {
        key: 'deletePlaylist',
        value: function deletePlaylist(req, res) {
            var playlistId, playlistResponses;
            return regeneratorRuntime.async(function deletePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        playlistId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(playlistService.deletePlaylist(playlistId));

                    case 4:
                        playlistResponses = context$2$0.sent;

                        res.send(playlistResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: playlistController/deletePlaylist");
                        res.sendStatus(406);
                        res.send(JSON.stringify({ message: 'Error: playlistController/deletePlaylist' }));

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }
    }]);

    return playlistController;
})();

module.exports = playlistController;
//# sourceMappingURL=contentController.js.map
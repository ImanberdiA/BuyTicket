'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var mysql = require('mysql');

var connection = undefined;

var playlistService = (function () {
    function playlistService() {
        _classCallCheck(this, playlistService);
    }

    _createClass(playlistService, null, [{
        key: 'init',
        value: function init() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'playlists'
            });
            return playlistService;
        }

        // Get all playlists from playlists (or size playlists)
    }, {
        key: 'getAllPlaylists',
        value: function getAllPlaylists(size) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM playlists LIMIT ?', size, function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Get a specific playlist from playlists-table
    }, {
        key: 'getSpecificPlaylist',
        value: function getSpecificPlaylist(playlistId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM playlists WHERE id=?', playlistId, function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Create new content in contents-table
    }, {
        key: 'createNewPlaylist',
        value: function createNewPlaylist(dataNewPlaylist) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    "Title": dataNewPlaylist.Title,
                    "User_id": dataNewPlaylist.User_id
                };
                connection.connect(function (err) {
                    var query = connection.query('INSERT INTO playlists SET ?', insertValues, function (err, result) {
                        if (!err) {
                            resolve(JSON.stringify({ message: 'New Playlist Created!' }));
                        } else {
                            resolve(JSON.stringify({ message: 'Error: New Playlist Was Not Created!' }));
                        }
                    });
                });
            });
        }

        // Update specific playlist in playlists-table
    }, {
        key: 'updatePlaylist',
        value: function updatePlaylist(dataUpdatePlaylist, playlistId) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    "Title": dataUpdatePlaylist.Title,
                    "User_id": dataUpdatePlaylist.User_id
                };
                connection.connect(function (err) {
                    var query = connection.query('UPDATE playlists set ? WHERE id = ?', [insertValues, playlistId], function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Delete a specific playlist in playlists-table
    }, {
        key: 'deletePlaylist',
        value: function deletePlaylist(playlistId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('DELETE FROM playlists WHERE id = ?', [playlistId], function (err, result) {
                        resolve(result);
                    });
                });
            });
        }
    }]);

    return playlistService;
})();

module.exports = playlistService.init();
//# sourceMappingURL=playlistService.js.map
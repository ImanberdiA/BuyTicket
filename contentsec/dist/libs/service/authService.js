'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var reqPromGetAllContent = require('request-promise');
var reqPromGetSpecificContent = require('request-promise');
var reqPromCreateNewContent = require('request-promise');
var reqPromUpdateContent = require('request-promise');
var reqPromDeleteContent = require('request-promise');

var reqPromGetAllUser = require('request-promise');
var reqPromGetSpecificUser = require('request-promise');
var reqPromCreateNewUser = require('request-promise');
var reqPromUpdateUser = require('request-promise');
var reqPromDeleteUser = require('request-promise');

var reqPromGetAllPlaylist = require('request-promise');
var reqPromGetSpecificPlaylist = require('request-promise');
var reqPromCreateNewPlaylist = require('request-promise');
var reqPromUpdatePlaylist = require('request-promise');
var reqPromDeletePlaylist = require('request-promise');

var reqPromAgregatePlaylist = require('request-promise');
var reqPromAgregateContent = require('request-promise');

var ThreePointFourthUsers = require('request-promise');
var ThreePointFourthContents = require('request-promise');

var rpDeleteUser = require('request-promise');
var rpDeleteContent = require('request-promise');

var UpdatedInFewServices = require('request-promise');
var rp = require('request-promise');

var reqPromRegisternewAuth = require('request-promise');

var connection = undefined;
var mysql = require('mysql');

var authService = (function () {
    function authService() {
        _classCallCheck(this, authService);
    }

    _createClass(authService, null, [{
        key: 'init',
        value: function init() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'user_side'
            });
            return authService;
        }

        /* Get All Contents from content service. Begin*/
    }, {
        key: 'getAllContents',
        value: function getAllContents(req, res, countOfItems) {
            var contentResponses;
            return regeneratorRuntime.async(function getAllContents$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getAllContentRequestMethod(countOfItems));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: articlesService/getAllContents' }));
                        console.log("Error: articlesService/getAllContents");

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getAllContentRequestMethod',
        value: function getAllContentRequestMethod(countOfItems) {
            return new Promise(function (resolve, reject) {
                reqPromGetAllContent({
                    method: 'GET',
                    uri: 'http://localhost:1001/contents/?counts=' + countOfItems,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/getAllContentRequestMethod");
                });
            });
        }

        /* Get All Contents from content service. End*/

        /* Get Specific Content from content service. Begin*/
    }, {
        key: 'getSpecificContent',
        value: function getSpecificContent(req, res, contentId) {
            var contentResponse;
            return regeneratorRuntime.async(function getSpecificContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getSpecificContentRequestMethod(contentId));

                    case 3:
                        contentResponse = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponse);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: authService/getSpecificContent' }));
                        console.log("Error: authService/getSpecificContent");

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getSpecificContentRequestMethod',
        value: function getSpecificContentRequestMethod(contentId) {
            return new Promise(function (resolve, reject) {
                reqPromGetSpecificContent({
                    method: 'GET',
                    uri: 'http://localhost:1001/contents/' + contentId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/getSpecificContentRequestMethod");
                });
            });
        }

        /* Get Specific Content from content service. End*/

        /* Create New Content in content service. Begin*/
    }, {
        key: 'createNewContent',
        value: function createNewContent(req, res, dataNewContent) {
            var contentResponses;
            return regeneratorRuntime.async(function createNewContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.createNewContentRequestMethod(dataNewContent));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getSpecificContent");
                        res.send(JSON.stringify({ message: 'Error: authService/getSpecificContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewContentRequestMethod',
        value: function createNewContentRequestMethod(dataNewContent) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewContent({
                    method: 'POST',
                    uri: 'http://localhost:1001/contents',
                    body: dataNewContent,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/createNewContentRequestMethod");
                });
            });
        }

        /* Create New Content in content service. End*/

        /* Update Specific Content in content service. Begin*/
    }, {
        key: 'updateContent',
        value: function updateContent(req, res, dataUpdateContent, contentId) {
            var contentResponses;
            return regeneratorRuntime.async(function updateContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.updateContentRequestMethod(dataUpdateContent, contentId));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getSpecificContent");
                        res.send(JSON.stringify({ message: 'Error: authService/getSpecificContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updateContentRequestMethod',
        value: function updateContentRequestMethod(dataUpdateContent, contentId) {
            return new Promise(function (resolve, reject) {
                reqPromUpdateContent({
                    method: 'PUT',
                    uri: 'http://localhost:1001/contents/' + contentId,
                    body: dataUpdateContent,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/updateContentRequestMethod");
                });
            });
        }

        /* Update Specific Content in content service. End*/

        /* Delete Specific Content in content service. Begin*/
    }, {
        key: 'deleteContent',
        value: function deleteContent(req, res, contentId) {
            var contentResponses;
            return regeneratorRuntime.async(function deleteContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.deleteContentRequestMethod(contentId));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/deleteContent");
                        res.send(JSON.stringify({ message: 'Error: authService/deleteContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deleteContentRequestMethod',
        value: function deleteContentRequestMethod(contentId) {
            return new Promise(function (resolve, reject) {
                reqPromDeleteContent({
                    method: 'DELETE',
                    uri: 'http://localhost:1001/contents/' + contentId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/deleteContentRequestMethod");
                });
            });
        }

        /* Delete Specific Content in content service. End*/

        /* CONTENTS SERVICE. END */

        /* USERS SERVICE. BEGIN */

        /* Get All Users from user service. Begin*/
    }, {
        key: 'getAllUsers',
        value: function getAllUsers(req, res, countOfItems) {
            var userResponses;
            return regeneratorRuntime.async(function getAllUsers$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getAllUserRequestMethod(countOfItems));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getAllUsers");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/getAllUsers' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getAllUserRequestMethod',
        value: function getAllUserRequestMethod(countOfItems) {
            return new Promise(function (resolve, reject) {
                reqPromGetAllUser({
                    method: 'GET',
                    uri: 'http://localhost:1000/users/?counts=' + countOfItems,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/getAllUserRequestMethod");
                });
            });
        }

        /* Get All Users from user service. End*/

        /* Get Specific User from user service. Begin*/
    }, {
        key: 'getSpecificUser',
        value: function getSpecificUser(req, res, userId) {
            var userResponses;
            return regeneratorRuntime.async(function getSpecificUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getSpecificUserRequestMethod(userId));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getSpecificUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/getSpecificUser' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getSpecificUserRequestMethod',
        value: function getSpecificUserRequestMethod(userId) {
            return new Promise(function (resolve, reject) {
                reqPromGetSpecificUser({
                    method: 'GET',
                    uri: 'http://localhost:1000/users/' + userId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/getSpecificUserRequestMethod");
                });
            });
        }

        /* Get Specific User from user service. End*/

        /* Create New User in user service. Begin*/
    }, {
        key: 'createNewUser',
        value: function createNewUser(req, res, dataNewUser) {
            var userResponses;
            return regeneratorRuntime.async(function createNewUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.createNewUserRequestMethod(dataNewUser));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/createNewUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: "Error: authService/createNewUser" }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewUserRequestMethod',
        value: function createNewUserRequestMethod(dataNewUser) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewUser({
                    method: 'POST',
                    uri: 'http://localhost:1000/users',
                    body: dataNewUser,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/createNewUserRequestMethod");
                });
            });
        }

        /* Create New User in user service. End*/

        /* Update Specific User in user service. Begin*/
    }, {
        key: 'updateUser',
        value: function updateUser(req, res, dataUpdateUser, userId) {
            var userResponses;
            return regeneratorRuntime.async(function updateUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.updateUserRequestMethod(dataUpdateUser, userId));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/updateUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/updateUser' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updateUserRequestMethod',
        value: function updateUserRequestMethod(dataUpdateUser, userId) {
            return new Promise(function (resolve, reject) {
                reqPromUpdateUser({
                    method: 'PUT',
                    uri: 'http://localhost:1000/users/' + userId,
                    body: dataUpdateUser,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/updateUserRequestMethod");
                });
            });
        }

        /* Update Specific User in user service. End*/

        /* Delete Specific User in user service. Begin*/
    }, {
        key: 'deleteUser',
        value: function deleteUser(req, res, userId) {
            var userResponses;
            return regeneratorRuntime.async(function deleteUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.deleteUserRequestMethod(userId));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/deleteUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/deleteUser' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deleteUserRequestMethod',
        value: function deleteUserRequestMethod(userId) {
            return new Promise(function (resolve, reject) {
                reqPromDeleteUser({
                    method: 'DELETE',
                    uri: 'http://localhost:1000/users/' + userId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/deleteUserRequestMethod");
                });
            });
        }

        /* Delete Specific User in user service. End*/

        /* USERS SERVICE. END */

        /* PLAYLISTS SERVICE. BEGIN */

        /* Get All Playlists from playlist service. Begin*/
    }, {
        key: 'getAllPlaylist',
        value: function getAllPlaylist(req, res, countOfItems) {
            var playlistResponses;
            return regeneratorRuntime.async(function getAllPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getAllPlaylistRequestMethod(countOfItems));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getAllPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/getAllPlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getAllPlaylistRequestMethod',
        value: function getAllPlaylistRequestMethod(countOfItems) {
            return new Promise(function (resolve, reject) {
                reqPromGetAllPlaylist({
                    method: 'GET',
                    uri: 'http://localhost:1002/playlists/?counts=' + countOfItems,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/getAllPlaylistRequestMethod");
                });
            });
        }

        /* Get All Playlists from playlist service. End*/

        /* Get Specific Playlist from playlist service. Begin*/
    }, {
        key: 'getSpecificPlaylist',
        value: function getSpecificPlaylist(req, res, playlistId) {
            var playlistResponses;
            return regeneratorRuntime.async(function getSpecificPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.getSpecificPlaylistRequestMethod(playlistId));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getSpecificPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/getSpecificPlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'getSpecificPlaylistRequestMethod',
        value: function getSpecificPlaylistRequestMethod(playlistId) {
            return new Promise(function (resolve, reject) {
                reqPromGetSpecificPlaylist({
                    method: 'GET',
                    uri: 'http://localhost:1002/playlists/' + playlistId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/getSpecificPlaylistRequestMethod");
                });
            });
        }

        /* Get Specific Playlist from playlist service. End*/

        /* Create New Playlist in playlist service. Begin*/
    }, {
        key: 'createNewPlaylist',
        value: function createNewPlaylist(req, res, dataNewPlaylist) {
            var playlistResponses;
            return regeneratorRuntime.async(function createNewPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.createNewPlaylistRequestMethod(dataNewPlaylist));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/getSpecificPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/getSpecificPlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewPlaylistRequestMethod',
        value: function createNewPlaylistRequestMethod(dataNewPlaylist) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewPlaylist({
                    method: 'POST',
                    uri: 'http://localhost:1002/playlists',
                    body: dataNewPlaylist,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/createNewPlaylistRequestMethod");
                });
            });
        }

        /* Create New Playlist in playlist service. End*/

        /* Update Specific Playlist in playlist service. Begin*/
    }, {
        key: 'updatePlaylist',
        value: function updatePlaylist(req, res, dataUpdatePlaylist, playlistId) {
            var playlistResponses;
            return regeneratorRuntime.async(function updatePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/updatePlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/updatePlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updatePlaylistRequestMethod',
        value: function updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId) {
            return new Promise(function (resolve, reject) {
                reqPromUpdatePlaylist({
                    method: 'PUT',
                    uri: 'http://localhost:1002/playlists/' + playlistId,
                    body: dataUpdatePlaylist,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/updatePlaylistRequestMethod");
                });
            });
        }

        /* Update Specific Playlist in playlist service. End*/

        /* Delete Specific Playlist in playlist service. Begin*/
    }, {
        key: 'deletePlaylist',
        value: function deletePlaylist(req, res, playlistId) {
            var playlistResponses;
            return regeneratorRuntime.async(function deletePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(authService.deletePlaylistRequestMethod(playlistId));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: authService/deletePlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: authService/deletePlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deletePlaylistRequestMethod',
        value: function deletePlaylistRequestMethod(playlistId) {
            return new Promise(function (resolve, reject) {
                reqPromDeletePlaylist({
                    method: 'DELETE',
                    uri: 'http://localhost:1002/playlists/' + playlistId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: authService/deletePlaylistRequestMethod");
                });
            });
        }

        /* Delete Specific User in user service. End*/

        /* PLAYLISTS SERVICE. END */

    }]);

    return authService;
})();

module.exports = authService.init();
//# sourceMappingURL=authService.js.map
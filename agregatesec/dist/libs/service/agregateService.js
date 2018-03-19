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

var reqPromAuth = require('request-promise');

var mysql = require('mysql');
var connection = undefined;

var agregateService = (function () {
    function agregateService() {
        _classCallCheck(this, agregateService);
    }

    _createClass(agregateService, null, [{
        key: 'init',
        value: function init() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'user_side'
            });
            return agregateService;
        }

        /* CONTENTS SERVICE. BEGIN */

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
                        return regeneratorRuntime.awrap(agregateService.getAllContentRequestMethod(countOfItems));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: agregateService/getAllContents' }));
                        console.log("Error: agregateService/getAllContents");

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
                    uri: 'http://localhost:1001/con/contents',
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
                        return regeneratorRuntime.awrap(agregateService.getSpecificContentRequestMethod(contentId));

                    case 3:
                        contentResponse = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponse);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: agregateService/getSpecificContent' }));
                        console.log("Error: agregateService/getSpecificContent");

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
                    uri: 'http://localhost:1001/con/contents/' + contentId,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/getSpecificContentRequestMethod");
                });
            });
        }

        /* Get Specific Content from content service. End*/

        /* Create New Content in content service. Begin*/
    }, {
        key: 'createNewContent',
        value: function createNewContent(req, res, dataNewContent, token) {
            var contentResponses;
            return regeneratorRuntime.async(function createNewContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.createNewContentRequestMethod(dataNewContent, token));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getSpecificContent");
                        res.send(JSON.stringify({ message: 'Error: agregateService/getSpecificContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewContentRequestMethod',
        value: function createNewContentRequestMethod(dataNewContent, token) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewContent({
                    method: 'POST',
                    uri: 'http://localhost:1001/con/contents',
                    body: dataNewContent,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/createNewContentRequestMethod");
                });
            });
        }

        /* Create New Content in content service. End*/

        /* Update Specific Content in content service. Begin*/
    }, {
        key: 'updateContent',
        value: function updateContent(req, res, dataUpdateContent, contentId, token) {
            var contentResponses;
            return regeneratorRuntime.async(function updateContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.updateContentRequestMethod(dataUpdateContent, contentId, token));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getSpecificContent");
                        res.send(JSON.stringify({ message: 'Error: agregateService/getSpecificContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updateContentRequestMethod',
        value: function updateContentRequestMethod(dataUpdateContent, contentId, token) {
            return new Promise(function (resolve, reject) {
                reqPromUpdateContent({
                    method: 'PUT',
                    uri: 'http://localhost:1001/con/contents/' + contentId,
                    body: dataUpdateContent,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/updateContentRequestMethod");
                });
            });
        }

        /* Update Specific Content in content service. End*/

        /* Delete Specific Content in content service. Begin*/
    }, {
        key: 'deleteContent',
        value: function deleteContent(req, res, contentId, token) {
            var contentResponses;
            return regeneratorRuntime.async(function deleteContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.deleteContentRequestMethod(contentId, token));

                    case 3:
                        contentResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', contentResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/deleteContent");
                        res.send(JSON.stringify({ message: 'Error: agregateService/deleteContent' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deleteContentRequestMethod',
        value: function deleteContentRequestMethod(contentId, token) {
            return new Promise(function (resolve, reject) {
                reqPromDeleteContent({
                    method: 'DELETE',
                    uri: 'http://localhost:1001/con/contents/' + contentId,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/deleteContentRequestMethod");
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
                        return regeneratorRuntime.awrap(agregateService.getAllUserRequestMethod(countOfItems));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getAllUsers");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/getAllUsers' }));

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
                    uri: 'http://localhost:1000/users',
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/getAllUserRequestMethod");
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
                        return regeneratorRuntime.awrap(agregateService.getSpecificUserRequestMethod(userId));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getSpecificUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/getSpecificUser' }));

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
        value: function createNewUser(req, res, dataNewUser, token) {
            var userResponses;
            return regeneratorRuntime.async(function createNewUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.createNewUserRequestMethod(dataNewUser, token));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/createNewUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: "Error: agregateService/createNewUser" }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewUserRequestMethod',
        value: function createNewUserRequestMethod(dataNewUser, token) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewUser({
                    method: 'POST',
                    uri: 'http://localhost:1000/users',
                    body: dataNewUser,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/createNewUserRequestMethod");
                });
            });
        }

        /* Create New User in user service. End*/

        /* Update Specific User in user service. Begin*/
    }, {
        key: 'updateUser',
        value: function updateUser(req, res, dataUpdateUser, userId, token) {
            var userResponses;
            return regeneratorRuntime.async(function updateUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.updateUserRequestMethod(dataUpdateUser, userId, token));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/updateUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/updateUser' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updateUserRequestMethod',
        value: function updateUserRequestMethod(dataUpdateUser, userId, token) {
            return new Promise(function (resolve, reject) {
                reqPromUpdateUser({
                    method: 'PUT',
                    uri: 'http://localhost:1000/users/' + userId,
                    body: dataUpdateUser,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/updateUserRequestMethod");
                });
            });
        }

        /* Update Specific User in user service. End*/

        /* Delete Specific User in user service. Begin*/
    }, {
        key: 'deleteUser',
        value: function deleteUser(req, res, userId, token) {
            var userResponses;
            return regeneratorRuntime.async(function deleteUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.deleteUserRequestMethod(userId, token));

                    case 3:
                        userResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', userResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/deleteUser");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/deleteUser' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deleteUserRequestMethod',
        value: function deleteUserRequestMethod(userId, token) {
            return new Promise(function (resolve, reject) {
                reqPromDeleteUser({
                    method: 'DELETE',
                    uri: 'http://localhost:1000/users/' + userId,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/deleteUserRequestMethod");
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
                        return regeneratorRuntime.awrap(agregateService.getAllPlaylistRequestMethod(countOfItems));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getAllPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/getAllPlaylist' }));

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
                    resolve("Error: agregateService/getAllPlaylistRequestMethod");
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
                        return regeneratorRuntime.awrap(agregateService.getSpecificPlaylistRequestMethod(playlistId));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getSpecificPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/getSpecificPlaylist' }));

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
                    resolve("Error: agregateService/getSpecificPlaylistRequestMethod");
                });
            });
        }

        /* Get Specific Playlist from playlist service. End*/

        /* Create New Playlist in playlist service. Begin*/
    }, {
        key: 'createNewPlaylist',
        value: function createNewPlaylist(req, res, dataNewPlaylist, token) {
            var playlistResponses;
            return regeneratorRuntime.async(function createNewPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.createNewPlaylistRequestMethod(dataNewPlaylist, token));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/getSpecificPlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/getSpecificPlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'createNewPlaylistRequestMethod',
        value: function createNewPlaylistRequestMethod(dataNewPlaylist, token) {
            return new Promise(function (resolve, reject) {
                reqPromCreateNewPlaylist({
                    method: 'POST',
                    uri: 'http://localhost:1002/playlists',
                    body: dataNewPlaylist,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/createNewPlaylistRequestMethod");
                });
            });
        }

        /* Create New Playlist in playlist service. End*/

        /* Update Specific Playlist in playlist service. Begin*/
    }, {
        key: 'updatePlaylist',
        value: function updatePlaylist(req, res, dataUpdatePlaylist, playlistId, token) {
            var playlistResponses;
            return regeneratorRuntime.async(function updatePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId, token));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/updatePlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/updatePlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'updatePlaylistRequestMethod',
        value: function updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId, token) {
            return new Promise(function (resolve, reject) {
                reqPromUpdatePlaylist({
                    method: 'PUT',
                    uri: 'http://localhost:1002/playlists/' + playlistId,
                    body: dataUpdatePlaylist,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/updatePlaylistRequestMethod");
                });
            });
        }

        /* Update Specific Playlist in playlist service. End*/

        /* Delete Specific Playlist in playlist service. Begin*/
    }, {
        key: 'deletePlaylist',
        value: function deletePlaylist(req, res, playlistId, token) {
            var playlistResponses;
            return regeneratorRuntime.async(function deletePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.deletePlaylistRequestMethod(playlistId, token));

                    case 3:
                        playlistResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', playlistResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/deletePlaylist");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/deletePlaylist' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'deletePlaylistRequestMethod',
        value: function deletePlaylistRequestMethod(playlistId, token) {
            return new Promise(function (resolve, reject) {
                reqPromDeletePlaylist({
                    method: 'DELETE',
                    uri: 'http://localhost:1002/playlists/' + playlistId,
                    json: true,
                    headers: {
                        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                        Authorization: token
                    }
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/deletePlaylistRequestMethod");
                });
            });
        }

        /* Delete Specific User in user service. End*/

        /* PLAYLISTS SERVICE. END */

        /* AUTHORIZATION SERVICE. BEGIN */

        // REDIRECT Method
    }, {
        key: 'authMethod',
        value: function authMethod(req, res, authData) {
            var authDataResponses;
            return regeneratorRuntime.async(function authMethod$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.authMethodHandler(authData));

                    case 3:
                        authDataResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', authDataResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/authMethod");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/authMethod' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'authMethodHandler',
        value: function authMethodHandler(authData) {
            return new Promise(function (resolve, reject) {
                reqPromAuth({
                    method: 'POST',
                    uri: 'http://localhost:1337/auth',
                    body: authData,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/authMethodHandler");
                });
            });
        }

        // LOGIN Method
    }, {
        key: 'loginGetCode',
        value: function loginGetCode(req, res, dataLoginGetCode) {
            var loginGetDataResponses;
            return regeneratorRuntime.async(function loginGetCode$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(agregateService.loginGetMethodHandler(dataLoginGetCode));

                    case 3:
                        loginGetDataResponses = context$2$0.sent;
                        return context$2$0.abrupt('return', loginGetDataResponses);

                    case 7:
                        context$2$0.prev = 7;
                        context$2$0.t0 = context$2$0['catch'](0);

                        res.status(523);
                        console.log("Error: agregateService/loginGetCode");
                        return context$2$0.abrupt('return', JSON.stringify({ message: 'Error: agregateService/loginGetCode' }));

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[0, 7]]);
        }
    }, {
        key: 'loginGetMethodHandler',
        value: function loginGetMethodHandler(dataLoginGetCode) {
            return new Promise(function (resolve, reject) {
                reqPromAuth({
                    method: 'POST',
                    uri: 'http://localhost:1337/login',
                    body: dataLoginGetCode,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/loginGetMethodHandler");
                });
            });
        }

        /* AUTHORIZATION SERVICE. BEGIN */

    }]);

    return agregateService;
})();

module.exports = agregateService.init();
//# sourceMappingURL=agregateService.js.map
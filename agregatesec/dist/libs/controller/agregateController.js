"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var libs = process.cwd() + '/libs/';
var agregateService = require(libs + 'service/agregateService');
var url = require('url');
var playlistResponses = undefined,
    contentResponses = undefined,
    userResponses = undefined;

var agregateController = (function () {
    function agregateController() {
        _classCallCheck(this, agregateController);
    }

    _createClass(agregateController, null, [{
        key: 'index',
        value: function index(req, res) {
            return regeneratorRuntime.async(function index$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        res.render('index', {});

                    case 1:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }

        /* CONTENTS SERVICE. BEGIN */

        // Get All Contents from content service
    }, {
        key: 'getAllContents',
        value: function getAllContents(req, res) {
            var countOfItems, tmp;
            return regeneratorRuntime.async(function getAllContents$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        countOfItems = url.parse(req.url, true).query.counts;
                        tmp = (typeof countOfItems).localeCompare("undefined");
                        context$2$0.prev = 2;

                        if (!(tmp == 0)) {
                            context$2$0.next = 9;
                            break;
                        }

                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.getAllContents(req, res, 1000));

                    case 6:
                        contentResponses = context$2$0.sent;
                        context$2$0.next = 12;
                        break;

                    case 9:
                        context$2$0.next = 11;
                        return regeneratorRuntime.awrap(agregateService.getAllContents(req, res, countOfItems));

                    case 11:
                        contentResponses = context$2$0.sent;

                    case 12:
                        // console.log(contentResponses);
                        res.render('contents', {
                            contentObject: contentResponses
                        });

                        // res.send(contentResponses);
                        context$2$0.next = 17;
                        break;

                    case 15:
                        context$2$0.prev = 15;
                        context$2$0.t0 = context$2$0['catch'](2);

                    case 17:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 15]]);
        }

        // Get Specific Content from content service
    }, {
        key: 'getSpecificContent',

        //console.log("Error: agregateController/getAllContents");
        value: function getSpecificContent(req, res) {
            var contentId, _contentResponses;

            return regeneratorRuntime.async(function getSpecificContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contentId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(agregateService.getSpecificContent(req, res, contentId));

                    case 4:
                        _contentResponses = context$2$0.sent;

                        res.render('contents', {
                            contentObject: _contentResponses
                        });
                        // res.send(contentResponses);
                        context$2$0.next = 11;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: agregateController/getSpecificContent");

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create New Content in content service
    }, {
        key: 'createNewContent',
        value: function createNewContent(req, res) {
            var token, dataNewContent, _contentResponses2;

            return regeneratorRuntime.async(function createNewContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        dataNewContent = req.body;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.createNewContent(req, res, dataNewContent, token));

                    case 5:
                        _contentResponses2 = context$2$0.sent;

                        console.log(_contentResponses2);

                        res.render('contents', {
                            mess: _contentResponses2.message
                        });

                        // res.send(contentResponses);
                        context$2$0.next = 13;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/createNewContent");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 10]]);
        }

        // Update a specific content in content service
    }, {
        key: 'updateContent',
        value: function updateContent(req, res) {
            var token, contentId, dataUpdateContent, _contentResponses3;

            return regeneratorRuntime.async(function updateContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        contentId = req.params.id;
                        dataUpdateContent = req.body;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.updateContent(req, res, dataUpdateContent, contentId, token));

                    case 6:
                        _contentResponses3 = context$2$0.sent;

                        res.send(_contentResponses3);
                        context$2$0.next = 13;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log("Error: agregateController/updateContent");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 10]]);
        }

        // Delete a specific content in content service
    }, {
        key: 'deleteContent',
        value: function deleteContent(req, res) {
            var token, contentId, _contentResponses4;

            return regeneratorRuntime.async(function deleteContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        contentId = req.params.id;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.deleteContent(req, res, contentId, token));

                    case 5:
                        _contentResponses4 = context$2$0.sent;

                        res.send(_contentResponses4);
                        context$2$0.next = 14;
                        break;

                    case 9:
                        context$2$0.prev = 9;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController / deleteContent");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: agregateController / deleteContent' }));

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 9]]);
        }

        /* CONTENTS SERVICE. END */

        /* USERS SERVICE. BEGIN */

        // Get All Users from user service
    }, {
        key: 'getAllUsers',
        value: function getAllUsers(req, res) {
            var countOfItems, tmp;
            return regeneratorRuntime.async(function getAllUsers$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        countOfItems = url.parse(req.url, true).query.counts;
                        tmp = (typeof countOfItems).localeCompare("undefined");
                        context$2$0.prev = 2;

                        if (!(tmp == 0)) {
                            context$2$0.next = 9;
                            break;
                        }

                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.getAllUsers(req, res, 1000));

                    case 6:
                        userResponses = context$2$0.sent;
                        context$2$0.next = 12;
                        break;

                    case 9:
                        context$2$0.next = 11;
                        return regeneratorRuntime.awrap(agregateService.getAllUsers(req, res, countOfItems));

                    case 11:
                        userResponses = context$2$0.sent;

                    case 12:
                        //console.log(userResponses);
                        res.render('users', {
                            userObject: userResponses
                        });

                        // res.send(userResponses);
                        context$2$0.next = 18;
                        break;

                    case 15:
                        context$2$0.prev = 15;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/getAllUsers");

                    case 18:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 15]]);
        }

        // Get Specific User from user service
    }, {
        key: 'getSpecificUser',
        value: function getSpecificUser(req, res) {
            var userId, _userResponses;

            return regeneratorRuntime.async(function getSpecificUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        userId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(agregateService.getSpecificUser(req, res, userId));

                    case 4:
                        _userResponses = context$2$0.sent;

                        res.render('users', {
                            userObject: _userResponses
                        });
                        // res.send(userResponses);
                        context$2$0.next = 11;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: agregateController/getSpecificUser");

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create New User in user service
    }, {
        key: 'createNewUser',
        value: function createNewUser(req, res) {
            var token, dataNewUser, _userResponses2;

            return regeneratorRuntime.async(function createNewUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        dataNewUser = req.body;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.createNewUser(req, res, dataNewUser, token));

                    case 5:
                        _userResponses2 = context$2$0.sent;

                        // res.send(userResponses);
                        // console.log(userResponses);

                        res.render('users', {
                            mess: _userResponses2.message
                        });
                        context$2$0.next = 12;
                        break;

                    case 9:
                        context$2$0.prev = 9;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/createNewUser");

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 9]]);
        }

        // Update a specific user in user service
    }, {
        key: 'updateUser',
        value: function updateUser(req, res) {
            var token, userId, dataUpdateUser, _userResponses3;

            return regeneratorRuntime.async(function updateUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        userId = req.params.id;
                        dataUpdateUser = req.body;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.updateUser(req, res, dataUpdateUser, userId, token));

                    case 6:
                        _userResponses3 = context$2$0.sent;

                        // res.send(userResponses);

                        console.log("userId for update - " + userId);
                        console.log(dataUpdateUser);

                        context$2$0.next = 14;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log("Error: agregateController/updateUser");

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 11]]);
        }

        // Delete a specific user in user service
    }, {
        key: 'deleteUser',
        value: function deleteUser(req, res) {
            var token, userId, _userResponses4;

            return regeneratorRuntime.async(function deleteUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        userId = req.params.id;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.deleteUser(req, res, userId, token));

                    case 5:
                        _userResponses4 = context$2$0.sent;

                        res.send(_userResponses4);
                        // console.log("userId for deleete - " + userId);
                        // console.log(userResponses);
                        context$2$0.next = 14;
                        break;

                    case 9:
                        context$2$0.prev = 9;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/deleteUser");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: agregateController/deleteUser' }));

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 9]]);
        }

        /* USERS SERVICE. END */

        /* PLAYLISTS SERVICE. BEGIN */

        // Get All Playlists from playlist service
    }, {
        key: 'getAllPlaylists',
        value: function getAllPlaylists(req, res) {
            var countOfItems, tmp;
            return regeneratorRuntime.async(function getAllPlaylists$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        countOfItems = url.parse(req.url, true).query.counts;
                        tmp = (typeof countOfItems).localeCompare("undefined");
                        context$2$0.prev = 2;

                        if (!(tmp == 0)) {
                            context$2$0.next = 9;
                            break;
                        }

                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.getAllPlaylist(req, res, 1000));

                    case 6:
                        playlistResponses = context$2$0.sent;
                        context$2$0.next = 12;
                        break;

                    case 9:
                        context$2$0.next = 11;
                        return regeneratorRuntime.awrap(agregateService.getAllPlaylist(req, res, countOfItems));

                    case 11:
                        playlistResponses = context$2$0.sent;

                    case 12:
                        // console.log(playlistResponses);
                        res.render('playlists', {
                            playlistObject: playlistResponses
                        });

                        // res.send(playlistResponses);
                        context$2$0.next = 18;
                        break;

                    case 15:
                        context$2$0.prev = 15;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/getAllPlaylist");

                    case 18:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 15]]);
        }

        // Get Specific Playlist from playlist service
    }, {
        key: 'getSpecificPlaylist',
        value: function getSpecificPlaylist(req, res) {
            var playlistId, _playlistResponses;

            return regeneratorRuntime.async(function getSpecificPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        playlistId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(agregateService.getSpecificPlaylist(req, res, playlistId));

                    case 4:
                        _playlistResponses = context$2$0.sent;

                        res.render('playlists', {
                            playlistObject: _playlistResponses
                        });
                        // res.send(playlistResponses);
                        context$2$0.next = 11;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: agregateController/getSpecificPlaylist");

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create New Playlist in playlist service
    }, {
        key: 'createNewPlaylist',
        value: function createNewPlaylist(req, res) {
            var token, dataNewPlaylist, _playlistResponses2;

            return regeneratorRuntime.async(function createNewPlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        dataNewPlaylist = req.body;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.createNewPlaylist(req, res, dataNewPlaylist, token));

                    case 5:
                        _playlistResponses2 = context$2$0.sent;

                        // res.send(playlistResponses);
                        console.log(_playlistResponses2);

                        res.render('playlists', {
                            mess: _playlistResponses2.message
                        });
                        context$2$0.next = 13;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/createNewPlaylist");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 10]]);
        }

        // Update a specific playlist in playlist service
    }, {
        key: 'updatePlaylist',
        value: function updatePlaylist(req, res) {
            var token, playlistId, dataUpdatePlaylist, _playlistResponses3;

            return regeneratorRuntime.async(function updatePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        playlistId = req.params.id;
                        dataUpdatePlaylist = req.body;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(agregateService.updatePlaylist(req, res, dataUpdatePlaylist, playlistId, token));

                    case 6:
                        _playlistResponses3 = context$2$0.sent;

                        res.send(_playlistResponses3);
                        context$2$0.next = 13;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log("Error: agregateController/updatePlaylist");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 10]]);
        }

        // Delete a specific playlist in playlist service
    }, {
        key: 'deletePlaylist',
        value: function deletePlaylist(req, res) {
            var token, playlistId, _playlistResponses4;

            return regeneratorRuntime.async(function deletePlaylist$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        token = res.req.headers.authorization;
                        playlistId = req.params.id;
                        context$2$0.prev = 2;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(agregateService.deletePlaylist(req, res, playlistId, token));

                    case 5:
                        _playlistResponses4 = context$2$0.sent;

                        res.send(_playlistResponses4);
                        context$2$0.next = 14;
                        break;

                    case 9:
                        context$2$0.prev = 9;
                        context$2$0.t0 = context$2$0['catch'](2);

                        console.log("Error: agregateController/deletePlaylist");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: agregateController/deletePlaylist' }));

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[2, 9]]);
        }

        /* PLAYLISTS SERVICE. END */

    }, {
        key: 'authMethod',
        value: function authMethod(req, res) {
            var authData, authDataResponses, bool;
            return regeneratorRuntime.async(function authMethod$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        authData = req.query;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(agregateService.authMethod(req, res, authData));

                    case 4:
                        authDataResponses = context$2$0.sent;
                        bool = authDataResponses[0].success;

                        if (bool) {
                            res.send('<!DOCTYPE html>\n' + '<html lang="en">\n' + '<head>\n' + '    <title>Вход в систему</title>\n' + '    <meta charset="utf-8">\n' + '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' + '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\n' + '    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n' + '    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\n' + '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' + '    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">\n' + '</head>\n' + '<body>\n' + '<nav class="navbar navbar-inverse">\n' + '    <div class="container-fluid">\n' + '        <div class="navbar-header">\n' + '            <a class="navbar-brand" href="http://localhost:1003">Music Player</a>\n' + '        </div>\n' + '        <ul class="nav navbar-nav">\n' + '            <li class="active"><a href="#">Войти</a></li>\n' + '            <li><a href="#">Регистрация</a></li>\n' + '        </ul>\n' + '    </div>\n' + '</nav>' + '<div class="container">\n' + '    <form method="POST" action="/login" id=\'formaDel\' class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">\n' + '        <!--<form method="POST" action="/users/new">-->\n' + '        <div class="w3-panel w3-green w3-round-xlarge">\n' + '            <h5>Войти в систему</h5>\n' + '        </div>\n' + '        <div class="form-row">\n' + '            <div>\n' + '                <label for="Login">Логин</label>\n' + '                <input type="text" class="form-control" id="Login" placeholder="Email..." name="Login">\n' + '            </div>\n' + '            <div>\n' + '                <label for="Password">Пароль</label>\n' + '                <input type="text" class="form-control" id="Password" placeholder="Пароль..." name="Password">\n' + '            </div>\n' + '        </div>\n' + '        <input type="submit" class="w3-button w3-block w3-section w3-green w3-ripple w3-padding" value="ВОЙТИ"/>\n' + '    </form>\n' + '</div>\n' + '\n' + '</body>\n' + '</html>');
                        } else {
                            res.send(status(404));
                        }
                        // res.send(authDataResponses);
                        context$2$0.next = 14;
                        break;

                    case 9:
                        context$2$0.prev = 9;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: agregateController/authMethod");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: agregateController/authMethod' }));

                    case 14:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 9]]);
        }
    }, {
        key: 'loginGetCode',
        value: function loginGetCode(req, res) {
            var dataLoginGetCode, loginGetCodeResponses;
            return regeneratorRuntime.async(function loginGetCode$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        dataLoginGetCode = req.body;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(agregateService.loginGetCode(req, res, dataLoginGetCode));

                    case 4:
                        loginGetCodeResponses = context$2$0.sent;

                        // res.send(loginGetCodeResponses);
                        console.log(loginGetCodeResponses);
                        context$2$0.next = 11;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: agregateController/loginGetCode");

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }
    }]);

    return agregateController;
})();

module.exports = agregateController;

// const token = res.req.headers.authorization;

// const userId = req.body.id;

// console.log(req.query);
//# sourceMappingURL=agregateController.js.map
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var libs = process.cwd() + '/libs/';
var userService = require(libs + 'service/userService');
var url = require('url');
var cntOfItems = undefined,
    dataNewUser = undefined;

var userController = (function () {
    function userController() {
        _classCallCheck(this, userController);
    }

    _createClass(userController, null, [{
        key: 'getAllUsers',

        // Get all users from users (or size users)
        value: function getAllUsers(req, res) {
            var countOfItems, tmp, size, userResponses;
            return regeneratorRuntime.async(function getAllUsers$(context$2$0) {
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
                        return regeneratorRuntime.awrap(userService.getUsers(size));

                    case 7:
                        userResponses = context$2$0.sent;

                        res.send(userResponses);
                        context$2$0.next = 16;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](4);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: userController/getUsers' }));
                        console.log("Error: userController/getUsers");

                    case 16:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[4, 11]]);
        }

        // Get a specific user from users-table
    }, {
        key: 'getSpecificUser',
        value: function getSpecificUser(req, res) {
            var userId, userResponses;
            return regeneratorRuntime.async(function getSpecificUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        userId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(userService.getSpecificUser(userId));

                    case 4:
                        userResponses = context$2$0.sent;

                        res.send(userResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: userController/getSpecificUser' }));
                        console.log("Error: userController/getSpecificUser");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create new user in users-table
    }, {
        key: 'createNewUser',
        value: function createNewUser(req, res) {
            var tmptypeUserId, userResponses;
            return regeneratorRuntime.async(function createNewUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        tmptypeUserId = parseInt(req.body.Password).toString().localeCompare("NaN");

                        if (!(tmptypeUserId === 0)) {
                            context$2$0.next = 16;
                            break;
                        }

                        dataNewUser = req.body;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(userService.createNewUser(dataNewUser));

                    case 6:
                        userResponses = context$2$0.sent;

                        res.send(userResponses);
                        context$2$0.next = 14;
                        break;

                    case 10:
                        context$2$0.prev = 10;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log("Error: userController/createNewUser");
                        res.sendStatus(400);

                    case 14:
                        context$2$0.next = 17;
                        break;

                    case 16:
                        res.send("Введите корректные данные");

                    case 17:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 10]]);
        }

        // Update specific user in users-table
    }, {
        key: 'updateUser',
        value: function updateUser(req, res) {
            var userId, fname, lname, dataUpdateUser, userResponses;
            return regeneratorRuntime.async(function updateUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        userId = req.params.id;
                        fname = parseInt(req.body.Genre).toString().localeCompare("NaN");
                        lname = parseInt(req.body.Country).toString().localeCompare("NaN");

                        if (!(fname === 0 && lname === 0)) {
                            context$2$0.next = 17;
                            break;
                        }

                        dataUpdateUser = req.body;
                        context$2$0.prev = 5;
                        context$2$0.next = 8;
                        return regeneratorRuntime.awrap(userService.updateUser(dataUpdateUser, userId));

                    case 8:
                        userResponses = context$2$0.sent;

                        res.send(userResponses);
                        context$2$0.next = 15;
                        break;

                    case 12:
                        context$2$0.prev = 12;
                        context$2$0.t0 = context$2$0['catch'](5);

                        console.log("Error: userController/updateUser");

                    case 15:
                        context$2$0.next = 18;
                        break;

                    case 17:
                        res.send("Введите корректные данные");

                    case 18:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[5, 12]]);
        }

        // Delete a specific user in users-table
    }, {
        key: 'deleteUser',
        value: function deleteUser(req, res) {
            var userId, userResponses;
            return regeneratorRuntime.async(function deleteUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        userId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(userService.deleteUser(userId));

                    case 4:
                        userResponses = context$2$0.sent;

                        res.send(userResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: userController/deleteUser");
                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error in deleteUser' }));

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }
    }]);

    return userController;
})();

module.exports = userController;
//# sourceMappingURL=userController.js.map
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var mysql = require('mysql');
var connection = undefined;

var userService = (function () {
    function userService() {
        _classCallCheck(this, userService);
    }

    _createClass(userService, null, [{
        key: 'init',
        value: function init() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'user_side'
            });
            return userService;
        }

        // Get all users from users (or size users)
    }, {
        key: 'getUsers',
        value: function getUsers(size) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM users LIMIT ?', size, function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Get a specific user from users-table
    }, {
        key: 'getSpecificUser',
        value: function getSpecificUser(userId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM users WHERE id=?', userId, function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Create new user in users-table
    }, {
        key: 'createNewUser',
        value: function createNewUser(dataNewUser) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    "Login": dataNewUser.Login,
                    "Password": dataNewUser.Password,
                    "FirstName": dataNewUser.FirstName,
                    "LastName": dataNewUser.LastName
                };
                connection.connect(function (err) {
                    var query = connection.query('INSERT INTO users SET ?', insertValues, function (err, result) {
                        if (!err) {
                            resolve(JSON.stringify({ message: 'New User Created!' }));
                        } else {
                            resolve(JSON.stringify({ message: 'Error: New User Was Not Created!' }));
                        }
                    });
                });
            });
        }

        // Update specific user in users-table
    }, {
        key: 'updateUser',
        value: function updateUser(dataUpdateUser, userId) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    Login: dataUpdateUser.Login,
                    Password: dataUpdateUser.Password,
                    FirstName: dataUpdateUser.FirstName,
                    LastName: dataUpdateUser.LastName
                };
                connection.connect(function (err) {
                    var query = connection.query('UPDATE users set ? WHERE id = ?', [insertValues, userId], function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Delete a specific user in users-table
    }, {
        key: 'deleteUser',
        value: function deleteUser(userId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('DELETE FROM users WHERE id = ?', [userId], function (err, result) {
                        resolve(result);
                    });
                });
            });
        }
    }]);

    return userService;
})();

module.exports = userService.init();
//# sourceMappingURL=userService.js.map
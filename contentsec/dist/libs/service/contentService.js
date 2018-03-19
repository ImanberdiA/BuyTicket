'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var connection = undefined;
var mysql = require('mysql');

var contentService = (function () {
    function contentService() {
        _classCallCheck(this, contentService);
    }

    _createClass(contentService, null, [{
        key: 'init',
        value: function init() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'contents'
            });
            return contentService;
        }

        // Get all contents from contents (or size contents)
    }, {
        key: 'getContents',
        value: function getContents(size) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM contents LIMIT ?', size, function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Get a specific content from contents-table
    }, {
        key: 'getSpecificContent',
        value: function getSpecificContent(contentId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('SELECT * FROM contents WHERE id=?', contentId, function (err, result) {
                        console.log(JSON.stringify(result));
                        resolve(result);
                    });
                });
            });
        }

        // Create new content in contents-table
    }, {
        key: 'createNewContent',
        value: function createNewContent(dataNewContent) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    "Title": dataNewContent.Title,
                    "Genre": dataNewContent.Genre,
                    "Country": dataNewContent.Country
                };
                connection.connect(function (err) {
                    var query = connection.query('INSERT INTO contents SET ?', insertValues, function (err, result) {
                        if (!err) {
                            resolve(JSON.stringify({ message: 'New Content Created!' }));
                        } else {
                            resolve(JSON.stringify({ message: 'Error: New Content Was Not Created!' }));
                        }
                    });
                });
            });
        }

        // Update specific content in contents-table
    }, {
        key: 'updateContent',
        value: function updateContent(dataUpdateContent, contentId) {
            return new Promise(function (resolve, reject) {
                var insertValues = {
                    Title: dataUpdateContent.Title,
                    Genre: dataUpdateContent.Genre,
                    Country: dataUpdateContent.Country
                };
                connection.connect(function (err) {
                    var query = connection.query('UPDATE contents set ? WHERE id = ?', [insertValues, contentId], function (err, result) {
                        console.log(result);
                        resolve(result);
                    });
                });
            });
        }

        // Delete a specific content in contents-table
    }, {
        key: 'deleteContent',
        value: function deleteContent(contentId) {
            return new Promise(function (resolve, reject) {
                connection.connect(function (err) {
                    var query = connection.query('DELETE FROM contents WHERE id = ?', [contentId], function (err, result) {
                        resolve(result);
                    });
                });
            });
        }
    }]);

    return contentService;
})();

module.exports = contentService.init();
//# sourceMappingURL=contentService.js.map
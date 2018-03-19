'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var reqPromGetAllContent = require('request-promise');
var connection = undefined;
var mysql = require('mysql');

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
                    uri: 'http://localhost:1001/contents/?counts=' + countOfItems,
                    json: true
                }).then(function (response) {
                    resolve(response);
                })['catch'](function (err) {
                    resolve("Error: agregateService/getAllContentRequestMethod");
                });
            });
        }
    }]);

    return agregateService;
})();
//# sourceMappingURL=articlesService.js.map
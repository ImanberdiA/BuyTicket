"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var libs = process.cwd() + '/libs/';
var Article = require(libs + 'model/article');
var articlesService = require(libs + 'service/articlesService');
var url = require('url');
var contentResponses = undefined;

var articlesController = (function () {
    function articlesController() {
        _classCallCheck(this, articlesController);
    }

    _createClass(articlesController, null, [{
        key: 'articleMethod',
        value: function articleMethod(req, res) {
            var countOfItems, tmp;
            return regeneratorRuntime.async(function articleMethod$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        console.log('I am here');
                        countOfItems = url.parse(req.url, true).query.counts;
                        tmp = (typeof countOfItems).localeCompare("undefined");
                        context$2$0.prev = 3;

                        if (!(tmp == 0)) {
                            context$2$0.next = 10;
                            break;
                        }

                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(articlesService.getAllContents(req, res, 1000));

                    case 7:
                        contentResponses = context$2$0.sent;
                        context$2$0.next = 13;
                        break;

                    case 10:
                        context$2$0.next = 12;
                        return regeneratorRuntime.awrap(articlesService.getAllContents(req, res, countOfItems));

                    case 12:
                        contentResponses = context$2$0.sent;

                    case 13:

                        console.log(contentResponses);

                        res.send(contentResponses);

                        // res.send(contentResponses);
                        context$2$0.next = 19;
                        break;

                    case 17:
                        context$2$0.prev = 17;
                        context$2$0.t0 = context$2$0['catch'](3);

                    case 19:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 17]]);
        }
    }]);

    return articlesController;
})();

//console.log("Error: agregateController/getAllContents");

module.exports = articlesController;
//# sourceMappingURL=articlesController.js.map
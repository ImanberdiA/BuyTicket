"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var libs = process.cwd() + '/libs/';
var contentService = require(libs + 'service/contentService');
var url = require('url');
var cntOfItems = undefined,
    dataNewContent = undefined;

var contentController = (function () {
    function contentController() {
        _classCallCheck(this, contentController);
    }

    _createClass(contentController, null, [{
        key: 'getAllContents',

        // Get all contents from contents (or size contents)
        value: function getAllContents(req, res) {
            var countOfItems, tmp, size, contentResponses;
            return regeneratorRuntime.async(function getAllContents$(context$2$0) {
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
                        return regeneratorRuntime.awrap(contentService.getContents(size));

                    case 7:
                        contentResponses = context$2$0.sent;

                        res.send(contentResponses);
                        context$2$0.next = 16;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](4);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: contentController/getAllContents' }));
                        console.log("Error: contentController/getContents");

                    case 16:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[4, 11]]);
        }

        // Get a specific content from contents-table
    }, {
        key: 'getSpecificContent',
        value: function getSpecificContent(req, res) {
            var contentId, contentResponses;
            return regeneratorRuntime.async(function getSpecificContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contentId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(contentService.getSpecificContent(contentId));

                    case 4:
                        contentResponses = context$2$0.sent;

                        res.send(contentResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        res.status(523);
                        res.send(JSON.stringify({ message: 'Error: contentController/getSpecificContent' }));
                        console.log("Error: contentController/getSpecificContent");

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }

        // Create new content in contents-table
    }, {
        key: 'createNewContent',
        value: function createNewContent(req, res) {
            var gnr, cntry, contentResponses;
            return regeneratorRuntime.async(function createNewContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        gnr = parseInt(req.body.Genre).toString().localeCompare("NaN");
                        cntry = parseInt(req.body.Country).toString().localeCompare("NaN");

                        if (!(gnr === 0 && cntry === 0)) {
                            context$2$0.next = 18;
                            break;
                        }

                        dataNewContent = req.body;
                        context$2$0.prev = 4;
                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(contentService.createNewContent(dataNewContent));

                    case 7:
                        contentResponses = context$2$0.sent;

                        res.send(contentResponses);
                        context$2$0.next = 16;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](4);

                        console.log("Error: contentController/createNewContent");
                        res.sendStatus(400);
                        res.send(JSON.stringify({ message: 'Error: contentController/createNewContent' }));

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

        // Update specific content in contents-table
    }, {
        key: 'updateContent',
        value: function updateContent(req, res) {
            var contentId, gnr, cntry, dataUpdateContent, contentResponses;
            return regeneratorRuntime.async(function updateContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contentId = req.params.id;
                        gnr = parseInt(req.body.Genre).toString().localeCompare("NaN");
                        cntry = parseInt(req.body.Country).toString().localeCompare("NaN");

                        if (!(gnr === 0 && cntry === 0)) {
                            context$2$0.next = 17;
                            break;
                        }

                        dataUpdateContent = req.body;
                        context$2$0.prev = 5;
                        context$2$0.next = 8;
                        return regeneratorRuntime.awrap(contentService.updateContent(dataUpdateContent, contentId));

                    case 8:
                        contentResponses = context$2$0.sent;

                        res.send(contentResponses);
                        context$2$0.next = 15;
                        break;

                    case 12:
                        context$2$0.prev = 12;
                        context$2$0.t0 = context$2$0['catch'](5);

                        console.log("Error: contentController/updateContent");

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

        // Delete a specific content in contents-table
    }, {
        key: 'deleteContent',
        value: function deleteContent(req, res) {
            var contentId, contentResponses;
            return regeneratorRuntime.async(function deleteContent$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contentId = req.params.id;
                        context$2$0.prev = 1;
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(contentService.deleteContent(contentId));

                    case 4:
                        contentResponses = context$2$0.sent;

                        res.send(contentResponses);
                        context$2$0.next = 13;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        console.log("Error: contentController/deleteContent");
                        res.sendStatus(403);
                        res.send(JSON.stringify({ message: 'Error: contentController/deleteContent' }));

                    case 13:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }
    }]);

    return contentController;
})();

module.exports = contentController;
//# sourceMappingURL=contentController.js.map
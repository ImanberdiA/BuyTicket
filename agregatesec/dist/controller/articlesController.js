"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var articlesController = (function () {
    function articlesController() {
        _classCallCheck(this, articlesController);
    }

    _createClass(articlesController, null, [{
        key: 'articleMethod',
        value: function articleMethod(req, res) {
            return regeneratorRuntime.async(function articleMethod$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        Article.find(function (err, articles) {
                            if (!err) {
                                return res.json(articles);
                            } else {
                                res.statusCode = 500;

                                log.error('Internal error(%d): %s', res.statusCode, err.message);

                                return res.json({
                                    error: 'Server error'
                                });
                            }
                        });

                    case 1:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }]);

    return articlesController;
})();

module.exports = articlesController;
//# sourceMappingURL=articlesController.js.map
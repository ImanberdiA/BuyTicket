'use strict';

var agregateController = require('./libs/controller/agregateController');

function router(app) {
    app.get('/login', agregateController.login);
}
//# sourceMappingURL=router.js.map
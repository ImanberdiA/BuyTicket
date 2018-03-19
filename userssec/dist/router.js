'use strict';

var userController = require('./libs/controller/userController');

function router(app) {
    app.get('/login', userController.login);
}
//# sourceMappingURL=router.js.map
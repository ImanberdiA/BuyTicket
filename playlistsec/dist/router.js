'use strict';

var playlistController = require('./libs/controller/playlistController');

function router(app) {
    app.get('/login', playlistController.login);
}
//# sourceMappingURL=router.js.map
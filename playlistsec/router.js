const playlistController = require('./libs/controller/playlistController');

function router(app) {
    app.get('/login', playlistController.login);
}
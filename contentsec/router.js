const contentController = require('./libs/controller/contentController');

function router(app) {
    app.get('/login', contentController.login);
}
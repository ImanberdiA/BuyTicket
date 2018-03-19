const agregateController = require('./libs/controller/agregateController');

function router(app) {
    app.get('/login', agregateController.login);
}
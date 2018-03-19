const userController = require('./libs/controller/userController');

function router(app) {
    app.get('/login', userController.login);
}
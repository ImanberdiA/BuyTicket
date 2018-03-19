const userController = require('./controller/userController');

function router(app) {

    // Get all users
	app.get('/users', userController.getUsers);

    // Get a specific user
    app.get('/users/:id', userController.getSpecificUser);

    // Create new user
	app.post('/users', userController.createNewUser);

    // Update specific user
	app.put('/users/:id',userController.updateUser);

    // Delete a specific user
	app.delete('/users/:id', userController.deleteUser);

    // 3 лаба 4 пункт. USERS
    app.post('/users/:pid/playlists', userController.createConPL);

    /* Delete certain user in users-table ThirdLabFourthOperation*/
    app.delete('/users', userController.deleteUserThirdLabFourthPoint);

}

module.exports = router;
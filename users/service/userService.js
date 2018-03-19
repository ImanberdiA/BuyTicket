const mysql = require('mysql');
var rp = require('request-promise');
let connection = undefined;
let idFromContent = undefined;
let idF = undefined;

class userService {
    static init() {
		connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'user_side'
        });
        return userService;
    }

    // Get all users from users (or size users)
    static getUsers(size) {
        return new Promise((resolve, reject) => {
			connection.connect(function (err) {
				const query = connection.query('SELECT * FROM users LIMIT ?', size, function (err, result) {
					console.log(result);
					resolve(result);
				});
			});
        });
    }

    // Get a specific user from users-table
    static getSpecificUser(userId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM users WHERE id=?', userId, function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Create new user in users-table
    static createNewUser(dataNewUser) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                "Login": dataNewUser.Login,
                "Password": dataNewUser.Password,
                "FirstName": dataNewUser.FirstName,
                "LastName": dataNewUser.LastName
            };
            connection.connect(function (err) {
                const query = connection.query('INSERT INTO users SET ?', insertValues, function (err, result) {
                    if(!err){
                        resolve(JSON.stringify({message: 'New User Created!'}));
                    } else{
                        resolve(JSON.stringify({message: 'Error: New User Was Not Created!'}));
                    }
                });
            });
        });
    }

    // Update specific user in users-table
    static updateUser(dataUpdateUser, userId) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                Login: dataUpdateUser.Login,
                Password: dataUpdateUser.Password,
                FirstName: dataUpdateUser.FirstName,
                LastName: dataUpdateUser.LastName
            };
            connection.connect(function (err) {
                const query = connection.query('UPDATE users set ? WHERE id = ?', [insertValues, userId], function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Delete a specific user in users-table
    static deleteUser(userId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('DELETE FROM users WHERE id = ?', [userId], function (err, result) {
                    resolve(result);
                });
            });
        });
    }

    // 3 лаба 4 пункт. Начало
    static createConPL(data, pid) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                "Login": data.Login,
                "Password": data.Password,
                "FirstName": data.FirstName,
                "LastName": data.LastName
            };
            connection.connect(function (err) {
                const query = connection.query('INSERT INTO users SET ?', insertValues, function (err, result) {
                    idFromContent = userService.GetIdOfNewUser(result.insertId);

                    var p = Promise.resolve(idFromContent);
                    p.then(function(v) {
                        userService.crea(pid, v[0].id);
                    });
                    resolve(idF);
                });
            });
        });
    }
    static crea(uid, pid){
        rp({
            method: 'POST',
            uri: 'http://localhost:1003/users/' + uid + '/playlists/' + pid,
            json: true
        }).then(function (response) {
            response.forEach(function (v) {

            });
        })
            .catch(function (err) {
            });
    }
    static GetIdOfNewUser(id) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT id FROM users WHERE id=?', id, function (err, result) {
                    //console.log(result);
                    resolve(result);
                });
            });
        });
    }
    // 3 лаба 4 пункт. Конец

    static deleteUserThirdLabFourthPoint(data) {
        console.log(data.idUser);
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                //    if (err) throw err; //Вот это убрать ПОСЛЕ
                const query = connection.query('DELETE FROM users WHERE id = ?', data.idUser, function (err, result) {
                    //console.log(result);
                    resolve(result);
                });
            });
        });
    }

}

module.exports = userService.init();

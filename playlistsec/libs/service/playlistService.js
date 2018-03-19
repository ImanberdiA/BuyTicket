const mysql = require('mysql');

let connection = undefined;

class playlistService {
    static init() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'playlists'
        });
        return playlistService;
    }

    // Get all playlists from playlists (or size playlists)
    static getAllPlaylists(size) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM playlists LIMIT ?', size, function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Get a specific playlist from playlists-table
    static getSpecificPlaylist(playlistId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM playlists WHERE id=?', playlistId, function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Create new content in contents-table
    static createNewPlaylist(dataNewPlaylist) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                "Title" : dataNewPlaylist.Title,
                "User_id" : dataNewPlaylist.User_id
            };
            connection.connect(function (err) {
                const query = connection.query('INSERT INTO playlists SET ?', insertValues, function (err, result) {
                    if(!err){
                        resolve(JSON.stringify({message: 'New Playlist Created!'}));
                    }else{
                        resolve(JSON.stringify({message: 'Error: New Playlist Was Not Created!'}));
                    }
                });
            });
        });
    }

    // Update specific playlist in playlists-table
    static updatePlaylist(dataUpdatePlaylist, playlistId) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                "Title" : dataUpdatePlaylist.Title,
                "User_id" : dataUpdatePlaylist.User_id
            };
            connection.connect(function (err) {
                const query = connection.query('UPDATE playlists set ? WHERE id = ?', [insertValues, playlistId], function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Delete a specific playlist in playlists-table
    static deletePlaylist(playlistId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('DELETE FROM playlists WHERE id = ?', [playlistId], function (err, result) {
                    resolve(result);
                });
            });
        });
    }
}

module.exports = playlistService.init();
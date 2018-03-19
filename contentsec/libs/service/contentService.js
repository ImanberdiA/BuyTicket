let connection = undefined;
const mysql = require('mysql');

class contentService {
    static init() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'contents'
        });
        return contentService;
    }

    // Get all contents from contents (or size contents)
    static getContents(size) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM contents LIMIT ?', size, function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Get a specific content from contents-table
    static getSpecificContent(contentId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM contents WHERE id=?', contentId, function (err, result) {
                    console.log(JSON.stringify(result));
                    resolve(result);
                });
            });
        });
    }

    // Create new content in contents-table
    static createNewContent(dataNewContent) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                "Title" : dataNewContent.Title,
                "Genre" : dataNewContent.Genre,
                "Country" : dataNewContent.Country
            };
            connection.connect(function (err) {
                const query = connection.query('INSERT INTO contents SET ?', insertValues, function (err, result) {
                    if(!err){
                        resolve(JSON.stringify({message: 'New Content Created!'}));
                    }else{
                        resolve(JSON.stringify({message: 'Error: New Content Was Not Created!'}));
                    }
                });
            });
        });
    }

    // Update specific content in contents-table
    static updateContent(dataUpdateContent, contentId) {
        return new Promise((resolve, reject) => {
            const insertValues = {
                Title : dataUpdateContent.Title,
                Genre : dataUpdateContent.Genre,
                Country : dataUpdateContent.Country
            };
            connection.connect(function (err) {
                const query = connection.query('UPDATE contents set ? WHERE id = ?', [insertValues, contentId], function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }

    // Delete a specific content in contents-table
    static deleteContent(contentId) {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('DELETE FROM contents WHERE id = ?', [contentId], function (err, result) {
                    resolve(result);
                });
            });
        });
    }
}

module.exports = contentService.init();
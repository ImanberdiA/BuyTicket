'use strict';

let mysql = require('mysql');
let connection = undefined;

class SearchService {
    constructor(){}

    init() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'user_side'
        });
    }

    getAllFlights(){
        this.init();
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM users', function (err, result) {
                    console.log(result);
                    resolve(result);
                });
            });
        });
    }
}

exports.SearchService = SearchService;
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
            database: 'flights_schedule'
        });
    }

    getAllFlights(fromPlace, toPlace){
        this.init();
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM flights WHERE fromPlace = ? AND toPlace = ?', [fromPlace, toPlace], function (err, result) {
                    // console.log(JSON.stringify(result));
                    resolve(result);
                });
            });
        });
    }
}

exports.SearchService = SearchService;
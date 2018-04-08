'use strict';

let mysql = require('mysql');
let connection = undefined;

class SearchService {
    constructor(){}

    // init() {
    //     connection = mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         password: '',
    //         database: 'flights_schedule'
    //     });
    // }

    getListFlights(fromPlace, toPlace, date){
        this.init();
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                const query = connection.query('SELECT * FROM flights WHERE fromPlace = ? AND toPlace = ? AND date = ?', [fromPlace, toPlace, date], function (err, result) {
                    // console.log(JSON.stringify(result));
                    resolve(result);
                });
            });
        });
    }
}

exports.SearchService = SearchService;
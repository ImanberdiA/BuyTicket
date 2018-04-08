var searchService = require("./searchService"), searchServiceObject = new searchService.SearchService(), url = require('url');

class AuthController {

    // Функции-паразиты записать в один большой функ.-конструктор, и те функции вызывать в searchQuery как объекты
    async index(req, res) {
        res.render('index', {});
    }

    async login(req, res) {
        res.render('login', {});
    }


    async authorization(req, res){
        
    }


}

exports.AuthController = AuthController;
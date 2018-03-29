var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {

        async getListFlights(req, res) {
            var result;
            console.log(/^\d{4}-\d{1,2}-\d\d$/.test(req.headers.date));



            try{

                if(/^\d{4}-\d{1,2}-\d\d$/.test(req.headers.date)){
                    result = await searchServiceObject.getListFlights(req.headers.fromplace, req.headers.toplace, req.headers.date);
                }else{
                    result = "Введите правильную дату!";
                }

                //console.log(result);
                res.send(result);
                //res.render('index', { name: result });
            }catch(error) {
                console.log("Error");
            }
    }

}

exports.SearchController = SearchController;
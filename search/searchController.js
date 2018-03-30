var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {



        async getListFlights(req, res) {
            var result;

            if(/^\d{4}-\d{1,2}-\d\d$/.test(req.headers.date)){
                console.log(new Date(req.headers.date));
                // console.log(req.headers.date.split("-"));
                result = await searchServiceObject.getListFlights(req.headers.fromplace, req.headers.toplace, req.headers.date);
            }else{
                result = "Введите правильную дату!";
            }

            try{
                res.send(result);
            }catch(error) {
                console.log("Error");
            }
    }

}

exports.SearchController = SearchController;
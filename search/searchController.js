var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {

        async getListFlights(req, res) {
            var result, j = 0;

            if(/^\d{4}-\d{1,2}-\d\d$/.test(req.headers.date)){
                var comingFromClientDate = new Date(req.headers.date);

                for(var i = 0; i < 7; i++)
                {
                    var tmp = comingFromClientDate.setTime(comingFromClientDate.getTime() + (j * 24 * 60 * 60 * 1000));
                    var tmpObj = new Date(tmp);
                    console.log(tmpObj.getDate().toString().concat("-", (tmpObj.getMonth()+1).toString(), "-", tmpObj.getFullYear()));
                    j = 1;
                }
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
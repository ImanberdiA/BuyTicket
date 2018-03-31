var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {

        async index(req, res) {
            res.render('index', {

            });
        }

        async getListFlights(req, res) {
            var result;
            var checkDateVar = new Date(req.headers.datefromClient);

            if(checkDateVar != "Invalid Date"){
                var requestedByClientDate = new Date((new Date(req.headers.date)).getTime());
                var requestedDatePlusSeven = new Date(requestedByClientDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                var requestedDateMinusSeven = new Date(requestedByClientDate.getTime() - (7 * 24 * 60 * 60 * 1000));

                var requestedByClientDateToString = requestedByClientDate.getFullYear().toString().concat("-", (requestedByClientDate.getMonth()+1).toString(), "-", requestedByClientDate.getDate());
                var requestedDatePlusSevenToString = requestedDatePlusSeven.getFullYear().toString().concat("-", (requestedDatePlusSeven.getMonth()+1).toString(), "-", requestedDatePlusSeven.getDate());
                var requestedDateMinusSevenToString = requestedDateMinusSeven.getFullYear().toString().concat("-", (requestedDateMinusSeven.getMonth()+1).toString(), "-", requestedDateMinusSeven.getDate());

                console.log("RequestedByClientDateToString: ", requestedByClientDateToString);
                console.log("RequestedDatePlusSevenToString: ", requestedDatePlusSevenToString);
                console.log("RequestedDateMinusSevenToString: ", requestedDateMinusSevenToString);

                result = await searchServiceObject.getListFlights(req.headers.fromplace, req.headers.toplace, requestedByClientDateToString);
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
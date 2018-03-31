var searchService = require("./searchService"), searchServiceObject = new searchService.SearchService(), url = require('url');

class SearchController {
        async index(req, res) {
            res.render('index', {});
        }

        async login(req, res) {
            res.render('login', {});
        }

        async getListFlights(req, res) {
            var result;

            var fromplace = url.parse(req.url, true).query.fromplace, toplace = url.parse(req.url, true).query.toplace,
                datefromclient = url.parse(req.url, true).query.datefromclient, baggage = url.parse(req.url, true).query.baggage;

            var checkDateVar = new Date(datefromclient);

            if(checkDateVar != "Invalid Date") {
                var requestedByClientDate = new Date((new Date(datefromclient)).getTime()), requestedDatePlusSeven = new Date(requestedByClientDate.getTime() + (7 * 24 * 60 * 60 * 1000)),
                    requestedDateMinusSeven = new Date(requestedByClientDate.getTime() - (7 * 24 * 60 * 60 * 1000));

                var requestedByClientDateToString = requestedByClientDate.getFullYear().toString().concat("-", (requestedByClientDate.getMonth()+1).toString(), "-", requestedByClientDate.getDate()), requestedDatePlusSevenToString = requestedDatePlusSeven.getFullYear().toString().concat("-", (requestedDatePlusSeven.getMonth()+1).toString(), "-", requestedDatePlusSeven.getDate()),
                    requestedDateMinusSevenToString = requestedDateMinusSeven.getFullYear().toString().concat("-", (requestedDateMinusSeven.getMonth()+1).toString(), "-", requestedDateMinusSeven.getDate());

                result = await searchServiceObject.getListFlights(fromplace, toplace, requestedByClientDateToString);
            } else {
                result = "Введите правильную дату!";
            }

            try{
                res.send(result);
            }catch(error) {
                console.log("Error");
            }
        }

        async getListNearFlights(req, res)
        {

        }
}

exports.SearchController = SearchController;
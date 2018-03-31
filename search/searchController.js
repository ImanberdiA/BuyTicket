var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {

        async getListFlights(req, res) {
            var result, j = 0;

            if(/^\d{4}-\d{1,2}-\d\d$/.test(req.headers.date)){
                var comingFromClientDate = new Date(req.headers.date);


                // var tmp = comingFromClientDate.getTime();
                var requestedByClientDate = new Date((new Date(req.headers.date)).getTime());
                console.log("Requested date: ", requestedByClientDate);
                // var requestedDatePlusSeven = new Date(requestedByClientDate.setTime(requestedByClientDate.getTime() + (7 * 24 * 60 * 60 * 1000)));
                // console.log("RequestedDatePlusSeven", requestedDatePlusSeven);
                // var requestedDateMinusSeven = new Date(requestedByClientDate.setTime(requestedByClientDate.getTime() - (14 * 24 * 60 * 60 * 1000)));
                // console.log("RequestedDateMinusSeven", requestedDateMinusSeven);


                var tmpObj = requestedByClientDate.getFullYear().toString().concat("-", (requestedByClientDate.getMonth()+1).toString(), "-", requestedByClientDate.getDate());

                console.log(tmpObj);

                // for(var i = 0; i < 7; i++)
                // {
                //     var tmp = comingFromClientDate.setTime(comingFromClientDate.getTime() + (j * 24 * 60 * 60 * 1000));
                //     var tmpObj = new Date(tmp);
                //     console.log(tmpObj.getDate().toString().concat("-", (tmpObj.getMonth()+1).toString(), "-", tmpObj.getFullYear()));
                //     j = 1;
                // }
                result = await searchServiceObject.getListFlights(req.headers.fromplace, req.headers.toplace, tmpObj);
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
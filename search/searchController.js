var searchService = require("./searchService");
var searchServiceObject = new searchService.SearchService();

class SearchController {

    async getAllFlights(req, res) {
        try{
            var result = await searchServiceObject.getAllFlights();
            res.send(result);
        }catch(error) {
            console.log("Error");
        }
    }



}

exports.SearchController = SearchController;
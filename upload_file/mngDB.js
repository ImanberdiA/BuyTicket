const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketsOfRacesSchema = new Schema({
    starting_point: {type: String},
    end_point: {type: String},
    flight_date: {type: String},
    departure_time: {type: String},
    boarding_time: {type: String},
    baggage: {type: String},
    class_of_service: {type: String},
    airline: {type: String},
    travel_time: {type: String},
    cost: {type: String}
});

const TicketsRaces = module.exports = mongoose.model('races', TicketsOfRacesSchema);

module.exports.createTicketOfRaces = function (newTicket, callback) {
    newTicket.save(callback);
};
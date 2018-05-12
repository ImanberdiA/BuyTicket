const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    starting_point: { type: String },
    end_point: { type: String},
    flight_date: {type: String},
    departure_time: {type: String},
    boarding_time: {type: String},
    baggage: {type: Number},
    class_of_service: {type: String},
    airline: {type: String},
    travel_time: {type: String},
    cost: {type: Number}
});

const Race = module.exports = mongoose.model('race', RaceSchema);

module.exports.createRace = function (newRace, callback) {
    newRace.save(callback);
};

module.exports.getRacesByDate = function (race, callback) {
    Race.find({$and:[{starting_point: race.starting_point}, {end_point: race.end_point}, {flight_date: race.flight_date}, {baggage: race.baggage}, {class_of_service: race.class_of_service}]}, callback);
};

module.exports.getRaceById= function (race, callback) {
    Race.find({_id: race._id}, callback);
};
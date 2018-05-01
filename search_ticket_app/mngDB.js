const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    starting_point: { type: String },
    end_point: { type: String},
    flight_date: {type: String},
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

module.exports.getRacesByDate = function (newRace, callback) {
    Race.find({$and:[{starting_point: newRace.starting_point}, {end_point: newRace.end_point}, {flight_date: newRace.flight_date}, {baggage: newRace.baggage}, {class_of_service: newRace.class_of_service}]}, callback);
};
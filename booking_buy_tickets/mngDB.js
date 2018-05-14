const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingTicketSchema = new Schema({
    id_race: {type: String},
    starting_point: {type: String},
    end_point: {type: String},
    flight_date: {type: String},
    departure_time: {type: String},
    boarding_time: {type: String},
    baggage: {type: String},
    class_of_service: {type: String},
    airline: {type: String},
    travel_time: {type: String},
    cost: {type: String},
    clientName: {type: String},
    clientSurname: {type: String},
    gender: {type: String},
    birth_date: {type: String},
    citizenship: {type: String},
    document_number: {type: String},
    validity: {type: String},
    phone_number: {type: String},
    email: {type: String}
});

const BookingTicket = module.exports = mongoose.model('bookingrace', BookingTicketSchema);

module.exports.createBookingTicket = function (newBookingTicket, callback) {
    newBookingTicket.save(callback);
};

module.exports.getTicketById = function (ticket, callback) {
    BookingTicket.find({_id: ticket._id}, callback);
};
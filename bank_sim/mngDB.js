const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuyingTicketSchema = new Schema({
    ticket_id: {type: String},
    card_number: {type: String},
    validity: {type: String},
    secure_code: {type: String},
    clientName: {type: String},
    clientSurname: {type: String}
});

const BuyingTicket = module.exports = mongoose.model('buyingrace', BuyingTicketSchema);

module.exports.createBuyingTicket = function (newBuyingTicket, callback) {
    newBuyingTicket.save(callback);
};

// module.exports.getTicketById = function (ticket, callback) {
//     BuyingTicket.find({_id: ticket._id}, callback);
// };
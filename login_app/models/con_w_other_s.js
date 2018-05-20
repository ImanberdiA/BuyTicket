var mongoose = require('mongoose');

// User Schema
var IdUserSchema = mongoose.Schema({
    id_cur_user: {
        type: String
    }
});

var IdUser = module.exports = mongoose.model('id_user', IdUserSchema);

module.exports.createIdUser = function(newIdUser, callback){
    newIdUser.save(callback);
};

module.exports.deleteIdUser = function(deleteIdUser, callback){
    IdUser.findOneAndRemove({id_cur_user: deleteIdUser}, function (err) {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
    });
};

module.exports.getIdUser = function (id_user, callback) {
    IdUser.find({id_cur_user: id_user}, callback);
};


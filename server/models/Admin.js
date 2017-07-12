var mongoose  = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = function(){
    var mongoose  = require('mongoose');

    var AdminSchema = new Schema({
        email:  { type: String, required: true, lowercase: true, index: { unique: true }},
        userName: { type: String, required: true},
        password:  { type: String, required: true},
        deleted: {type: Boolean, required: true, default: false},
        deletedAt: { type: Date},
        createdAt: { type: Date, required: true, 'default': Date.now},
        updatedAt: { type: Date, required: true, 'default': Date.now}
    });

    return mongoose.model("Admin", AdminSchema);
};





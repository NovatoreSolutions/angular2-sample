var mongoose  = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = function(){
    var mongoose  = require('mongoose');

    var UserSchema = new Schema({
        firstName:  { type: String, required: true},
        lastName:  { type: String, required: true},
        email:  { type: String, lowercase: true, index: { unique: true },required: true},
        password:  { type: String },
        phone : { type: String},
        role : { type: String ,  enum: ['Host', 'Cleaner','Agent']},
        deleted: {type: Boolean, required: true, default: false},
        deletedAt: { type: Date},
        createdAt: { type: Date, required: true, 'default': Date.now},
        updatedAt: { type: Date, required: true, 'default': Date.now}
    });

    return mongoose.model("User", UserSchema);
};





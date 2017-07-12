var mongoose  = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

module.exports = function(){
  var mongoose  = require('mongoose');

  var ScheduleSchema = new Schema({

    scheduleDate:{type: Date, required:true, 'default': Date.now},


    scheduleDay:{type:String},
    scheduleMonth:{type:String},
    scheduleYear:{type:String},



    startTime :{type:String,required:true},
    endTime :{type:String,required:true},

    description : { type: String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    deleted: {type: Boolean, required: true, default: false},
    deletedAt: { type: Date},
    createdAt: { type: Date, required: true, 'default': Date.now},
    updatedAt: { type: Date, required: true, 'default': Date.now}
  });

  return mongoose.model("Schedule", ScheduleSchema);
};





var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var soldierSchema = new mongoose.Schema({
  	name: {type: String, required:true, minlength: 2},
    image: String,
  	rank: String,
  	team: String,
  	position: String,
  	mos: String,
  	sex: String,
  	weight: Number,
  	height: Number,
  	age: Number,
  	blood_type: String,
  	allergies: String,
  	food: String,
    water: String,
    ammo: String,
  	created_at: { type : Date, default: Date.now }
	});
// soldierSchema.path('name').required(true, 'Name can not contain less than three letters.');
mongoose.model('Soldier', soldierSchema);

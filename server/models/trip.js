var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new mongoose.Schema({
  	city: String,
    country: String,
    lon: Number,
    lat: Number,
    ground: Number,
    humidity: Number,
    pressure: Number,
    sea_level: Number,
    temp: Number,
    temp_max: Number,
    temp_min: Number,
    wind_speed: Number,
    wind_direction: Number,
    clouds: String,
  	created_at: { type : Date, default: Date.now }
	});
// tripSchema.path('name').required(true, 'Name can not contain less than three letters.');
mongoose.model('Trip', tripSchema);

var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

	module.exports = (function() {
 		return {
  		index: function(req, res) {

    		Trip.find({}, function(err, results) {
       			if(err) {
         			console.log(err);
       			} else {
         			res.json(results);
       				}
   				}).sort({'created_at' : -1}).limit(1)
  			},

  		create: function(req, res) {
        // console.log('in the create function of the controller');
  			var trip = new Trip({
    			city: req.body.city,
          country: req.body.country,
          lon: req.body.lon,
          lat: req.body.lat,
          ground: req.body.ground,
          humidity: req.body.humidity,
          pressure: req.body.pressure,
          sea_level: req.body.sea_level,
          temp: req.body.temp,
          temp_max: req.body.temp_max,
          temp_min: req.body.temp_min,
          wind_speed: req.body.wind_speed,
          wind_direction: req.body.wind_direction,
          clouds: req.body.clouds
    			});
    		trip.save(trip);
    		res.json({message: 'success'})
  			}

 		}
		})();
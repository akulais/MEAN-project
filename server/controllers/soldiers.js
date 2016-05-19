var mongoose = require('mongoose');
var Soldier = mongoose.model('Soldier');

	module.exports = (function() {
 		return {
  		index: function(req, res) {

    		Soldier.find({}, function(err, results) {
       			if(err) {
         			console.log(err);
       			} else {
         			res.json(results);
       				}
   				})
  			},

  		create: function(req, res) {
        // console.log('in the create function of the controller');
  			var soldier = new Soldier({
    			name: req.body.name,
          image: req.body.image,
          rank: req.body.rank,
          team: req.body.team,
          position: req.body.position,
          mos: req.body.mos,
          sex: req.body.sex,
          weight: req.body.weight,
          height: req.body.height,
    			age: req.body.age,
          blood_type: req.body.blood_type,
          allergies: req.body.allergies,
          food: req.body.food,
          water: req.body.water,
          ammo: req.body.ammo
    			});
    		soldier.save(soldier);
    		res.json({message: 'success'})
  			},

      show: function(req, res) {
        // console.log("showing", req.params.id);
        Soldier.findOne({_id: req.params.id}, function(err, soldier) {
          if(err) {
            res.json({message: "can\'t find them"});
          } else {
            // console.log('show in controller', soldier);
            res.json({soldier: soldier});
          }
        })
      },

      update: function(id, water, food, ammo, req, res) {
        console.log('XXXXXXX', water);
        console.log('XXXXXXX', food);
        console.log('XXXXXXX', ammo);
        console.log('XXXXXXX', id);
        Soldier.findOne({_id: id}, function(err, soldier) {
          if(err) {
            res.json({message: "he is not found"});
          } else {
            soldier.water = water;
            soldier.food = food;
            soldier.ammo = ammo;
            soldier.save(soldier);
          }
          
        });
      },

      delete: function(req, res) {
        console.log('removing in route', req.params.id);
        Soldier.remove({_id: req.params.id}, function(err, status) {
          if(err) {
            console.log('not working', err);
          } else {
            res.json({message: 'he gone'});
          }
        })
      }
 		}
		})();
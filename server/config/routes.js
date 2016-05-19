var soldiers = require('./../controllers/soldiers.js');
var trips = require('./../controllers/trips.js');

	module.exports = function(app) {
		app.get('/soldiers', function(req, res) {
			// console.log('in main index');
  			soldiers.index(req, res);
  			// inventory.index(req, res);
			});

		app.get('/trips', function(req, res) {
			trips.index(req, res);
			});

		app.post('/addSoldier', function(req, res) {
			// console.log('adding soldier');
			soldiers.create(req, res);
			});

		app.get('/show/:id', function(req, res) {
			// console.log('show', req.params.id);
			soldiers.show(req, res);
			});

		app.put('/update', function(req, res) {
			console.log(req.body._id, "XXXXXXXXXXXXXXXXXXXXXXXxx");
			console.log(req.body.water, "update water");
			console.log(req.body.food, "update food");
			console.log(req.body.ammo, "update ammo");
			id = req.body._id;
			water = req.body.water;
			food = req.body.food;
			ammo = req.body.ammo;
			soldiers.update(id, water, food, ammo, req, res);
			});

		app.delete('/delete/:id', function(req, res) {
			soldiers.delete(req, res);
			});

		app.post('/addTrip', function(req, res) {
			trips.create(req, res);
			});

		};
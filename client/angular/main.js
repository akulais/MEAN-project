var patrol_app = angular.module('patrol_app', ['ngRoute', 'angularMoment', 'angular.filter']);

        patrol_app.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'partials/main.html'
            })
            .when('/main', {
                templateUrl: 'partials/main.html'
            })
            .when('/team_member', {
                templateUrl: 'partials/team_member.html'
            })
            .when('/update_soldier/:id', {
                templateUrl: 'partials/update_soldier.html'
            })
            .when('/location', {
                templateUrl: 'partials/location.html'
            })
            .otherwise({
                redirectTo: 'partials/main.html'
            });
        });

//	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS 	SOLDIERS
    patrol_app.factory('SoldierFactory', function($http) {
        var soldiers = []; // THIS IS THE FULL ARRAY
        var factory = {}; // THIS IS THE OBJECT THAT WILL GO INTO THE ARRAY

    factory.index = function(callback) {
        $http.get('/soldiers').success(function(output) {
	        soldiers = output;
	        callback(soldiers);
	        }) 
        }

    factory.show = function(soldiers, callback) {
        // console.log("in factory", soldiers.id);
        $http.get('/show/' + soldiers.id).success(function(output) {
            soldiers = output;
            callback(soldiers);
            });
        }

    factory.create = function(info, callback) {
        $http.post("/addSoldier", {name: info.name, rank: info.rank, 
            team: info.team, position: info.position, mos: info.mos, 
            sex: info.sex, weight: info.weight, height: info.height, 
            age: info.age, blood_type: info.blood_type, allergies: info.allergies, image: info.image, water: info.water, food: info.food, ammo: info.ammo
                }).success(function(output) {
            callback(output);
        	});
        	callback(soldiers);
        }

    factory.update = function(id, water, food, ammo) {
        console.log('factory update id', id, 'water', water, 'food', food, 'ammo', ammo);

        $http.put('/update', {_id: id.id, water: water, food: food, ammo: ammo});
    }

    factory.retire = function(soldier, callback) {
        console.log('soldier in retire', soldier);
        $http.delete('/delete/' + soldier._id).success(function() {
            soldiers.splice(soldiers.indexOf(soldier), 1);
            });
        location.href = '#/'; //this will redirect to a different page
        }

    return factory;
    });

patrol_app.factory('WeatherFactory', function($http) {
        var trips = []; // THIS IS THE FULL ARRAY
        var factory = {}; // THIS IS THE OBJECT THAT WILL GO INTO THE ARRAY

    factory.index = function(callback) {
        $http.get('/trips').success(function(output) {
            trips = output;
            callback(trips);
            }) 
        }

    factory.create = function(info, callback) {
        console.log('in create', info);
        $http.post("/addTrip", {city: info.city, country: info.country, lon: info.lon, lat: info.lat, ground: info.ground, humidity: info.humidity, pressure: info.pressure, sea_level: info.sea_level, temp: info.temp, temp_max: info.temp_max, temp_min: info.temp_min, wind_speed: info.wind_speed, wind_direction: info.wind_direction, clouds: info.clouds
                }).success(function(output) {
            callback(output);
            });
            callback(trips);
        }
    return factory;
    });

    patrol_app.controller('soldierController', function($scope, SoldierFactory) {
        
        SoldierFactory.index(function(data) {
            $scope.soldiers = data;
        });

        $scope.addSoldier = function() {
            // console.log($scope.soldiers,'in addSoldier');
            if($scope.isDuplicate($scope.soldiers.name)) {
                alert("can\'t add the name becuase it is already used");
            } else {
            SoldierFactory.create($scope.soldiers, function(data) {
                $scope.error = data;
                SoldierFactory.index(function(data) {
                    $scope.soldiers = data;
                    });
                });
            }
            }
            
        $scope.isDuplicate = function(new_soldier) {
            SoldierFactory.index(function(data) {
                $scope.soldiers = data;
                });
            
            for (var i = 0; i < $scope.soldiers.length; i++) {
                if (new_soldier == $scope.soldiers[i].name) {
                    return true;
                    }
                }
            }

        });         //  THIS IS THE END OF THE CUSTOMER CONTROLLER

//  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  MAIN  
  
    patrol_app.controller('mainController', function ($scope, $http, SoldierFactory, WeatherFactory) {
        
        $scope.date = new Date();

        SoldierFactory.index(function(data) {
            $scope.soldiers = data;
            });
    
        WeatherFactory.index(function(data) {
            console.log(data, "weatherfactory index");
            $scope.trips = data;
        

            var location = $scope.trips[0].city;
            console.log('location', location);
            var APIID = "&APPID=4e08b09060ec74856552b7ea85960550";
            $http.get("http://api.openweathermap.org/data/2.5/forecast/city?q=" + location + '&units=imperial' + APIID
            ).success(function(data, status) {
                console.log(data);
                $scope.response = data;
                 console.log($scope.response);
            }).error(function(data, status) {
     
            console.log('Could not retrieve data');
            });
        });
        

        $scope.show = function(soldiers) {
            // console.log('in mainController', soldiers);
            SoldierFactory.show(soldiers, function(data) {
                // console.log('in mainController');
                $scope.soldiers = data;
                });
                }

        
    });         //  THIS IS THE END OF THE MAIN CONTROLLER


patrol_app.controller('updateController', function ($scope, SoldierFactory, $routeParams) {
// console.log('updateController', $routeParams);
            SoldierFactory.show($routeParams, function(data) {
                // console.log('in mainController', data);
                $scope.soldiers = data;
                });
                
        $scope.update = function(soldier) {
            console.log('updating id', $routeParams);
            console.log('updating water', soldier.water);
            console.log('updating food', soldier.food);
            console.log('updating ammo', soldier.ammo);

            SoldierFactory.update($routeParams, soldier.water, soldier.food, soldier.ammo);
            location.href = '#/';
        }

        $scope.retire = function(soldier) {
            console.log('retire w/id', $routeParams);

            SoldierFactory.retire(soldier, function(data) {
                SoldierFactory.index(function(data) {
                    $scope.soldiers = data;
                    });
                });
            }
        }); 

patrol_app.controller('locationController', function($scope, $http, WeatherFactory) {

        $scope.getWeather = function(info) {
            var location = $scope.weather.location;
            console.log('location', location);
            var APIID = "&APPID=4e08b09060ec74856552b7ea85960550";
            $http.get("http://api.openweathermap.org/data/2.5/forecast/city?q=" + location + '&units=imperial' + APIID
            ).success(function(data, status) {
                console.log(data);
                $scope.response = data;
                 console.log($scope.response);
                // var longitude = $scope.response.city.coord.lon;
                // var latitude = $scope.response.city.coord.lat;
                //  $http.get("http://api.sat.owm.io/api/2.5/search?lat=" + latitude + "&lon=" + longitude +"&mode=json").success(function(data, status) {
                //     $scope.map = data; }).error(function(data, status) {
                //         console.log('nope');
                //     })

            }).error(function(data, status) {
     
        console.log('Could not retrieve data');
            });
        }



        $scope.saveWeather = function(trip) {
            console.log("saveWeather in controller", trip);
            WeatherFactory.create($scope.trip, function(data) {
                console.log('data in saveWeather', $scope.trip);
                $scope.trip = data;
                });
            location.href = '#/';
            }

});
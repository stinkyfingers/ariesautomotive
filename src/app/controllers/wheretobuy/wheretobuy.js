'use strict';

angular.module('ariesautomotive').controller('BuyController', ['$scope', '$rootScope', '$stateParams', '$anchorScroll', 'localStorageService', 'BuyService', 'uiGmapGoogleMapApi', function($scope, $rootScope, $stateParams, $anchorScroll, localStorage, BuyService, GoogleMapApi){

	var lastBounds = {};
	var polyClick = function(gPoly){
		var path = gPoly.getPath();
		if (path.getLength() === 0){
			return;
		}
		var lat = path.getAt(0).lat();
		var lng = path.getAt(0).lng();
		$scope.map.zoom = 8;
		$scope.position.coords = {
			latitude: lat,
			longitude: lng
		};
		$scope.map.center = {
            latitude: $scope.position.coords.latitude,
            longitude: $scope.position.coords.longitude
        };
		$scope.map.refresh = true;
		$scope.$apply();
	};

	var boundsChange = function(gMap){
		var bnds = gMap.getBounds();
		if($scope.map.zoom < 8 || bnds === lastBounds){
			return;
		}

		lastBounds = bnds;
		var center = bnds.getCenter();
		var ne = bnds.getNorthEast();
		var sw = bnds.getSouthWest();
		var centerStr = center.lat() + ',' + center.lng();
		var neStr = ne.lat() + ',' + ne.lng();
		var swStr = sw.lat() + ',' + sw.lng();
		$scope.locations = [];
		var sort = 3;
		if($scope.map.zoom > 6 && $scope.map.zoom < 9){
			sort = 2;
		}else if($scope.map.zoom > 8){
			sort = 1;
		}
		getByBounds(centerStr, neStr, swStr, 0 , 100, sort);
	};

	var getByBounds = function(center, ne, sw, skip, count, sort){

		BuyService.bounds(center, ne, sw, skip, count, sort).then(function(data){
			if (data === null || data.length === 0){
				return;
			}

			for (var i = 0; i < data.length; i++) {
				var el = data[i];
				if(el !== undefined && el !== null && el.id !== undefined && el.id !== null && el.dealerType !== undefined){
					data[i].icon = el.dealerType.mapIcon.mapIcon.Scheme + '://' + el.dealerType.mapIcon.mapIcon.Host + el.dealerType.mapIcon.mapIcon.Path;
				}
			}
			$scope.locations = data;
			if(data.length === count){
				getByBounds(center, ne, sw, $scope.locations.length, count, sort);
			}
		});
	};

    var plotPosition = function(pos){
        if(pos.coords !== undefined && pos.coords !== null){
            $scope.position = pos;
            localStorage.set('position', pos);
            updateLocations();
        }
    };
    var failedPosition = function(){
        if ($scope.position === undefined){
            $rootScope.$broadcast('error', 'Failed to retrieve your location');
        }

		$scope.map.center = {
			latitude: 40.125496,
			longitude: -96.391891
		};
		$scope.map.zoom = 4;
		$scope.position = {};
		$scope.coordinates = $scope.position.coords = $scope.map.center;
		$scope.$apply();
    };

    var updateLocations = function(){

        $scope.coordinates.latitude = $scope.position.coords.latitude;
        $scope.coordinates.longitude = $scope.position.coords.longitude;

		$scope.map.center = {
            latitude: $scope.position.coords.latitude,
            longitude: $scope.position.coords.longitude
        };
		if($scope.map.zoom < 5){
			BuyService.regions().then(function(data){
				$scope.map.polys = data;
			});
		}

    };

	$scope.locations = [];
    $scope.coordinates = {};
    $scope.map = {
        markerIcon: 'http://www.curtmfg.com/Content/img/mapflag.png',
        show: false,
        control: {},
		doCluster: true,
        showTraffic: false,
        showBicycling: false,
        showWeather: false,
        showHeat: false,
        center: {
			latitude: 40.125496,
			longitude: -96.391891
        },
        options:{
            streetViewControler: false,
            panControl: false,
            maxZoom: 20,
            minZoom: 3
        },
        zoom: 8,
		pan: true,
        dragging: false,
        bounds: {},
        markers: [],
        events: {
			idle: boundsChange
		},
		polyEvents: {
			click: polyClick
		}
    };

	$scope.generateIcon = function(obj){
		if(obj.Scheme === undefined){
			return '';
		}
		return obj.Scheme + '://' + obj.Host + obj.Path;
	};

	$scope.panTo = function(l){
		for (var i = 0; i < $scope.locations.length; i++) {
			if($scope.locations[i].id === l.id){
				$scope.locations[i].show = true;
			}else{
				$scope.locations[i].show = false;
			}
		}
		$anchorScroll('#map');
	};

    $scope.$watch('position',function(){
        if ($scope.position === undefined || $scope.position.coords === undefined || $scope.position.coords === null){
            return;
        }
        $scope.map.show = true;
        $scope.map.refresh = true;
        updateLocations();
    });

    GoogleMapApi.then(function(maps){
		$scope.geocoder = new maps.Geocoder();
		if($stateParams.location !== ''){
			$scope.geocoder.geocode({'address': $stateParams.location},function(results, status){
				if(status !== google.maps.GeocoderStatus.OK){
					$rootScope.$broadcast('error', 'Failed to find location');
					return;
				}
				$scope.map.center = {
					latitude: results[0].geometry.location.lat(),
					longitude: results[0].geometry.location.lng()
				};
				$scope.map.zoom = 10;
				$scope.map.refresh = true;
				$scope.$apply();
			});
		}
		if (Modernizr.geolocation) {
            var pos = localStorage.get('position');
            if (pos === undefined || pos === null || pos.coords === undefined){
				var geoOptions = {
			            enableHighAccuracy: true,
			            timeout: 500,
			            maximumAge: 500
			    };

                navigator.geolocation.getCurrentPosition(plotPosition, failedPosition, geoOptions);
                navigator.geolocation.watchPosition(plotPosition, failedPosition, geoOptions);
				return;
            }

            $scope.position = pos;
			return;
		}
    });


}]);

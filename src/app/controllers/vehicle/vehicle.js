'use strict';

angular.module('ariesautomotive').controller('VehicleController', ['$scope', 'LookupService', 'localStorageService', 'PartService', 'CategoryService', '$location', '$anchorScroll', '$stateParams', '$rootScope', '$analytics', function($scope, LookupService, localStorageService, PartService, CategoryService, $location, $anchorScroll, $stateParams, $rootScope, $analytics) {
	$scope.collections = [];
	$scope.years = [];
	$scope.makes = [];
	$scope.models = [];
	$scope.styles = [];
	$scope.inquiry = {};
	$scope.inquiry_success = false;
	$scope.qualified = false;
	$scope.display = false;

	$rootScope.pageTitle = "Automotive Accessories | Custom Fit | Vehicle Specific | ARIES";
	$rootScope.pageDesc = "Many ARIES parts are made for a vehicle-specific fit. Look up your vehicle to find ARIES products that fit your specific year, make, model and submodel.";
	$rootScope.pageKywds = "aries, custom fit, vehicle specific, automotive, accessories";

	$scope.vehicle = LookupService.getVehicle();
	if ($scope.vehicle === null) {
		$scope.vehicle = {
			year: $stateParams.year,
			make: $stateParams.make,
			model: $stateParams.model,
			style: "",
			collection: ""
		};
	}

	if (!LookupService.validateBaseVehicle($scope.vehicle)) {
		LookupService.clear();
		$scope.vehicle = {};
		$location.path('/');
	} else {
		$scope.validVehicle = true;
		LookupService.setVehicle($scope.vehicle);
	}

	$scope.getCategoryParts = function() {
		$scope.processing = true;

		LookupService.queryCategoryStyles($scope.vehicle).then(function(resp) {
			$scope.totalNumberParts = 0;

			var categoryparts = {};
			var title;

			for (title in resp) {
				if (!$scope.tab) {
					$scope.tab = title;
				}
				categoryparts[title] = resp[title];
				categoryparts[title].name = title;
				if ($scope.vehicle.style && $scope.vehicle.style !== '') {
					categoryparts[title].style = $scope.vehicle.style;
				}
				$scope.totalNumberParts += resp[title].parts.length;
				categoryparts[title].style_required = LookupService.checkStyleRequiredToAddToCart(categoryparts[title]);
			}

			$scope.categoryparts = $scope.setAllByDefault(categoryparts);
			
			//get all seat defenders
			CategoryService.parts(320,'','').then(function(cats){
				$scope.categoryparts['seat defenders'] = {
					name: 'seat defenders',
					parts: cats.parts,
					style_required: false,
					available_styles: '',
					style: 'Fits All Vehicle Styles'
				}
			});

			$scope.processing = false;
			$scope.stopProcessing();
		}, function(err) {
			$rootScope.$broadcast('error', err.data.message);
		});
	};

	$scope.getCategoryParts();

	$scope.scrollTo = function(elementId) {
		$location.hash(elementId);
		$anchorScroll();
	};
	$scope.clear = function() {
		$scope.vehicle = {};
		$scope.parts = null;
	};
	$scope.getParts = function() {
		LookupService.query($scope.vehicle).then(function(data) {
			$scope.parts = data.parts;
		}, function(err) {
			$scope.err = err;
		});
	};
	$scope.setCategoryStyle = function(cat, style) {
		var v = $scope.vehicle;
		v.collection = cat.name;
		v.style = style;
		LookupService.queryCategoryStyles(v).then(function(resp) {
			$analytics.pageTrack($location.path() + '#' + cat.name + '-' + v.style);
			$scope.categoryparts[v.collection] = resp[v.collection];
			$scope.categoryparts[v.collection].name = v.collection;
			$scope.categoryparts[v.collection].style = style;
		}, function(err) {
			$rootScope.$broadcast('error', err.data.message);
		});
	};
	$scope.setTab = function(tab) {
		$analytics.pageTrack($location.path() + '#' + tab);
		$scope.tab = tab;
		$scope.presetStyle(tab);
	};
	$scope.isSet = function(tabID) {
		return $scope.tab === tabID;
	}

	//use current vehicle's style if it exists for this categorypart
	$scope.presetStyle = function(categoryname){
		if (!$scope.vehicle.style){
			return;
		}
		for (var c in $scope.categoryparts[categoryname].available_styles){
			if ($scope.categoryparts[categoryname].available_styles[c] === $scope.vehicle.style){
				$scope.setCategoryStyle($scope.categoryparts[categoryname], $scope.categoryparts[categoryname].available_styles[c]);
				return;
			}
		}
	}

	//if category only fits one vehicle style, all, select it by default
	$scope.setAllByDefault = function(categoryparts){
		for (var c in categoryparts){
			if (categoryparts[c].available_styles.length === 1 && categoryparts[c].available_styles[0].toLowerCase() === 'all'){
				categoryparts[c].style = categoryparts[c].available_styles[0];
			}
		}
		return categoryparts;
	}

	$scope.vehicleLink = function(val) {
		val = encodeURIComponent(val);
		var str = '/vehicle';
		if ($scope.vehicle === undefined || $scope.vehicle === null || $scope.vehicle === undefined || $scope.vehicle === null) {
			return str + '/' + val;
		}
		if ($scope.vehicle.collection === undefined || $scope.vehicle.collection === null || $scope.vehicle.collection === '') {
			return str + '/' + val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.collection);
		if ($scope.vehicle.year === undefined || $scope.vehicle.year === null || $scope.vehicle.year === '') {
			return str + '/' + val;
		}
		str += '/' + $scope.vehicle.year;
		if ($scope.vehicle.make === undefined || $scope.vehicle.make === null || $scope.vehicle.make === '') {
			return str + '/' + val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.make);
		if ($scope.vehicle.model === undefined || $scope.vehicle.model === null || $scope.vehicle.model === '') {
			return str + '/' + val;
		}
		str += '/' + encodeURI($scope.vehicle.model);
		if ($scope.vehicle.style === undefined || $scope.vehicle.style === null || $scope.vehicle.style === '') {
			return str + '/' + val;
		}
		str += '/' + encodeURIComponent($scope.vehicle.style);

		return str;
	};
	$scope.generateVehicleString = function() {
		var str = '';
		if ($scope.vehicle === undefined || $scope.vehicle.year === undefined || $scope.vehicle.make === undefined || $scope.vehicle.model === undefined) {
			return str;
		}
		if ($scope.vehicle === null || $scope.vehicle.year === null || $scope.vehicle.make === null || $scope.vehicle.model === null) {
			return str;
		}

		str = $scope.vehicle.year + ' ' + $scope.vehicle.make.trim() + ' ' + $scope.vehicle.model.trim();

		if ($scope.vehicle.style !== undefined && $scope.vehicle.style !== '' && $scope.vehicle.style !== null) {
			str += ' ' + $scope.vehicle.style.trim();
		}


		return str.replace(/\w\S*/g, function(str) {
			return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
		}).toUpperCase();
	};
	$scope.submitInquiry = function() {
		$scope.inquiry.vehicle = JSON.stringify($scope.vehicle);
		LookupService.inquire($scope.inquiry).then(function() {
			$scope.inquiry_success = true;
			$scope.inquiry = {};
		}, function(err) {
			$scope.err = err;
		});
	};

	$scope.resetStyle = function(cat) {
		$scope.vehicle.style = '';
		$scope.styles = '';
		$scope.setCategoryStyle(cat, null);
	};

	$scope.$on('vehicleChange', function(event, x) {
		$scope.vehicle = x;
		$scope.getParts();
	});

	var i;
	if ($scope.vehicle.year === undefined && $stateParams !== {}) {
		$scope.vehicle = {
			collection: '',
			year: '',
			make: '',
			model: ''
		};
		if ($stateParams.collection !== undefined && $stateParams.collection !== null) {
			$scope.vehicle.collection = $stateParams.collection;
			if ($stateParams.year !== undefined && $stateParams.year !== null) {
				$scope.vehicle.year = $stateParams.year;
				if ($stateParams.make !== undefined && $stateParams.make !== null && $stateParams.make !== '') {
					$scope.vehicle.make = $stateParams.make;
					if ($stateParams.model !== undefined && $stateParams.model !== null && $stateParams.model !== '') {
						$scope.vehicle.model = $stateParams.model;
						if ($stateParams.style !== undefined && $stateParams.style !== null && $stateParams.style !== '') {
							$scope.vehicle.style = $stateParams.style;
						}
					}
				}
			}
		}

		if ($scope.vehicle.collection !== '') {
			LookupService.query($scope.vehicle).then(function(data) {
				if (data.available_years !== undefined && data.available_years !== null && data.available_years.length > 0) {
					$scope.years = data.available_years;
				}
				if (data.available_makes !== undefined && data.available_makes !== null && data.available_makes.length > 0) {
					$scope.makes = data.available_makes;
				}
				if (data.available_models !== undefined && data.available_models !== null && data.available_models.length > 0) {
					$scope.models = data.available_models;
				}
				if (data.available_styles !== undefined && data.available_styles !== null && data.available_styles.length > 0) {
					$scope.styles = data.available_styles;
				}
				if (data.parts !== undefined && data.parts !== null) {
					$scope.parts = data.parts;
				}
			}, function(err) {
				$scope.err = err;
			});
		} else {
			LookupService.collections().then(function(data) {
				$scope.collections = data;
			}, function(err) {
				$scope.err = err;
			});
		}
	} else {
		if ($scope.vehicle !== null) {
			$scope.qualified = true;
		}
	}

	CategoryService.GetParents().then(function(data) {
		$scope.categories = [];
		for (var i = 0; i < data.length; i++) {
			var cat = data[i];
			if (cat.sub_categories !== undefined && cat.sub_categories !== null && cat.sub_categories.length > 0) {
				for (var j = 0; j < cat.sub_categories.length; j++) {
					var sub = cat.sub_categories[j];
					$scope.categories.push(sub);
				}
			} else {
				$scope.categories.push(cat);
			}
		}
	});


	$scope.stopProcessing = function() {
		var item;
		var sum = 0;
		for (item in $scope.categoryparts) {
			if ($scope.categoryparts[item].parts !== null) {
				sum += $scope.categoryparts[item].parts.length;
			}
		}

		if (sum === 0) {
			$scope.display = true;
			return;
		}
		$scope.display = false;
	};

}]);

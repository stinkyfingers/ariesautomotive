'use strict';

angular.module('ariesautomotive').controller('AppGuideController', ['$rootScope','$scope', '$stateParams', 'ApplicationGuideService', function($rootScope, $scope, $stateParams, ApplicationGuideService){
	$scope.collection = $stateParams.collection || '';
	$scope.applications = [];
	$scope.finishes = [];
	$scope.colors = [];
	$scope.location = false;

	$rootScope.pageTitle = "ARIES Automotive | Application Guides";
	$rootScope.pageKywds = "aries, automotive, applications, application guides, vehicles";


	var page = 0;

	$scope.getPart = function(f, app){
		angular.forEach(app.parts, function(p){
			return p;
		});
	};

	$scope.GetFileLocation = function(type){
		var pdf = "";
		var xlsx = "";
		switch($scope.collection) {
			case "3 in round side bars":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "3 in round side bars, pro series":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%203%20IN%20PRO%20SERIES%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "4 in oval side bars":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			case "4 in oval side bars, wheel to wheel":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20OVAL%20SIDE%20BARS%20-%20W2W%20App%20Guide.xlsx";
				}
			case "6 in oval side bars and mounting brackets":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%206%20IN%20OVAL%20SIDE%20BARS_MOUNTING%20BRACKETS%20App%20Guide.xlsx";
				}
			case "bull bars":
				if (type == "pdf"){
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.pdf";
				}else{
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Bull%20Bars.xlsx";
				}
			case "floor liners":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Interiors_App_Guide.xlsx";
				}
			case "grille guards":
				if (type == "pdf"){
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.pdf";
				}else{
					return "http://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Merged%20Grille%20Guards.xlsx";
				}
			case "jeep accessories":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.xlsx";
				}
			case "jeep bumper kits and replacement parts":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/Modular%20Bumper%20Data%20Tables.xlsx";
				}
			case "4 in round side bars, big step":
				if (type == "pdf"){
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.pdf";
				}else{
					return "https://www.curtmfg.com/masterlibrary/01resources/appguides/ARIES/ARIES%204%20IN%20BIG%20STEP%20SIDE%20BARS%20App%20Guide.xlsx";
				}
			default:
				return "";
		}
	};

	var parseLocations = function(apps){
		var low = 0;
		var high = 0;
		var last = {};
		angular.forEach(apps, function(app){
			if(last.make !== app.make || last.model !== app.model || last.style !== app.style){
				if (last.make !== undefined && $scope.applications.indexOf(last) === -1){
					last.startYear = low;
					last.endYear = high;
					last.locations = [];
					var existing = [];
					for (var j = 0; j < last.parts.length; j++) {
						var p = last.parts[j];
						if(p.location.length > 0 && existing[p.location] === undefined){
							$scope.location = true;
							last.locations.push(p.location);
							existing[p.location] = true;
						}
					}
					$scope.applications.push(last);
				}
				last = app;
				high = app.year;
				low = app.year;
			}else if(app.year < low){
				low = app.year;
			}else{
				last = {};
				high = 0;
				low = 0;
			}
		});
	}

	var getMore = function(page){
		ApplicationGuideService.getApplications($scope.collection, page).then(function(data){
			if(data.applications.length === 0){
				return;
			}

			$scope.finishes = data.finishes;
			$scope.colors = data.colors;
			parseLocations(data.applications);
			page = page + 1;
			getMore(page);
		});
	};

	getMore(page);

}]);

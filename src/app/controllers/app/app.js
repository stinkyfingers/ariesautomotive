'use strict';

angular.module('ariesautomotive').controller('AppController', ['$scope', '$rootScope', '$location', '$state', 'CategoryService', function($scope, $rootScope, $location, $state, CategoryService) {
	// rootscope titles
	$rootScope.pageTitle = "ARIES Automotive | Custom Truck, Jeep, and SUV Accessories";
	$rootScope.pageDesc = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle.";
	$rootScope.pageKywds = "aries, automotive, truck, suv, jeep, accessories, custom";

	$scope.parentCats = [];
	$scope.search_term = '';

	CategoryService.GetParents().then(function(parentCats) {
		$scope.parentCats = parentCats;
	});

	$rootScope.goTo = function(path) {
		$location.path(path);
	};

	$scope.getYear = function(){
        return new Date().getFullYear();
	};

	$scope.carousel_images = [{
		image: 'http://storage.googleapis.com/aries-website/hero-images/jeep.png',
		text: 'Never Fear the Uncertain Road',
		button_text: 'VIEW BULL BARS',
		link: '/category/332',
		order: 5
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/GrandCherokee.png',
		text: 'Find Out What It Means to Be a Pro',
		button_text: 'VIEW PRO SERIES',
		link: '/category/331',
		order: 2
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/JeepWrangler2015.png',
		text: 'Choose Your Configuration and Start Customizing',
		button_text: 'VIEW MODULAR BUMPERS',
		link: '/category/324',
		order: 3
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/Floor%20Liner%20-%20Grey%20(1).jpg',
		text: 'ARIES Unveils StyleGuard™ as New Name for Floor Liners',
		button_text: 'READ MORE',
		link: '/news/47',
		order: 1
	}, {
		image: 'https://storage.googleapis.com/aries-website/hero-images/Moab-Carousel.jpg',
		text: 'Team ARIES at Moab Jeep Safari 2016',
		button_text: 'READ MORE',
		link: '/lp/37',
		order: 4
	}];

}]);

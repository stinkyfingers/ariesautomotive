'use strict';

var carouselImages = [{
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
	image: 'https://storage.googleapis.com/aries-website/hero-images/navyjeep.jpg',
	text: 'Decked Out Jeep to Be Donated to Navy SEAL Foundation',
	button_text: 'READ MORE',
	link: '/news/48',
	order: 4
}];

angular.module('ariesautomotive').controller('AppController', ['$scope', '$rootScope', '$location', '$state', 'CategoryService', function($scope, $rootScope, $location, $state, CategoryService) {
	// rootscope titles
	$rootScope.pageTitle = "ARIES Automotive | Custom Truck, Jeep, and SUV Accessories";
	$rootScope.pageDesc = "From grille guards and modular Jeep bumpers to side bars, bull bars and floor liners, ARIES truck and SUV accessories offer a custom fit for your vehicle.";
	$rootScope.pageKywds = "aries, automotive, truck, suv, jeep, accessories, custom";
	$rootScope.videos = [{
		poster: '//storage.googleapis.com/aries-website/hero_video/whitewashed_poster.jpg',
		files: [{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.mp4',
			type: 'video/mp4',
		},{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.webm',
			type: 'video/webm',
		}]
	}];
	$rootScope.video = $rootScope.videos[Math.floor(Math.random() * $rootScope.videos.length)];

	$rootScope.homeNav = true;
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

	$rootScope.imageToString = function(img) {
		if (img.Host && img.Host !== '') {
			return img.Scheme + '://' + img.Host + img.Path;
		}
		return '';
	}

	$scope.carousel_images = carouselImages;

	$scope.checkScreenWidth = function() {
		if (document.body.clientWidth > 450) {
			$scope.showVideo = true;
		} else {
			$scope.showVideo = false;
		}
	}

	$scope.checkScreenWidth();

	window.addEventListener('resize', function () {
		$scope.checkScreenWidth();
	}, false);

	$rootScope.$watch('video', function(n, o) {
		if (n.poster === o.poster) {
			return;
		}

		var vidEls = document.getElementsByTagName('video');
		if (vidEls.length === 1) {
			vidEls[0].src = $rootScope.video.files[0].path;
			vidEls[0].load();
		}
	});

}]);

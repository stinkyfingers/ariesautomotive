'use strict';

var videos = [{
	poster: '//storage.googleapis.com/aries-website/hero_video/whitewashed_poster.jpg',
	files: [{
		path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.mp4',
		type: 'video/mp4',
	},{
		path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.webm',
		type: 'video/webm',
	}]
}];

angular.module('ariesautomotive').controller('HomepageNavController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';
	$scope.video = videos[Math.floor(Math.random() * videos.length)];

	$scope.search = function(){
		$state.go('search',{'term': $scope.search_term});
	};

	$scope.barHover = function() {
		var els = document.getElementsByClassName('content-container');
		if (els.length !== 1) {
			return;
		}

		els[0].classList.add('hover');
	};

	$scope.barUnhover = function() {
		var els = document.getElementsByClassName('content-container');
		if (els.length !== 1) {
			return;
		}

		els[0].classList.remove('hover');
	};

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
}]);

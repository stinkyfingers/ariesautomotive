'use strict';

angular.module('ariesautomotive').controller('HomepageNavController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';

	var videos = [{
		poster: '//storage.googleapis.com/aries-website/hero_video/whitewashed_poster.jpg',
		files: [{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.mp4',
			type: 'video/mp4',
		},{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSite_ARIES.webm',
			type: 'video/webm',
		}]
	},{
		poster: '//storage.googleapis.com/aries-website/hero_video/whitewashed_poster.jpg',
		files: [{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSiteWhiteScale_ARIES.mp4',
			type: 'video/mp4',
		},{
			path: '//storage.googleapis.com/aries-website/hero_video/SampleVideoForSiteWhiteScale_ARIES.webm',
			type: 'video/webm',
		}]
	}];

	$scope.video = videos[Math.floor(Math.random() * videos.length)];

	$scope.search = function(){
		$state.go('search',{'term': $scope.search_term});
	};
}]);

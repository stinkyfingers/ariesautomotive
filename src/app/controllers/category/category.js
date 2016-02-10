'use strict';

angular.module('ariesautomotive').controller('CategoryController', ['$scope', '$stateParams', '$sce', 'CategoryService', '$location', '$anchorScroll', '$rootScope', function($scope, $stateParams, $sce, CategoryService, $location, $anchorScroll, $rootScope){
	$scope.category = {};
	$scope.loadingMore = false;
	$scope.parts = [];
	var per_page = 50;

	// Default Category Page title
	$rootScope.pageTitle = "ARIES Automotive | Category";
	$rootScope.pageKywds = "aries, automotive, category";

	if($stateParams !== undefined && $stateParams.id !== undefined && $stateParams.id !== ''){
		CategoryService.GetCategory($stateParams.id).then(function(cat){
			$scope.category = cat;
			$scope.parts = $scope.category.product_listing.parts;
			$rootScope.pageTitle = $scope.category.metaTitle;
			$rootScope.pageDesc = $scope.category.metaDescription;
			$rootScope.pageKywds = $scope.category.metaKeywords;
			if (cat.videos && cat.videos.length > 0) {
				if (cat.videos.length === 1 && cat.videos[0].cdn_file && cat.videos[0].cdn_file.length > 0) {
					var video = {
						poster: '',
						files: [],
						small: true,
					};
					for (var i = 0; i < cat.videos[0].cdn_file.length; i++) {
						var file = {};
						var f = cat.videos[0].cdn_file[i];
						switch (f.type.title.toLowerCase()) {
							case 'mp4':
								file.type = 'video/mp4';
								break;
							case 'webm':
								file.type = 'video/webm';
								break;
							default:
						}
						file.path = f.path;
						video.files.push(file);
					}
					$rootScope.video = video;
				} else {
					var video = {
						poster: '',
						files: [],
						small: true,
					};

					var vid = cat.videos[Math.floor(Math.random() * cat.videos.length)];
					for (var i = 0; i < vid.cdn_file.length; i++) {
						var file = {};
						var f = vid.cdn_file[i];
						switch (f.type.title.toLowerCase()) {
							case 'mp4':
								file.type = 'video/mp4';
								break;
							case 'webm':
								file.type = 'video/webm';
								break;
							default:
						}
						file.path = f.path;
						video.files.push(file);
					}
					$rootScope.video = video;
				}
			}
		}, function(err){
			if (err.data && err.data.message) {
				$rootScope.$broadcast('error', err.data.message);
			} else {
				$rootScope.$broadcast('error', 'Failed to find that category');
			}
		});
	}

	$scope.renderHTML = function(content){
		return $sce.trustAsHtml(content);
	};

	$scope.loadMore = function(index, inview, inviewpart, event){
		if($scope.loadingMore){
			return;
		}

		$('.pagination').css('opacity','0.6');
		$scope.loadingMore = true;

		$scope.category.product_listing.page++;
		CategoryService.parts($scope.category.id, $scope.category.product_listing.page, per_page).then(function(data){
			if(data.parts === undefined || data.parts === null){
					data.parts = [];
					data.total_items = $scope.category.product_listing.parts.length;
				}
				$scope.category.product_listing = data;
				$scope.parts = $scope.parts.concat(data.parts);
				$scope.loadingMore = false;
				$('.pagination').css('opacity','1.0');
		});
	};
	$scope.scrollTo = function(elementId){
		$location.hash(elementId);
		$anchorScroll();
	};

	$scope.$on('$destroy', function() {
		$rootScope.video = $rootScope.videos[Math.floor(Math.random() * $rootScope.videos.length)];
	});

}]);

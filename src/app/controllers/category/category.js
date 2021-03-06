'use strict';

angular.module('ariesautomotive').controller('CategoryController', ['$scope', '$stateParams', '$sce', 'CategoryService', '$location', '$anchorScroll', '$rootScope', '$analytics', function($scope, $stateParams, $sce, CategoryService, $location, $anchorScroll, $rootScope, $analytics){
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
			if (!$scope.category.vehicle_specific) {
				$scope.parts = $scope.category.product_listing.parts;
			}
			$rootScope.pageTitle = $scope.category.metaTitle;
			$rootScope.pageDesc = $scope.category.metaDescription;
			$rootScope.pageKywds = $scope.category.metaKeywords;
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
		$analytics.pageTrack('category:' + $scope.category.id + ':page:' + $scope.category.product_listing.page);

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
	$scope.scrollTo = function(elementId, ev){
		if (ev) {
			ev.preventDefault();
		}
		$location.hash(elementId);
		$anchorScroll();
	};

}]);

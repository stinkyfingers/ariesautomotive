'use strict';

angular.module('ariesautomotive').controller('HomepageNavController', ['$scope', '$location', '$state', function ($scope, $location, $state) {
	$scope.search_term = '';

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
}]);

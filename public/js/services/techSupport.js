define(['angular'], function(angular){
	'use strict';

	angular.module('app.services.techSupport',[]).factory('TechSupportService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
		return {
			SubmitTechSupport: function(techSupport){
				var def = $q.defer();
				$http({
					method:'POST',
					url: AppConfig.APIURL + '/techSupport/11/true?key='+AppConfig.APIKEY, //11 is tech services contactType
					// url:'http://localhost:8081/techSupport/232/true?key='+AppConfig.APIKEY,
					data:techSupport,
					headers: {
						'Content-Type':'application/json; charset=UTF-8'
					},
				}).success(def.resolve).error(def.reject);
				return def.promise;
			}

		};
	}]);
});
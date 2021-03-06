'use strict';

angular.module('ariesautomotive').factory('ContactService', ['$http','$q', 'AppConfig', function($http, $q, AppConfig){
	return {
		GetContactTypes : function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/contact/types',
				params:{
					'key' : AppConfig.APIKEY,
					'brandID':AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		PostContactData : function(data,contactType){
			var def = $q.defer();
			$http({
				method: 'post',
				url: AppConfig.APIURL + '/contact/' + contactType ,
				data:data,
				params: {
					'key': AppConfig.APIKEY
				},
				headers: {
					'Content-Type': 'application/json'
				},
				responseType: 'jsonp'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);
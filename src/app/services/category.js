'use strict';

angular.module('ariesautomotive').factory('CategoryService', ['$http','$q','AppConfig', function($http, $q, AppConfig){
	return {
		GetCategory: function(catid){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/category/'+catid,
				params: {
					'key' : AppConfig.APIKEY,
					'count':50,
					'page':1,
					'brandID':AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		parts: function(id,page,count){
			var def = $q.defer();
			$http({
				method: 'get',
				url:AppConfig.APIURL + '/category/' + id + '/parts',
				params:{
					'key':AppConfig.APIKEY,
					'page':page,
					'count':count
				},
				headers: {
					'Content-Type':'application/json; charset=UTF-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		},
		GetParents: function(){
			var def = $q.defer();
			$http({
				method: 'get',
				url: AppConfig.APIURL + '/category',
				params: {
					'key': AppConfig.APIKEY,
					'brandID': AppConfig.BRAND_ID
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
				},
				responseType: 'json'
			}).success(def.resolve).error(def.reject);
			return def.promise;
		}
	};
}]);

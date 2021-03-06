describe('TechsupportController', function () {

	var scope, subject, httpBackend;
	var api_key = '883d4046-8b96-11e4-9475-42010af00d4e';

	var mockedContactReceivers = [{
		"id":1,
		"firstName":"Bart",
		"lastName":"Simpson",
		"email":"bart@test.com"
	},{
		"id":2,
		"firstName":"Homer",
		"lastName":"Simpson",
		"email":"homer@test.com"
	}];

	var techSupport = {
		"vehicleMake":"Ford",
		"vehicleModel":"Taurus",
		"vehicleYear":2010,
		"purchaseDate":"01-01-2010"
	};
	var badTechSupport = {
		"vehicleMake":"Ford",
		"vehicleModel":"Taurus",
		"vehicleYear":2010
	}
	

	beforeEach(function () {
		module('ariesautomotive',
					'ui.router',
					'ngSanitize');

		inject(function ($rootScope, $controller, $httpBackend) {
			httpBackend = $httpBackend;
			scope = $rootScope.$new();
			subject = $controller('TechSupportController', { $scope: scope});
		});
	});

	describe('check if controller is in its place', function () {
		it('should have loaded the subject', function () {
			expect(subject).toBeDefined();
		});
	});

	describe('Check if scope is also in its place. ', function () {
		it('should test scope to be defined', function () {
			expect(scope).toBeDefined();
			expect(typeof scope.techSupport).toBe(typeof {});
			expect(scope.contactReceivers).not.toBe(null);//TODO
		});
	});

	describe('Check http calls. ',function(){
		it('should populate contactReceivers',function(){
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types/receivers/11?key='+api_key).respond(mockedContactReceivers);
			
			httpBackend.flush();
			expect(scope.contactReceivers).not.toBeEmpty;
			expect(scope.contactReceivers.length).toEqual(2);

		});
	});

	describe('Check http calls - submitTechSupport. ',function(){
		it('should populate contactReceivers',function(){
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types/receivers/11?key='+api_key).respond(mockedContactReceivers);
			httpBackend.when('POST','http://ariesautoapi.curtmfg.com/techSupport/39/true?key='+api_key).respond();
			scope.submitTechSupport(techSupport);
			httpBackend.flush();

			expect(scope.message).not.toBeEmpty;
			expect(scope.message).toEqual("Request sent.");
		});

		it('should NOT populate contactReceivers',function(){
			httpBackend.when('GET','http://ariesautoapi.curtmfg.com/contact/types/receivers/11?key='+api_key).respond(mockedContactReceivers);
			httpBackend.when('POST','http://ariesautoapi.curtmfg.com/techSupport/39/true?key='+api_key).respond();
			scope.submitTechSupport(badTechSupport);
			httpBackend.flush();

			expect(scope.message).toBeEmpty;
			expect(scope.dateMessage).toEqual("This field cannot be empty");
		});
	});

});
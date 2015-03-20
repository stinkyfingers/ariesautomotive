'use strict';

describe('Warranties', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/warranties');
  });

  it('should have proper title text', function () {
    expect(browser.getTitle()).toEqual('Aries Automotive');
  });

  it('should have a drop down with multiple contact types', function(){
    expect(element(by.css('#country')).all(by.tagName("option")).count()).toBeGreaterThan(1);
  });
});

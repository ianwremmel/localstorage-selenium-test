'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var wd = require('wd');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromises = wd.transferPromises;

var browsers = [
  'chrome',
  'firefox'
];

browsers.forEach(function(browserName) {
  describe('Local Storage in ' + browserName, function() {
    this.timeout(20*1000);

    var browser;
    before(function() {
      browser = wd.promiseChainRemote();
      return browser.init({
        browserName: browserName
      });
    });

    after(function() {
      return browser
        .quit();
    });

    it('sets a value in localStorage', function() {
      return browser
        .get('http://127.0.0.1:3000')
        .setLocalStorageKey('e', '2.718')
        .getLocalStorageKey('e')
          .should.eventually.equal('2.718');
    });

    it('sets value in localStorage accessible after page reload', function() {
      return browser
        .get('http://127.0.0.1:3000')
        .setLocalStorageKey('pi', '3.14')
        .get('http://127.0.0.1:3000')
        .getLocalStorageKey('pi')
          .should.eventually.equal('3.14');
    });
  });
});

'use strict';

/* jasmine specs for controllers go here */

describe('Main Controller', function () {
    var main;

    beforeEach(function () {
        main = new Main();
    });

    it('should return true if the url matches the given route', function () {

        inject(function ($location) {

        });

        browser().navigateTo('../../app/index.html');

    });
});


describe('MyCtrl2', function () {
    var myCtrl2;


    beforeEach(function () {
        myCtrl2 = new MyCtrl2();
    });


    it('should ....', function () {
        //spec body
    });
});

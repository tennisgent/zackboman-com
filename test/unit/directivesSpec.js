'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    beforeEach(module('zb.directives'));

    describe('Directives', function () {
        var scope, $compile;
        beforeEach(inject(function(_$rootScope_, _$compile_, $injector){
            scope = _$rootScope_;
            $compile = _$compile_;
        }));

        it('should add role="progressbar" to the given element', function () {
            var elem = $compile('<span ng-progress-bar="80"></span>')($rootScope);
            expect(element(elem).attr('role')).toBe("progressbar");
        });

        it('should add role="progressbar" to the given element', function () {
            var elem = $compile('<span ng-progress-bar="80"></span>')($rootScope);
            expect(element(elem).attr('role')).toBe("progressbar");
        });

    });
});

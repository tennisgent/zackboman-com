'use strict';

/* Directives */


angular
    .module('zb.directives', [])
    .directive('ngProgressBar', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngProgressBar, function(value) {
                $(element).progressbar({
                    value: parseInt(attrs.ngProgressBar)
                });
            });
        };
    })
    .directive('pdfViewer', function() {
        return function(scope, element, attrs) {
            $(element).css("height",($(window).height() - 150)+"px");
            new PDFObject({
                url: attrs.pdfViewer
            }).embed(element[0].id);

        }
    })
    .directive('ngTooltip', function() {
        return function(scope, element) {
            $(element).tipsy();
        }
    })
    .directive('ngModal', function() {
        return function(scope, element, attrs) {
            $('#modal-image').attr("src", attrs.ngModal);
            $(element).attr("href","#modal_window").fancybox();
        }
    })
    .directive('ngMasonry', function($timeout) {
        return function(scope, element, attrs) {
            $timeout(function(){
                $(element).addClass("masonry-container");
                $(element).children().addClass("masonry-inner");
            }, 100);
        }
    })
    .directive('onEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.onEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    })
;

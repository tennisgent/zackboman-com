'use strict';

/* Services */
angular
    .module('zb.services', [])
    .factory('Email', ['$http','Notify', function($http, Notify){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var check = function(email){
            return !(!email || !re.test(email));
        };
        return {
            send: function(emails, callback){
                console.log(emails);
                for(var i=0; i<emails.length; i++){
                    if(!check(emails[i])){
                        Notify(
                            "Email was invalid",
                            "It looks like the email address you entered was invalid. Please try again.",
                            true,
                            "notify-error",
                            5000
                        );
                        return false;
                    }
                }
                $http.post('/email', {recipients: emails})
                    .success(function(resp){
                        Notify(
                            "Your email has been sent",
                            "An email has been sent to " + emails[0] + " with an attached copy of my resume and contact info.",
                            true,
                            "notify-success",
                            5000
                        );
                        callback(resp);
                    }
                );
            },
            check: check,
            vcard: function(email, path, callback){
                if(!check(email)){
                    Notify(
                        "Email was invalid",
                        "It looks like the email address you entered was invalid. Please try again.",
                        true,
                        "notify-error",
                        5000
                    );
                    return false;
                }
                $http.post('/vcard', {recipients: [email], filePath: path})
                    .success(function(resp){
                        Notify(
                            "Your email has been sent",
                            "An email has been sent to " + email + " with an attached copy of the vCard file",
                            true,
                            "notify-success",
                            5000
                        );
                        callback(resp);
                    }
                );
            }
        }
    }])
    .factory('Notify', function(){
        return function(title, subtitle, autodismiss, type, time){
            $("#notify-title").text(title);
            $("#notify-subtitle").text(subtitle);
            window.scrollTo(0,0);
            var div = $("#notify-top");
            div.removeClass();
            div.addClass(type || "notify-warning");
            setTimeout(function(){
                div.slideDown("slow");
                div.children("a").on("click",function(e){
                    e.preventDefault();
                    $("#notify-top").slideUp("slow");
                });
                if(autodismiss){
                    setTimeout(function(){
                        $("#notify-top").slideUp("slow");
                    }, time || 3000);
                }
            }, 750);
        };
    })
    .factory('Intro', function(){
        var intro = {};

        intro.active = false;
        intro.content = "";

        document.ontouchmove = function(e){
            if(intro.active) e.preventDefault();
        };

        intro.addCanvas = function(){
            intro.active = true;
            var c = document.getElementById("intro-canvas");
            c.width = $(window).width();
            c.height = $(window).height() + 200;
            var context = c.getContext('2d');
            context.fillStyle = "black";
            context.fillRect(0,0, c.width, c.height);
            $(c).fadeIn();
            c.onclick = intro.end;
        };

        intro.clearArc = function(){
            if(arguments.length > 0){
                var c = document.getElementById("intro-canvas");
                var context = c.getContext('2d');
                context.fillStyle = "black";
                context.fillRect(0,0, c.width, c.height);
                context.save();
                context.globalCompositeOperation = 'destination-out';
                $.each(arguments, function(i, elem){
                    elem = $(elem);
                    if(elem.length > 0 && elem.is(":visible")){
                        var pos = elem.offset();
                        var x = pos.left + (elem.outerWidth(true)/2);
                        var y = pos.top + (elem.outerHeight(true)/2);
                        var radius = (elem.outerWidth(true)/2) + 10;
                        console.log(x, y, radius);
                        context.beginPath();
                        context.arc(x,y,radius,0,2*Math.PI,false);
                        context.fill();
                    }else{
                        console.log("'" + JSON.stringify(elem) + "' could not be highlighted");
                    }
                });
                context.restore();
            }else{
                console.log("no elements to clearArc");
            }
        };

        intro.clearRect = function(){
            if(arguments.length > 0){
                var c = document.getElementById("intro-canvas");
                var context = c.getContext('2d');
                context.fillStyle = "black";
                context.fillRect(0,0, c.width, c.height);
                $.each(arguments, function(i, elem){
                    elem = $(elem);
                    if(elem.length > 0){
                        var pos = elem.offset();
                        var x = pos.left;
                        var y = pos.top;
                        var width = elem.outerWidth(true);
                        var height = elem.outerHeight(true);
                        context.clearRect(x,y,width,height);
                    }else{
                        console.log("'" + JSON.stringify(elem) + "' could not be highlighted");
                    }
                });
                context.restore();
            }else{
                console.log("no elements to clearArc");
            }
        };

        intro.end = function(){
            $("#intro-textbox").fadeOut();
            $("#intro-canvas").fadeOut();
            intro.active = false;
            var pages = {};
            try{
                pages = JSON.parse(localStorage['intros_completed']);
            }catch(e){}
            pages[window.location.hash] = true;
            localStorage['intros_completed'] = JSON.stringify(pages);
        };

        intro.okToStart = function(){
            var pages = {};
            try{
                pages = JSON.parse(localStorage['intros_completed']);
            }catch(e){}
            return pages[window.location.hash] != true;
        };

        intro.next = function(){
            console.log("You tapped the next button");
        };

        intro.textBox = function(title, text, content, button){
            var box = $("#intro-textbox");
            if(title) box.find("#intro-title").text(title);
            if(title) box.find("#intro-description").text(text);
            if(content) box.find("#intro-content").text(content);
            if(button) box.find("#intro-next-btn").text(button);
            var x = ($(window).width()/2) - (box.width()/2) - 20;
            var y = ($(window).height()/2) - (box.height()/2) - 20;
            if(y < 130) y = 130;
            box.css("left", x+"px");
            box.css("top", y+"px");
            box.fadeIn();
        };

        intro.showBox = function(selector, options){
            var box = $(selector);
            if(box.length){
                for(var key in options){
                    if(options.hasOwnProperty(key)){
                        $(key).html(options[key]);
                    }
                }
                var x = ($(window).width()/2) - (box.width()/2) - 20;
                var y = ($(window).height()/2) - (box.height()/2) - 20;
                box.css("left", x+"px");
                box.css("top", y+"px");
                box.fadeIn();
            }
        };

        intro.centerBox = function(selector, minHeight){
            var box = $(selector);
            if(box.length){
                var x = ($(window).width()/2) - (box.width()/2) - 20;
                var y = ($(window).height()/2) - (box.height()/2) - 20;
                if(y < minHeight) y = minHeight;
                box.css("left", x+"px");
                box.css("top", y+"px");
            }
        };

        return intro;
    })
    .factory('Util', function(){
        return {
            isMobile: function(){
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            },
            isApple: function(){
                return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
            }
        }
    })
;
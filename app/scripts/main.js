/**
 * Created with JetBrains WebStorm.
 * User: aboutone
 * Date: 1/17/13
 * Time: 9:12 PM
 * To change this template use File | Settings | File Templates.
 */
var TB = TB || {};
TB.util = (function() {
    var util = {};

    util.isDev = function(){
        return window.location.href.indexOf("localhost") != -1;
    }

    util.alert = function(text, title, color, time){
        console.log("alert");
        var notify = $("#notify-container");
        if(color){
            notify.addClass(color);
        }
        if(title){
            $("#notify-title").text(title);
        }
        $("#notify-text").text(text);
        notify.slideDown();
        if(time != 0){
            setTimeout(function(){
                notify.slideUp();
            }, time || 3500);
        }
        $(notify.find(".close")).click(function(e){
            e.preventDefault();
            notify.slideUp();
        });
    }

    util.log = function(val, toStr){
        if(util.isDev()){
            if(toStr && typeof(val) == 'object'){
                val = JSON.stringify(val);
            }
            console.log(val);
        }
    }

    util.str = function(obj,tab){
        if(tab){
            return JSON.stringify(obj,null,tab);
        }
        return JSON.stringify(obj);
    }

    util.loading = function(bool){
        if(bool){
            $("#loader").show();
        }else{
            $("#loader").hide();
        }
    }

    return util;
})();

TB.nav = (function(){
    var nav = function(page){
        $("#main_content").load(page+".html",function(){
            $.getScript("scripts/"+page+".js",function(data){

            });
        });
    };

    nav.page = {
        LOGIN: "login",
        INDEX: "index"
    };

    nav.menu = function(bool){
        if(bool){
            $("#sidebar").show();
        }else{
            $("#sidebar").hide();
        }
    };

    return nav;
})();

TB.store = (function() {
    var store = {};
    store.set = function(key, val){
        if(typeof(val) == 'object'){
            val = JSON.stringify(val);
        }
        localStorage[key] = val;
    }
    store.exists = function(key){
        return (localStorage[key] != "undefined");
    }
    store.get = function(key){
        var result = localStorage[key];
        try{
            result = JSON.parse(result);
        }catch(e){}
        return result;
    }
    store.del = function(key){
        localStorage.removeItem(key);
    }
    store.all = function(){
        var keys = [];
        for(var i=0; i<localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            keys.push({key: value});
        }
        return keys;
    }
    store.cache = function(key,val){
        if(val){
            var blob = (store.get("tb_cache") || {});
            blob[key] = val;
            store.set("tb_cache", blob);
            return val;
        }else{
            var blob = (store.get("tb_cache") || {});
            return blob[key];
        }
    }
    var prefDefaults = {

    };
    store.prefs = function(key,val){
        if(key === "RESET"){
            store.set("tb_prefs", prefDefaults);
            return "";
        }
        var blob = (store.get("tb_prefs") || {});
        if(val !== undefined){
            blob[key] = val;
            store.set("tb_prefs", blob);
            return val;
        }else{
            return (blob[key] || prefDefaults[key] || "");
        }
    }
    return store;
})();

TB.ajax = (function(){
    var ajax = {};

    var call = function(url,data,win,verb){
        $.ajax({
            "type" : verb || "GET",
            "dataType" : "json",
            "contentType" : "application/json; charset=utf-8",
            "accepts" : "json",
            "url" : url,
            "data" : data || {},
            "success" : function(resp) {
                if(resp.errorCode == 0){
                    win(resp);
                }else{
                    TB.util.log("API ERROR: " + TB.util.str(resp));
                    TB.util.alert(
                        "Looks like there was an error: " + resp.errorMessage,
                        "Connection Error",
                        "red"
                    );
                }
            },
            "error": function(resp){
                TB.util.log("AJAX ERROR: " + TB.util.str(resp));
                fail(resp);
            }
        });
    }

    ajax.get = function(params){
        call(
            params.url || ajax.url(params.api),
            params.data,
            params.win,
            "GET"
        );
    }

    ajax.put = function(url,win,data){
        call(
            params.url || ajax.url(params.api),
            params.data,
            params.win,
            "PUT"
        );
    }

    ajax.post = function(url,win,data){
        call(
            params.url || ajax.url(params.api),
            params.data,
            params.win,
            "POST"
        );
    }

    ajax.delete = function(url,win,data){
        call(
            params.url || ajax.url(params.api),
            params.data,
            params.win,
            "DELETE"
        );
    }

    ajax.url = function(api,params){
        var host = TB.util.isDev() ? "http://tinyb.aws.af.cm/" : "http://localhost:8080/";
        api = host + api + "?cache=" + new Date().getTime();
        if(params){
            for(var key in params){
                if(params.hasOwnProperty(key))
                    api += "&" + key + "=" + params[key];
            }
        }
        return api;
    }

    return ajax;
})();
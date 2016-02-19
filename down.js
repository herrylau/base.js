$(function(){
    var ua = navigator.userAgent,
        platform = {};
        platform.android = ua.indexOf("Android") > -1,
        platform.iPhone = ua.indexOf("iPhone") > -1 ,
        platform.iPad = ua.indexOf("iPad") > -1 ,
        platform.iPod = ua.indexOf("iPod") > -1,
        platform.winPhone = ua.indexOf("IE") > -1 ,
        platform.IOS = platform.iPad || platform.iPhone || platform.iPod,
        platform.touchDevice = "ontouchstart" in window;

    var type = "PC";
    if( platform.android ) {
        type = "ANDROID";
    }else if( platform.IOS ) {
        type = "IOS";
    }else if( platform.winPhone ) {
        type = "WP";
    };

    function down(){
        if( type == 'IOS' ) {
            // window.location.href="https://itunes.apple.com/cn/app/id1031157485?mt=8";
            window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.csn.myhome&g_f=991653";
        }else{
            window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.csn.myhome&g_f=991653";
        };
    }
    var isWeiXin = function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    };
    var down_fn = function(){
        if( isWeiXin() ){
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.csn.myhome&g_f=991653";
        }else{
            down();
        }
    }
    binderEvent($('body'),'.maskbox','click',function(){
        $('.tip-ios').hide();
        $('.tip-andriod').hide();
        $('.maskbox').hide();
    });
    binderEvent($('body'),'.btn-downApp','click',function(){
        down_fn();
    });
});
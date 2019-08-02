$(function(){
    window.addEventListener("devicemotion", function(event) {
        var x  = parseFloat(event.accelerationIncludingGravity.x);
        if (isNaN(x)) x = 0.0;
        console.log("Get Tlit");
        /*
           iosとAndroidとで、向きが逆。
           基準はどちらでも良いが、端末を上から見て、
             x:右方向
             y:上方向
             z:手前方向
            を正とするなら、iOS側を補正する。
        */
       var userAgent = window.navigator.userAgent
        if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
          x *= -1;
        }
        if (Math.abs(x) > 1.0) {
            $("#tlit").text(x.toString());
        }
    }, false)
});
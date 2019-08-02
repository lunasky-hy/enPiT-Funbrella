$(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var geo_text = "緯度:" + position.coords.latitude + "<br />";
            geo_text += "経度:" + position.coords.longitude + "<br />";
            geo_text += "高度:" + position.coords.altitude + "<br />";
            geo_text += "位置精度:" + position.coords.accuracy + "<br />";
            geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "<br />";
            geo_text += "移動方向:" + position.coords.heading + "<br />";
            geo_text += "速度:" + position.coords.speed + "<br />";
        
            var date = new Date(position.timestamp);
            console.log("Get Location");
        
            geo_text += "取得時刻:" + date.toLocaleString() + "\n";
        
            $("#weather").html(geo_text);

            getWeather(position.coords.latitude, position.code.longitude);

        }, function(error){
            console.log("現在地の取得に失敗しました:" + error.code);
            $("#weather").text("現在地の取得に失敗");
        }, {
            "enableHighAccuracy": false ,
            "timeout": 8000 ,
            "maximumAge": 5000 ,
        });

    // Geolocation APIに対応していない
    } else {
        alert("この端末では位置情報が取得できません");
    }

});

function getWeather(latitude, longitude){

}
$(function(){
  document.querySelector('#start').addEventListener('click',function(e){
    e.preventDefault();
    var count = 6;
    var id = setInterval(function(){
      count--;
      $('#timer').text(count);
      if(count <= 0) {
        clearInterval(id);
        transition()
      }
    },1000);
  });
})

function transition(){
  var weatherid = $('#weather').text();
  var url = "/" + convertUrlParam(weatherid) + "/" + convertUrlParam(weatherid) + ".html";
  document.location.href = url;
}

function convertUrlParam(id_text){
  var id = parseInt(id_text);
  if (200 <= id && id <= 623){
    return "rain";
  }
  else if(800 <= id && id <= 803){
    return "sunny";
  }
  else if(id == 804){
    return "cloud";
  }
  else{
    return "default";
  }
}

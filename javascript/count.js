window.onload=function(){
  document.querySelector('#start').addEventListener('click',function(e){
    e.preventDefault();
    var count = 6;
    var id = setInterval(function(){
      count--;
      document.querySelector('#timer').textContent=count;
      if(count <= 0) clearInterval(id);
    },1000);
  });
}
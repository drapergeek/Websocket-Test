function change_page_color(color){
  $("body").css("background-color", color);
}

function send_push(command){
  $.ajax({
    url: "/push/" + escape(command) 
  });
}

function send_random_color(){
   color = '#'+Math.floor(Math.random()*16777215).toString(16);
   send_push(color);
}

function setup_pusher(){
  var pusher = new Pusher('d141f03421d0c08db875');
  var channel = pusher.subscribe('colors');
  channel.bind('change', function(data) {
    change_page_color(color);
  });
}


$(function($) {
  setup_pusher();

  $('#send-change').submit(function() {
    textBox = $("#send-change-text");
    if (textBox.val()=="") {
      alert("You must enter a command!");
    }
    else{
      send_push(textBox.val());
    };
    textBox.val("");
    return false;
  });


  $("#show-admin").click(function(){
    $("#send-change").show();
    $("#show-admin").hide();
  });

  $("#random-color").click(function(){
    send_random_color();
    return false;
  });

});

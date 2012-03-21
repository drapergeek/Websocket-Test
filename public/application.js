function change_page_color(color){
  $("body").css("background-color", color);
}

function send_push(command){
  $.ajax({
    url: "/push/" + command 
  });
}

function random_color(){
   return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function send_random_color(){
   color = random_color();
   send_push(escape(color));
}

function send_random_fade(){
  from_color = random_color();
  to_color = random_color();
  delay = 5000;

  data = "from_color=" + escape(from_color) + "&to_color=" + escape(to_color) + "&delay=" + escape(delay)
  $.ajax({
    url: "/fade",
    data: data
  });
}

function setup_pusher(){
  var pusher = new Pusher('d141f03421d0c08db875');
  var channel = pusher.subscribe('colors');
  channel.bind('change', function(data) {
    change_page_color(data.message);
  });

  channel.bind('events', function(data){
    if (data.event == "fade") {
      fadeInBox(data.options.from_color, data.options.to_color, parseInt(data.options.delay));
    };
  });
}

function fadeInBox(from_color, to_color, delay){
  $("#box2").hide();
  $("#box1").css("background-color", from_color);
  $("#box2").css("background-color", to_color);
  $("#box1").show();
  $("#box2").fadeIn(delay);
  $("#box1").fadeOut(delay);
}

$(function($) {

  setup_pusher();

  $("#show-admin").click(function(){
    $("#send-change").show();
    $("#show-admin").hide();
  });

  $("#random-color").click(function(){
    send_random_color();
    return false;
  });

  $("#random-fade").click(function(){
    send_random_fade();
  });

});

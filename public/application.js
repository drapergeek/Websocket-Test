var ws;
function adminChangeColor(color){
  ws.send("change: " + color);
}

function change(color){
  $("body").css("background-color", color);
}

function socket() {
  socket = new WebSocket("ws://ui.thoughtbot.com:9000");
  socket.onmessage = function(event) {
    console.log(event.data);
    var command = event.data.split(": ");
    var method = command[0];
    var param = command[1];
    window[method](param);
  };
  return socket;
}

function ping(time){
  console.log("ping: " + time);
}

function ping_loop(socket){
  setTimeout(function(){
    socket.send("ping: " + new Date());
    ping_loop(socket);
  }, 1000);
}


$(function($) {
  ws = socket();
  //ping_loop(ws);

  $('#send-change').submit(function() {
    textBox = $("#send-change-text");
    $.ajax({
      url: "/push/" + textBox.val()
    });
    textBox.val("");
    return false;
  });

  $("#show-admin").click(function(){
    $("#send-change").show();
    $("#show-admin").hide();
  });

});

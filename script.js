// Set up the timer class

$(document).ready(function () {
  // Connect to WebSocket
  function start() {
    
    var client = new WebSocket("wss://ThirstyNeglectedVideogame.draguwro.repl.co");

    client.onopen = () => {
      console.log("Connection to server established!");
    };

    const MessageList = $("#message-list");
    client.onmessage = async (msg) => {

      const Message = JSON.parse(msg.data);

      MessageList.append("<div" + (Message.isOwner ? " class='owner'" : (Message.isMod ? " class='mod'" : "")) + ">" + (Message.isOwner ? "🐲 " : (Message.isMod ? "🔨 " : "")) + Message.author.name + ": <span>"+ Message.message[0].text + "</span></div>");

      $("#message-list-container").scrollTop(function() { return this.scrollHeight; });

      console.log("done")
    };

    client.onclose = async () => {
      start();
    };

  };

  start();
});
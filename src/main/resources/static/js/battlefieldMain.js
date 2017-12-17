(function(){
    console.log("Initializing game instance");
    
    var stompClient = {};
        
    battlefield = new Battlefield('battlefieldCanvas');
    
    window.addEventListener('DOMContentLoaded', function(){
        battlefield.init();
        addGameObjects();
    });
    
    window.addEventListener('resize', function () {
        battlefield.engine.resize();
    });
    
    function addGameObjects() {
        // battlefield.addCube(20, 20, 0);
//        battlefield.addPawn("initialPawn", 0, 0);
//        battlefield.addRipple(4, 4);
    }
    
    connect = function(){
        $('#disconnectButton').attr("disabled", "false");
        $('#connectButton').attr("disabled", "disabled");
        console.log("connecting to the WebSocket controller");
        var socket = new SockJS('/battlefield');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnectionEstablished);
        battlefield.stompClient = stompClient;
    };
    
    onConnectionEstablished = function(frame) {
        console.log("Connected to '/battlefield', frame = :", frame);
        stompClient.subscribe("/topic/battlefield", onMessageReceived);
        var username = $('#username').val();
        battlefield.username = username;
        battlefield.sendAddMyPlayerMessage(stompClient);
//        var pawn = battlefield.addPlayerPawn(username, 0, 0);
//        battlefield.sendProbeMessage("username: " + username);
    };
    
    onMessageReceived = function(message){
        console.log("received a message: ", message);
        battlefield.handleMessage(message);
    };
    
    disconnect = function () {
        $('#disconnectButton').attr("disabled", "disabled");
        $('#connectButton').attr("disabled", "false");
        if (!!stompClient) {
            stompClient.disconnect();
            battlefield.stop();
            stompClient = null;
        }
        console.log("Disconnected");
    };
    
})();
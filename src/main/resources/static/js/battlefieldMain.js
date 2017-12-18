(function(){
    console.log("Initializing game instance");
    
    var SYNC_TIMEOUT_MILLIS = 2000;
    
    var stompClient = {};
        
    battlefield = new Battlefield('battlefieldCanvas');
    
    window.addEventListener('DOMContentLoaded', function(){
        battlefield.init();
    });
    
    window.addEventListener('resize', function () {
        battlefield.engine.resize();
    });
    
    function sync(){
        battlefield.sendSyncCommand();
        setTimeout(sync, SYNC_TIMEOUT_MILLIS);
    };
    
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
        setTimeout(sync, SYNC_TIMEOUT_MILLIS);
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
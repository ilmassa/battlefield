(function(){
    console.log("Initializing game instance");
    
    var SYNC_TIMEOUT_MILLIS = 2000;
    var SERVER_CONTEXT_PATH = "/battlefield3d";
    
    var stompClient = {};
        
    // TODO: make the second argument (servercontextPath) not hardcoded...
    battlefield = new Battlefield('battlefieldCanvas', SERVER_CONTEXT_PATH);
    
    window.addEventListener('DOMContentLoaded', function(){
        battlefield.init();
        connect();
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
        var socket = new SockJS(SERVER_CONTEXT_PATH + '/battlefield');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnectionEstablished);
        battlefield.stompClient = stompClient;
    };
    
    onConnectionEstablished = function(frame) {
        console.log("Connected to '/battlefield', frame = :", frame);
        stompClient.subscribe("/topic/battlefield", onMessageReceived);
        var username = frame.headers["user-name"];
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
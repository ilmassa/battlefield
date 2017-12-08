(function(){
    var welcomeBanner = " __    __     _                                  \n" +
"/ / /\\ \\ \\___| | ___ ___  _ __ ___   ___         \n" +
"\\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\        \n" +
" \\  /\\  /  __/ | (_| (_) | | | | | |  __/        \n" +
"  \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|        \n" +
"                                                 \n" +
" _          _   _                                \n" +
"| |_ ___   | |_| |__   ___                       \n" +
"| __/ _ \\  | __| '_ \\ / _ \\                      \n" +
"| || (_) | | |_| | | |  __/                      \n" +
" \\__\\___/   \\__|_| |_|\\___|                      \n" +
"                                                 \n" +
"   ___       _   _   _        ___ _      _     _ \n" +
"  / __\\ __ _| |_| |_| | ___  / __(_) ___| | __| |\n" +
" /__\\/// _` | __| __| |/ _ \\/ _\\ | |/ _ \\ |/ _` |\n" +
"/ \\/  \\ (_| | |_| |_| |  __/ /   | |  __/ | (_| |\n" +
"\\_____/\\__,_|\\__|\\__|_|\\___\\/    |_|\\___|_|\\__,_|\n" +
"                                                 ";
    console.log(welcomeBanner);
    var stompClient = {};
    
    Battlefield = {
        self: this,
        version: "0.1",
                
        connect: function(){
            console.log("connecting to the WebSocket controller");
            var socket = new SockJS('/battlefield');
            stompClient = Stomp.over(socket);
//            stompClient.connect({}, function(frame){
//                console.log("Connected to '/battlefield', frame = :", frame);
//                stompClient.subscribe("/topic/battlefield", function(message){
//                    console.log("Message recevied from '/topic/battlefield': ", message);
//                });
//            });
            stompClient.connect({}, Battlefield.onConnectionEstablished);
        },
        
        onConnectionEstablished: function (frame) {
            console.log("Connected to '/battlefield', frame = :", frame);
            stompClient.subscribe("/topic/battlefield", Battlefield.onMessageReceived);
            var username = $('#username').val();
            Battlefield.sendProbeMessage("username: " + username);
        },
        
        onMessageReceived: function (message) {
            console.log("Message recevied from '/topic/battlefield': ", message);
        },
        
        sendProbeMessage: function(text){
            stompClient.send('/app/probe-command', {}, text);
        },
        
        disconnect: function () {
            if (!!stompClient) {
                stompClient.disconnect();
            }
            console.log("Disconnected");
        }
    };

    $(document).ready(function () {
        console.log("Registering click handlers");
        $('#connect').click(function () {
            console.log("connect clicked");
            Battlefield.connect();
        });

        $('#disconnect').click(function () {
            console.log("disconnect clicked");
            Battlefield.disconnect();
        });
    });


})();
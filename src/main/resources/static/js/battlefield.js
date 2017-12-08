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
        
        username: null,
        
        pawns: {},
                
        connect: function(){
            console.log("connecting to the WebSocket controller");
            var socket = new SockJS('/battlefield');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, Battlefield.onConnectionEstablished);
        },
        
        onConnectionEstablished: function (frame) {
            console.log("Connected to '/battlefield', frame = :", frame);
            stompClient.subscribe("/topic/battlefield", Battlefield.onMessageReceived);
            var username = $('#username').val();
            Battlefield.username = username;
            var pawn = document.createElement("div");
            pawn.id = username;
            var randomColor = Battlefield.randomColor();
            pawn.style = "background-color: " + randomColor + "; height: 20px; width: 20px; position: absolute;";
            document.body.appendChild(pawn);
            Battlefield.sendProbeMessage("username: " + username);
        },
        
        randomColor: function(){
            return "rgb(" + Battlefield.random255() + ", " 
                    + Battlefield.random255() + ", "
                    + Battlefield.random255() + ")";
        },
        
        random255: function(){
            return Math.floor(Math.random() * 255);
        },
        
        onMessageReceived: function (message) {
            // console.log("Message recevied from '/topic/battlefield': " + message);
            var payload = JSON.parse(message.body);
            var element = $('#' + payload.username);
            if(element.length === 0){
                var othePlayerPawn = document.createElement("div");
                othePlayerPawn.id = payload.username;
                var randomColor = Battlefield.randomColor();
                othePlayerPawn.style = "background-color: " + randomColor + "; height: 20px; width: 20px; position: absolute;";
                document.body.appendChild(othePlayerPawn);
                element = $('#' + payload.username);
            }
            console.log("moving element => ", element);
            element.offset({top: payload.y, left: payload.x});
        },
        
        sendProbeMessage: function(text){
            stompClient.send('/app/probe-command', {}, text);
        },
        
        disconnect: function () {
            if (!!stompClient) {
                stompClient.disconnect();
                $('#' + Battlefield.username).remove();
                stompClient = null;
            }
            console.log("Disconnected");
        },
        
        onCanvasMouseMove: function(mouseEvent){
            //normalize coordinates
            
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
        
        $(document).keypress(function(event){
            var keyCode = event.keyCode;
            // w => 119
            // a => 97
            // s => 115
            // d => 100
            var incrementX = 0;
            var incrementY = 0;
            var coeff = 2;
            if(keyCode === 119){
                incrementY = -1 * coeff;
            }
            if(keyCode === 97){
                incrementX = -1 * coeff;
            }
            if(keyCode === 115){
                incrementY = coeff;
            }
            if(keyCode === 100){
                incrementX = coeff;
            }
            
            var pawn = $('#' + Battlefield.username);
            var position = pawn.offset();
            var nextPosition = {top: position.top + incrementY, left: position.left + incrementX};
            // pawn.offset(nextPosition);
            if(!!stompClient && !!stompClient.send){
                var positionObject = {username: Battlefield.username, x: nextPosition.left, y: nextPosition.top};
                var positionSerialized = JSON.stringify(positionObject);
                stompClient.send('/app/move', {}, positionSerialized);
            }
        });
        
        /*
        $(document).mousemove(function(event){
            var clientX = event.clientX;
            var clientY = event.clientY;
            // console.log(event);
            $('#position').val("(" + clientX + ", " + clientY + ")");
            $('#pawn').offset({top: clientY, left: clientX});
            if(!!stompClient && !!stompClient.send){
                var positionObject = {username: Battlefield.username, x: clientX, y: clientY};
                var positionSerialized = JSON.stringify(positionObject);
                stompClient.send('/app/move', {}, positionSerialized);
            }
        }); /* */ 
    }); // document.ready
    
    

})();
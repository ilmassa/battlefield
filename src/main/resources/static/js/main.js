Streamer = {};

Streamer.Graph = {};
Streamer.Graph.lastX = 0;
Streamer.Graph.lastY = 0;
Streamer.Graph.points = [];

Streamer.init = function ()
{
    console.log("Here we go...!");
};

Streamer.connect = function connect() 
{
    Streamer.canvas = document.getElementById("canvas");
    Streamer.context = Streamer.canvas.getContext("2d");
    var socket = new SockJS('/stream');
    Streamer.stompClient = Stomp.over(socket);
    Streamer.stompClient.connect({}, function (frame) {
        Streamer.setConnected(true);
        console.log('Connected: ' + frame);
        Streamer.stompClient.subscribe('/topic/stream', function (message) {
            /* showGreeting(JSON.parse(greeting.body).content); */
            Streamer.plotNextStreamSample(message.body);
        });
    });
};

Streamer.disconnect = function() {
    if (!!Streamer.stompClient) {
        Streamer.stompClient.disconnect();
    }
    Streamer.setConnected(false);
    console.log("Disconnected");
};

Streamer.plotNextStreamSample = function(sample)
{
    var nextX = Streamer.Graph.lastX + 2;
    Streamer.plotSample(nextX, sample);
};

Streamer.plotSample = function(x, y)
{
    if(Streamer.Graph.points.length === 0 || x >= 800)
    {
        Streamer.context.clearRect(0, 0, 800, 500);
        Streamer.context.beginPath();
        Streamer.context.moveTo(0, 0);
        x = 0;
    }  
    console.log("line to: (" + x + ", " + y + ")");
    Streamer.drawLine(Streamer.Graph.lastX, Streamer.Graph.lastY, x, y * 500);
    Streamer.Graph.lastX = x;
    Streamer.Graph.lastY = y;
    Streamer.Graph.points.push({x: x, y: y});
};

Streamer.drawLine = function(x1, y1, x2, y2)
{
    Streamer.context.lineTo(x2, y2);
    Streamer.context.stroke();
};

Streamer.setConnected = function (connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
//    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
//    document.getElementById('response').innerHTML = '';

    

};

Streamer.init();
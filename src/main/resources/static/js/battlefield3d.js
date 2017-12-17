(function () {
    console.log("Battlefield 3D: initializing environment...");
    var B = BABYLON;
    
    this.stompClient = {};
    
    Battlefield = function(canvasId){
        this.canvasId = canvasId;
        this.ripples = [];
        this.pawns = {};
        this.playerPawn = {};
    };
    
    Battlefield.prototype.init = function () {
        var canvas = document.getElementById(this.canvasId);
        this.canvas = canvas;
        var engine = new BABYLON.Engine(this.canvas, true);
        this.engine = engine;
        
        var innerScene = this.createScene();
        
        var self = this;
        innerScene.registerBeforeRender(function(){
            self.gameLoop();
        });
        
        innerScene.onPointerDown = function(event, pickResult){
//            console.log("event: ", event);
//            console.log("pickedResult: ", pickResult);
            if(pickResult.hit && event.button === 2){
                self.addRipple(pickResult.pickedPoint.x, pickResult.pickedPoint.z);
//                self.playerPawn.moveTo(pickResult.pickedPoint);
                self.sendMoveMyPawnCommand(pickResult.pickedPoint);
            }
        };
        
        this.engine.runRenderLoop(function () {
            innerScene.render();
        });
    };
    Battlefield.prototype.gameLoop = function(){
        for(var i = 0; i < this.ripples.length; i++){
            this.ripples[i].update();
        }
        for (var pawnName in this.pawns){
            var updatingPawn = this.pawns[pawnName];
            updatingPawn.update();
        }
    };
    
    Battlefield.prototype.createScene = function(){
        var self = this;
        this.scene = new B.Scene(this.engine);
        this.scene.__debugId = "scene01";
        //this.camera = new B.FreeCamera('camera', new BABYLON.Vector3(2, 10, -20), this.scene);
        this.camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 3, 50, BABYLON.Vector3.Zero(), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        var light = new B.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
        // Physics
        this.scene.enablePhysics(new B.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
//        this.scene.enablePhysics(new B.Vector3(0, -9.81, 0), new B.OimoJSPlugin());
        
        // Sphere cannonball test 
        var sphere = B.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 1}, this.scene);
        // move the sphere upward 1/2 of its height
        sphere.position.y = 4;
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass:  1 }, this.scene);;
        sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(.1, 15, 0));
        // Sphere cannonball test -- end

        // create a built-in "ground" shape; 
        var ground = B.Mesh.CreateGround('ground1', 40, 40, 2, this.scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.scene);
        
        // return the created scene
        return this.scene;
    };
    
    Battlefield.prototype.addCube = function(x, y, z){
        var name = "cube_" + Math.random();
        var cube = B.MeshBuilder.CreateBox(name, 6.0, this.scene);
        cube.position.y = 2;
        cube.physicsImpostor = new B.PhysicsImpostor(
                cube, B.PhysicsImpostor.BoxImpostor, {mass: 10, friction: 1, restitution: 1}, this.scene);
        return cube;
    };
    
    Battlefield.prototype.addRipple = function(x, z){
        console.log("Adding new ripple");
        var ripple = new Ripple(null, x, z, this.scene, this);
        this.ripples.push(ripple);
    };
    
    Battlefield.prototype.onRippleDead = function(ripple){
        console.log("rippleCallback: " + ripple);
        var found = null;
        for(var i = 0; i < this.ripples.length; i++){
            if(this.ripples[i] === ripple){
                found = i;
                break;
            }
        }
        if(found !== null){
            this.ripples.splice(found, 1);
        }
    };
        
    Battlefield.prototype.addPlayerPawn = function(name, x, z){
        console.log("Adding palyer pawn at: [" + x + ", " + z + "]");
        this.playerPawn = this.addOtherPawn(name, x, z);
        return this.playerPawn;
    };
    
    Battlefield.prototype.addOtherPawn = function(name, x, z){
        console.log("Adding generic pawn at: [" + x + ", " + z + "]");
        var pawn = new Pawn(name, x, z, this.scene, this);
        this.pawns[name] = pawn;
        return pawn;
    };
    
    Battlefield.prototype.stop = function(){
        console.log("TODO: Implement stop function");
    };
    
    Battlefield.prototype.sendAddMyPlayerMessage = function(stompClient){
        console.log("About to send addMessage to add current player");
        var message = {
            username: this.username,
            x: 0,
            y: 0
        };
        stompClient.send("/app/join", {}, JSON.stringify(message));
    };
    
    Battlefield.prototype.sendMoveMyPawnCommand = function(pickedPoint){
      var message = {
          username: this.username,
          x: pickedPoint.x,
          y: pickedPoint.z
      };  
      this.stompClient.send("/app/move", {}, JSON.stringify(message));
    };
    
    Battlefield.prototype.handleMessage = function(message){
        console.log("Battlefield handling message: ", message);
        var messagePayload = JSON.parse(message.body);
        var handlerFunction = Battlefield.messageHandlers[messagePayload.type];
        var self = this;
        return handlerFunction.call(self, messagePayload);
    };
    
    Battlefield.messageHandlers = {
        "add": function(payload){
            console.log("Add command handler: ", payload);
            if(payload.username === this.username){
                this.addPlayerPawn(payload.username, payload.x, payload.y);
                return;
            }
            this.addOtherPawn(payload.username, payload.x, payload.y);
        },
        
        "move": function(payload){
            console.log("Move command message: ", payload);
            var target = new BABYLON.Vector3(payload.x, 0, payload.y);
            if(!this.pawns.hasOwnProperty(payload.username)){
                console.log("Unknown player paws '%s'. The pawn will be added", payload.username);
                this.addOtherPawn(payload.username, 2, 2);
            }
            this.pawns[payload.username].moveTo(target);
        },
        
        "fire": function(payload){
            console.log("Fire command handler");
        }
    };

})();
(function () {
    console.log("Battlefield 3D: initializing environment...");
    var B = BABYLON;
    
    Battlefield = function(canvasId){
        this.canvasId = canvasId;
    };
    
    Battlefield.prototype.init = function () {
        var canvas = document.getElementById(this.canvasId);
        this.canvas = canvas;
        var engine = new BABYLON.Engine(this.canvas, true);
        this.engine = engine;
        
        var innerScene = this.createScene();
        
        this.engine.runRenderLoop(function () {
            innerScene.render();
        });
    };
    
    Battlefield.prototype.createScene = function(){
        this.scene = new B.Scene(this.engine);
        this.scene.__debugId = "scene01";
        //this.camera = new B.FreeCamera('camera', new BABYLON.Vector3(2, 10, -20), this.scene);
        this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 3, Math.PI / 3, 50, BABYLON.Vector3.Zero(), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        var light = new B.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
        // Physics
        this.scene.enablePhysics(new B.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
//        this.scene.enablePhysics(new B.Vector3(0, -9.81, 0), new B.OimoJSPlugin());
        
        // ---
        var sphere = B.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 1}, this.scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 2;
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass:  1 }, this.scene);;
        sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(.1, 20, 0));

        // create a built-in "ground" shape; 
        var ground = B.Mesh.CreateGround('ground1', 40, 40, 2, this.scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.scene);
        
        // return the created scene
        return this.scene;
    };

})();
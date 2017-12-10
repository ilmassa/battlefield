var B = BABYLON;
var INITIAL_RADIUS = .1;
var MAX_RIPPLE_SCALING = 15;
var SCALING_INCREMENT = 1.2;
(function () {
    Ripple = function (name, x, z, scene, listener) {
        this.mesh = {};
        this.name = name;
        this.scene = scene;
        this.listener = listener;
        this.scaling = 1;
        this.createMesh(x, z, scene);
    };

    Ripple.prototype.update = function () {
        if(this.scaling >= MAX_RIPPLE_SCALING){
            this.die();
        }
        var newScaling = this.scaling + SCALING_INCREMENT;
        this.scaling = newScaling;
        this.mesh.scaling.x = newScaling;
//        this.mesh.scaling.z = newScaling;
        this.mesh.scaling.y = newScaling;
        this.mesh.alpha /= 2;
    };
    
    Ripple.prototype.createMesh = function(x, z, scene){
        var discMesh = B.MeshBuilder.CreateDisc(this.name + "Disc", 
            {radius: INITIAL_RADIUS, tassellation: 64, sideOrientation: B.Mesh.DOUBLESIDE}, 
            scene);
        discMesh.position.x = x;
        discMesh.position.y = 0.1;
        discMesh.position.z = z;
        discMesh.rotation.x = Math.PI / 2;
        
        var material = new BABYLON.StandardMaterial("texture2", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0); //Red
        material.alpha = 1;
        discMesh.material = material;
        
        this.mesh = discMesh;
    };
    
    Ripple.prototype.die = function(){
        this.scene.removeMesh(this.mesh);
        if(this.listener && this.listener.onRippleDead && typeof(this.listener.onRippleDead) === 'function'){
            this.listener.onRippleDead(this);
        }
    };
    
})();
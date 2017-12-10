var B = BABYLON;
var PAWN_SIZE = 1;
var PAWN_MASS = 10;
(function(){
    
    Pawn = function(name, x, z, scene, listener){
        this.listener = listener;
        this.cubeMesh = {};
        this.cannonMesh = {};
        this.init(name, x, z, scene);
    };
    
    Pawn.prototype.init = function(name, x, z, scene){
        this.object = {};
        var cube = BABYLON.MeshBuilder.CreateBox(name,
            {size: PAWN_SIZE}, scene);
        cube.position.y = PAWN_SIZE / 2;
        cube.physicsImpostor = new B.PhysicsImpostor(
                cube, B.PhysicsImpostor.BoxImpostor, {mass: PAWN_MASS, friction: 1, restitution: 1}, this.scene);
        this.cubeMesh = cube;
    };
    
    Pawn.prototype.update = function(){
        console.log("Updating pawn " + this.name);
    };
    
    Pawn.prototype.die = function () {
        this.scene.removeMesh(this.object);
        if (this.listener && this.listener.onRippleDead && typeof (this.listener.onPawnDead) === 'function') {
            this.listener.onPawnDead(this);
        }
    };
      
})();
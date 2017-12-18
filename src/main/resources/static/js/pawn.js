var B = BABYLON;
var PAWN_SIZE = 1;
var PAWN_MASS = 10;
var PAWN_FRICTION = .05;
var PAWN_MAX_VELOCITY_MAGNITUDE = 1;
var PAWN_IMPULSE_SCALE_FACTOR = 20;
(function(){
    
    Pawn = function(name, x, z, scene, listener){
        this.listener = listener;
        this.cubeMesh = {};
        this.cannonMesh = {};
        this.targetPosition = false;
        this.moving = false;
        this.init(name, x, z, scene);
    };
    
    Pawn.prototype.init = function(name, x, z, scene){
        this.object = {};
        var cube = BABYLON.MeshBuilder.CreateBox(name,
            {size: PAWN_SIZE}, scene);
        cube.position.y = PAWN_SIZE / 2;
        
        var material = new B.StandardMaterial(name + "_material", scene);
        material.diffuseColor = new B.Color3(Math.random(), Math.random(), Math.random());
        cube.material = material;
        
        cube.physicsImpostor = new B.PhysicsImpostor(
                cube, B.PhysicsImpostor.BoxImpostor, {mass: PAWN_MASS, friction: PAWN_FRICTION, restitution: 1}, this.scene);
        this.cubeMesh = cube;
    };
    
    Pawn.prototype.update = function(){
        if(this.cubeMesh.position.y < 0){
            // falling into infinity
            // this.respawn();
            this.cubeMesh.position = new B.Vector3(0, 2, 0);
            this.cubeMesh.physicsImpostor.setLinearVelocity(B.Vector3.Zero());
        }
        if(!!this.targetPosition){
            var targetPositionVector = new B.Vector3(this.targetPosition.x, 0, this.targetPosition.z);
            var positionGroundProjection = new B.Vector3(this.cubeMesh.position.x, 0, this.cubeMesh.position.z);
            var forceVersor = targetPositionVector.subtract(positionGroundProjection).normalize();
            var forceVector = forceVersor.scaleInPlace(PAWN_IMPULSE_SCALE_FACTOR);
    //        this.cubeMesh.physicsImpostor.setLinearVelocity(
    //                velocityDirection);
            this.cubeMesh.physicsImpostor.applyImpulse(forceVector, this.cubeMesh.getAbsolutePosition());
            // this.moving = true;
            this.targetPosition = false;
        }
        
    };
    
    Pawn.prototype.moveTo = function(targetPositionVector){
        this.targetPosition = targetPositionVector;
        this.moving = false;
    };
    
    Pawn.prototype.syncPosition = function(position, linearVelocity){
        this.cubeMesh.position = position;
        this.cubeMesh.physicsImpostor.setLinearVelocity(linearVelocity);
    };
    
    Pawn.prototype.die = function () {
        this.scene.removeMesh(this.object);
        if (this.listener && this.listener.onPawnDead && typeof (this.listener.onPawnDead) === 'function') {
            this.listener.onPawnDead(this);
        }
    };
      
})(); 
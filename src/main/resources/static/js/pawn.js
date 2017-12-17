var B = BABYLON;
var PAWN_SIZE = 1;
var PAWN_MASS = 10;
var PAWN_MAX_VELOCITY_MAGNITUDE = 1;
var PAWN_VELOCITY_SCALE_FACTOR = 2.5;
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
        cube.physicsImpostor = new B.PhysicsImpostor(
                cube, B.PhysicsImpostor.BoxImpostor, {mass: PAWN_MASS, friction: 0, restitution: 1}, this.scene);
        this.cubeMesh = cube;
    };
    
    Pawn.prototype.update = function(){
        if(!!this.targetPosition && !this.moving){
            var targetPositionVector = new B.Vector3(this.targetPosition.x, 0, this.targetPosition.z);
            var positionGroundProjection = new B.Vector3(this.cubeMesh.position.x, 0, this.cubeMesh.position.z);
            var velocityVersor = targetPositionVector.subtract(positionGroundProjection).normalize();
            var velocityDirection = velocityVersor.scaleInPlace(PAWN_VELOCITY_SCALE_FACTOR);
            this.cubeMesh.physicsImpostor.setLinearVelocity(
                    velocityDirection);
            this.moving = true;
        }
        else if(!!this.targetPosition && this.moving){
            var targetReached = false;
            
            var targetPositionVector = new B.Vector3(this.targetPosition.x, 0, this.targetPosition.z);
            var positionGroundProjection = new B.Vector3(this.cubeMesh.position.x, 0, this.cubeMesh.position.z);
            var distanceSquared = B.Vector3.DistanceSquared(targetPositionVector, positionGroundProjection);
            // console.log("distance^2: ", distanceSquared);
            targetReached = distanceSquared <= .1;
            
            if(targetReached){
                this.cubeMesh.physicsImpostor.setLinearVelocity(B.Vector3.Zero());
                this.targetPosition = false;
                this.moving = false;
            }
        }
    };
    
    Pawn.prototype.moveTo = function(targetPositionVector){
        this.targetPosition = targetPositionVector;
        this.moving = false;
    };
    
    Pawn.prototype.die = function () {
        this.scene.removeMesh(this.object);
        if (this.listener && this.listener.onPawnDead && typeof (this.listener.onPawnDead) === 'function') {
            this.listener.onPawnDead(this);
        }
    };
      
})(); 
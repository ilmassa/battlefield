(function(){
    console.log("Initializing game instance");
        
    battlefield = new Battlefield('battlefieldCanvas');
    
    window.addEventListener('DOMContentLoaded', function(){
        battlefield.init();
        addGameObjects();
    });
    
    window.addEventListener('resize', function () {
        battlefield.engine.resize();
    });
    
    function addGameObjects() {
        battlefield.addCube(20, 20, 0);
        battlefield.addRipple(4, 4);
    }
    
})();
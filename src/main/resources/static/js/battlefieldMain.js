(function(){
    console.log("Initializing game instance");
        
    battlefield = new Battlefield('battlefieldCanvas');
    
    window.addEventListener('DOMContentLoaded', function(){
        battlefield.init();
    });
    
    window.addEventListener('resize', function () {
        battlefield.engine.resize();
    });
})();
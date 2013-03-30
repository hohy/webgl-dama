/**
 * Figure object - includes mesh and functionality of the figures.
 */
var FIGURE_COLOR = {
    BLACK : 0,
    WHITE : 1
};

var Figure = function (color) {
            
    this.color = color;
    this.geometry = new THREE.CylinderGeometry(0.4,0.4,0.2,20,1,false);
    
    if(color == FIGURE_COLOR.BLACK) {
        this.meterial = new THREE.MeshBasicMaterial( { color: 0xDDDDDD } );
    } else {
        this.meterial = new THREE.MeshBasicMaterial( { color: 0x222222 } );
    }
        
    THREE.Mesh.call(this,this.geometry,this.meterial);
}

Figure.prototype = Object.create(THREE.Mesh.prototype);
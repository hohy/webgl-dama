/**
 * Board object
 */

var Board = function() {
    THREE.Object3D.call( this );
    
    // number of fields on one side of the board
    var BOARD_SIZE = 8;
    
    // size of one board field
    var FIELD_SIZE = 1;
    
    // board fields materials and geometrics
    var whiteFieldMaterial = new THREE.MeshBasicMaterial( { color: 0xEEEEEE } );
    var blackFieldMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var FIELD_RADIUS = Math.pow(2*FIELD_SIZE,0.5)/2;
    var FIELD_HEIGHT = 0.05;
    var fieldGeometry = new THREE.CylinderGeometry(FIELD_RADIUS-FIELD_HEIGHT,FIELD_RADIUS,FIELD_HEIGHT,4,1,false);
    
    // generate board fields    
    this.fields = new Array();       
    for(var z = 0; z < BOARD_SIZE; z++) {
        for (var x = 0; x < BOARD_SIZE; x++) {
            // set a material to the field
            var fieldMaterial;
            var fieldId = deskXYtoI(x,z);
            if ((fieldId+z)%2==1) {
                    fieldMaterial = whiteFieldMaterial;
            } else {
                fieldMaterial = blackFieldMaterial;
            }					
            // create a field mesh
            this.fields[fieldId] = new THREE.Mesh(fieldGeometry,fieldMaterial);
            // place it on its position
            this.fields[fieldId].position.x = x + (FIELD_SIZE/2);
            this.fields[fieldId].position.z = z + (FIELD_SIZE/2);
            // set correct rotation
            this.fields[fieldId].rotation.y = -1.57079633;
            this.fields[fieldId].rotation.y = -1.57079633/2;
            // add the mesh to the scene
            this.add(this.fields[fieldId]);            
        }
    }
    
    function deskXYtoI(x,y) {
        return y * BOARD_SIZE + x;
    }
}

Board.prototype = Object.create(THREE.Object3D.prototype);
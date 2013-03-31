var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMapEnabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.CubeGeometry(0.51,0.51,0.51);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

camera.position.z = 7;
camera.position.y = 3;		                       

showAxises();                        

// add game board to scene
var board = new Board();                        
scene.add(board);
board.position.x = -4;
board.position.z = -4;
board.updateMatrixWorld();

// add figures to the scene
var figures = new Array();
var figureId = 0;
// black ones
for(var y=0; y < 3; y++) {    
    for(var x=y%2; x < 8; x=x+2) {
        figures[figureId] = new Figure(FIGURE_COLOR.BLACK);
        scene.add(figures[figureId]);
        figures[figureId++].position = board.getFieldPosition(x,y);    
    }                            
}
// white ones
for(var y=0; y < 3; y++) {
    for(var x=(y+1)%2; x < 8; x=x+2) {
        figures[figureId] = new Figure(FIGURE_COLOR.WHITE);
        scene.add(figures[figureId]);
        figures[figureId++].position = board.getFieldPosition(x,7-y);    
    }                            
}

// Board field possition test
var fldLineGeo = new THREE.Geometry();
fldLineGeo.vertices.push(v(0,0.5,0),v(0,-0.5,0));
var fldLineMatHilited  = new THREE.LineBasicMaterial({color: 0xFF0000, lineWidth: 1});
var fldLineMat = new THREE.LineBasicMaterial({color: 0x000000, lineWidth: 1});
var fldLines = new Array();
fldLines[0] = new THREE.Line(fldLineGeo,fldLineMatHilited);
fldLines[0].type = THREE.Lines;                        
scene.add(fldLines[0]);
fldLines[0].position = board.getFieldPosition(0,0);
fldLines[1] = new THREE.Line(fldLineGeo,fldLineMat);
fldLines[1].type = THREE.Lines;                        
scene.add(fldLines[1]);
fldLines[1].position = board.getFieldPosition(7,7);

// Lights
scene.add( new THREE.AmbientLight( 0x444444 ) );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 1, 1, 1 ).normalize();
scene.add( directionalLight );

var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
scene.add( pointLight );

var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
particleLight.material.color = pointLight.color;
pointLight.position = particleLight.position;
                                
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
var projector = new THREE.Projector();

var time = 0;

function render() {
        requestAnimationFrame(render);
        time += 0.005;
        camera.position.x = 6 * Math.cos( time );         
        camera.position.z = 6 * Math.sin( time );
        camera.lookAt( new THREE.Vector3(0, 0, 0));
        particleLight.position.x = Math.sin( time * 7 ) * 300;
	particleLight.position.y = Math.cos( time * 5 ) * 400;
	particleLight.position.z = Math.cos( time * 3 ) * 300;        
        renderer.render(scene, camera);
}

render();

// various functions

/**
 * Create new vertex
 * @param {type} x
 * @param {type} y
 * @param {type} z
 * @returns {@exp;THREE@call;Vertex}
 */
function v(x,y,z){ 
    return new THREE.Vertex(new THREE.Vector3(x,y,z)); 
}

function showAxises() {
    var lineGeoX = new THREE.Geometry();
    var lineGeoY = new THREE.Geometry();
    var lineGeoZ = new THREE.Geometry();                        
    lineGeoX.vertices.push(v(-50, 0, 0), v(50, 0, 0));
    lineGeoY.vertices.push(v(0, -50, 0), v(0, 50, 0));
    lineGeoZ.vertices.push(v(0, 0, -50), v(0, 0, 50));
    var lineMatX = new THREE.LineBasicMaterial({color: 0xFF0000, lineWidth: 1});
    var lineMatY = new THREE.LineBasicMaterial({color: 0x00FF00, lineWidth: 1});
    var lineMatZ = new THREE.LineBasicMaterial({color: 0x0000FF, lineWidth: 1});
    var lineX = new THREE.Line(lineGeoX, lineMatX);
    var lineY = new THREE.Line(lineGeoY, lineMatY);
    var lineZ = new THREE.Line(lineGeoZ, lineMatZ);
    lineX.type = THREE.Lines;
    lineY.type = THREE.Lines;
    lineZ.type = THREE.Lines;                        
    scene.add(lineX);
    scene.add(lineY);
    scene.add(lineZ);                            
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( figures );
    if ( intersects.length > 0 ) {
        intersects[0].object.material.color.setHex( Math.random() * 0xffffff );
        console.log("Click on the figure.");
    }
}
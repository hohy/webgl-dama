			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			
			var geometry = new THREE.CubeGeometry(0.51,0.51,0.51);
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 7;
			camera.position.y = 3;		
                        
                        // axises
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
                        			                        
                        // Figure test
                        var testFigure = new Figure(FIGURE_COLOR.BLACK);
                        scene.add(testFigure);
                        
                        // Board test
                        var board = new Board();                        
                        scene.add(board);
                        board.position.x = -4;
                        board.position.z = -4;
			
			var time = 0;
			function render() {
				requestAnimationFrame(render);
			    cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;	
				time += 0.01;
				camera.position.x = 6 * Math.cos( time );         
				camera.position.z = 6 * Math.sin( time );
				camera.lookAt( new THREE.Vector3(0, 0, 0));				
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
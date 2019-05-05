var THREE = require('three');
import TerrainData from '../terrain_data.js';
import noiseOptions from '../focused_fragment';
import Scene from '../basic_scene';

const container = document.getElementById('scene');

var scene = new Scene(container);

var material = new THREE.MeshStandardMaterial( { color: 0x888888, roughness: 1.0, metalness: 0.0 } );

var geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
geometry.rotateX(- Math.PI / 2);
geometry.rotateY(- Math.PI / 2);

var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.castShadow = true;

scene.add(plane);

var wireframe = new THREE.WireframeGeometry(geometry);
var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
var line = new THREE.LineSegments(wireframe, lineMaterial);

scene.add( line );

scene.render();

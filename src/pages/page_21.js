var THREE = require('three');
import noiseOptions from '../focused_fragment';
import Scene from '../basic_scene';
import TerrainBuilder from '../terrain_builder';

noiseOptions.modifier = (v) => {
  var value = (0.5 + v / 2);
  return value**3;
}

const container = document.getElementById('scene');

var scene = new Scene(container);
var material = new THREE.MeshStandardMaterial( { color: 0x888888, roughness: 1.0, metalness: 0.0 } );

var builder = new TerrainBuilder({
  size: 100,
  resolution: 300,
  dataResolutionMultiplier: 1,
  scene: scene,
  material: material,
  noiseOptions: noiseOptions,
  colorData: [
    {
      max: 0.025,
      color: [28, 130, 200]
    },
    {
      max: 0.05,
      color: [32, 136, 216]
    },
    {
      max: 0.058,
      color: [220, 186, 150]
    },
    {
      max: 0.175,
      color: [75, 186, 80]
    },
    {
      max: 0.3,
      color: [68, 178, 72]
    },
    {
      max: 0.5,
      color: [111, 106, 96]
    },
    {
      max: 0.65,
      color: [100, 90, 85]
    },
    {
      max: 0.8,
      color: [220, 220, 220]
    },
    {
      max: 100,
      color: [255,255,255]
    }
  ]
});

builder.build();

var wireframe = new THREE.WireframeGeometry(builder.geometry);
var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
var line = new THREE.LineSegments(wireframe, lineMaterial);

scene.add( line );

scene.render();

var THREE = require('three');
import noiseOptions from '../focused_fragment';
import Scene from '../basic_scene';
import TerrainBuilder from '../terrain_builder';

const container = document.getElementById('scene');

var scene = new Scene(container);

window.terrain = new TerrainBuilder({
  size: 100,
  resolution: 300,
  noiseOptions: noiseOptions,
  island: true,
  scene: scene,
  colorData: [
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

window.terrain.build();
scene.render();

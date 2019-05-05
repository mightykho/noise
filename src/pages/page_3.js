import { NoiseData, PerlinNoiseData } from '../noise_data';
import DemoSection from '../demo_section';

var section = document.getElementById('noise');
var data = new NoiseData({
  seed: 23,
  width: 600,
  height: 600
});

new DemoSection(section, data, true);

var section = document.getElementById('perlin');
var data = new PerlinNoiseData({
  seed: 23,
  width: 600,
  height: 600
});

new DemoSection(section, data, true);

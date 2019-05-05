import { NoiseData, PerlinNoiseData } from '../noise_data';
import DemoSection from '../demo_section';

var section = document.getElementById('noise_1');
var data = new PerlinNoiseData({
  seed: 20,
  width: 400,
  height: 400,
  amplitude: 1.2,
  frequency: 0.5
});

new DemoSection(section, data, true);

var section = document.getElementById('noise_2');
var data = new PerlinNoiseData({
  seed: 20,
  width: 400,
  height: 400,
  amplitude: 0.15,
  frequency: 2
});

new DemoSection(section, data, true);

var section = document.getElementById('noise_3');
var data = new PerlinNoiseData({
  seed: 20,
  width: 400,
  height: 400,
  amplitude: 0.05,
  frequency: 6
});

new DemoSection(section, data, true);

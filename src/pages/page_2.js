import { NoiseData, PerlinNoiseData } from '../noise_data';
import DemoSection from '../demo_section';

const section = document.getElementById('noise');
const data = new PerlinNoiseData({
  seed: 23,
  width: 800,
  height: 800
});

new DemoSection(section, data, false);

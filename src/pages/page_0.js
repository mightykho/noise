import { NoiseData, PerlinNoiseData } from '../noise_data';
import DemoSection from '../demo_section';

const section = document.getElementById('index-container');
const data = new NoiseData({
  seed: 23,
  width: section.offsetWidth,
  height: 790
});

new DemoSection(section, data, false);

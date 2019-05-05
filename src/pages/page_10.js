import { CombinedPerlinNoiseData } from '../noise_data';
import DemoSection from '../demo_section';

var section = document.getElementById('noise');
var data = new CombinedPerlinNoiseData({
  seed: 20,
  width: 600,
  height: 600,
  noises: [
    {
      amplitude: 1.2,
      frequency: 0.5
    },
    {
      amplitude: 0.15,
      frequency: 2
    },
    {
      amplitude: 0.05,
      frequency: 6
    }
  ]
});

new DemoSection(section, data, true);

import InteractiveTerrainDemoSection from '../interactive_terrain_demo_section';
import noiseOptions from '../focused_fragment';

const section = document.getElementById('section');

Object.assign(noiseOptions, {
  show1D: true,
  modifier: (v) => {
    var value = (0.5 + v / 2);
    return value**3
  }
});

new InteractiveTerrainDemoSection(section, noiseOptions, [
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
]);

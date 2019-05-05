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

new InteractiveTerrainDemoSection(section, noiseOptions);

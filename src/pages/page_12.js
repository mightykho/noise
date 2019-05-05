import InteractiveTerrainDemoSection from '../interactive_terrain_demo_section';
import noiseOptions from '../focused_fragment';

const section = document.getElementById('section');

Object.assign(noiseOptions, {
  show1D: true,
});

new InteractiveTerrainDemoSection(section, noiseOptions);

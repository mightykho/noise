import InteractiveDemoSection from './interactive_demo_section';
import TerrainData from './terrain_data';

export default class InteractiveTerrainDemoSection extends InteractiveDemoSection {
  _buildNoiseData() {
    this.noiseData = new TerrainData(this.noiseOptions);
  }

  get noiseClass() { return TerrainData }

  _buildNoiseInputs() {
    this._addNoiseInput('seed', 'number');
    this._addNoiseInput('offsetX', 'range', { min: -1000, max: 1000 });
    this._addNoiseInput('offsetY', 'range', { min: -1000, max: 1000 });
    this._addNoiseInput('zoom', 'range', { min: 0.01, max: 0.5, step: 0.01 });
    this._addNoiseInput('octaves', 'number');
    this._addNoiseInput('persistance', 'range', { min: 0.1, max: 0.6, step: 0.05 });
    this._addNoiseInput('lacunarity', 'range', { min: 0.1, max: 0.6, step: 0.05 });
  }
}

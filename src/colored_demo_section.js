import DemoSection from './demo_section';

export default class ColoredDemoSection extends DemoSection {
  constructor(section, noiseData, colorData, show1D) {
    super(section, noiseData, show1D);

    this.colorData = colorData || [];

    this._render();
  }

  updateColors(data) {
    this.colorData = data;

    this._render();
  }

  _valueToColor(value) {
    var color = super._valueToColor(value);

    if (this.colorData) {
      for (var i = 0; i < this.colorData.length; i++) {
        if (value <= this.colorData[i].max) {
          color = this.colorData[i].color

          break;
        }
      }
    }

    return color;
  }
}

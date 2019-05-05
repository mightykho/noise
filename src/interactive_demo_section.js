import { NoiseData, PerlinNoiseData } from './noise_data';
import DemoSection from './demo_section';
import ColoredDemoSection from './colored_demo_section';

export default class InteractiveDemoSection {
  constructor(element, options, colorData) {
    var options = options || {};

    this.noiseOptions = this.noiseClass.defaultOptions;
    Object.assign(this.noiseOptions, options);

    this.show1D = options.show1D == true;


    this.element = element;
    this.colorData = colorData;
    this.id = Math.floor(Math.random() * 1000);

    if (this.colorData) {
      this._buildInteractiveColorPanel();
    }

    this._buildNoiseData();
    this._buildDemoSection();

    this._buildInteractivePanel();
  }

  get noiseClass() { return PerlinNoiseData }

  _buildNoiseData() {
    this.noiseData = new PerlinNoiseData(this.noiseOptions);
  }

  _buildDemoSection() {
    var section = document.createElement('div');
    this.element.appendChild(section);

    if (this.colorData) {
      this.demoSection = new ColoredDemoSection(section, this.noiseData, this.colorData, this.show1D);
    } else {
      this.demoSection = new DemoSection(section, this.noiseData, this.show1D);
    }
  }

  _updateNoise() {
    this._buildNoiseData();

    this.demoSection.updateNoise(this.noiseData);
  }

  _updateColors() {
    this.demoSection.updateColors(this.colorData);
  }

  _buildInteractivePanel() {
    this.interactiveSection = document.createElement('div');
    this.interactiveSection.classList.add('interactive-panel');

    this._buildNoiseInputs();

    this.element.appendChild(this.interactiveSection);
  }

  _buildInteractiveColorPanel() {
    this.interactiveSection = document.createElement('div');
    this.interactiveSection.classList.add('interactive-panel', 'interactive-panel--color');

    this._buildColorInputs();

    this.element.appendChild(this.interactiveSection);
  }

  _buildColorInputs() {
    this.colorData.forEach((el, index) => {
      this._addInput(this.colorData, index, 'max', () => { this._updateColors() }, 'range', { min: 0, max: 1, step: 0.01 });
    });
  }

  _buildNoiseInputs() {
    this._addNoiseInput('seed', 'number');
    this._addNoiseInput('offsetX', 'range', { min: -1000, max: 1000 });
    this._addNoiseInput('offsetY', 'range', { min: -1000, max: 1000 });
    this._addNoiseInput('zoom', 'range', { min: 0.01, max: 0.5, step: 0.01 });
    this._addNoiseInput('amplitude', 'range', { min: 0.1, max: 1.0, step: 0.1 });
    this._addNoiseInput('frequency', 'range', { min: 0.1, max: 10.0, step: 0.1 });
  }

  _addNoiseInput(property, type, options) {
    this._addInput(this.noiseOptions, property, null, () => { this._updateNoise(); }, type, options);
  }

  _addInput(source, property, key, callback, type, options) {
    var options = options || {};

    var inputId = property + '_' + this.id;

    var container = document.createElement('div');
    var label = document.createElement('label');
    label.innerHTML = property;
    label.setAttribute('for', inputId);
    if (key && source[property].color) {
      var color = source[property].color;
      label.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }

    container.appendChild(label);

    var input = document.createElement('input');
    input.type = type;
    input.id = inputId;

    for (var i in options) {
      input[i] = options[i];
    }

    container.appendChild(input);
    input.value = (key ? source[property][key] : source[property]);

    if (type === 'range') {
      var span = document.createElement('span');
      span.innerHTML = key ? source[property][key] : source[property];
      container.appendChild(span);
    }

    var listener = (() => {
      if (key) {
        source[property][key] = parseFloat(input.value);
      } else {
        source[property] = parseFloat(input.value);
      }

      if (input.type === 'range') {
        input.nextSibling.innerHTML = input.value;
      }

      callback()
    });

    input.addEventListener('input', listener);

    this.interactiveSection.appendChild(container);
  }
}

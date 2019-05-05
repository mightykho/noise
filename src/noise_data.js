import { Noise } from 'noisejs';
import PseudoRandom from './pseudo_random';

function defaultModifier(value) {
  return 0.5 + value / 2;
}

function reverseLerp(start, end, value) {
  return (start - value) / (start - end)
}

const UNIT_SCALE = 0.03;

class NoiseData {
  static get defaultOptions() {
    return {
      seed: 1,
      offsetX: 0,
      offsetY: 0,
      width: 600,
      height: 600,
      zoom: 0.03,
      frequency: 1.0,
      amplitude: 1.0,
      modifier: defaultModifier
    }
  }

  constructor(options) {
    Object.assign(this, NoiseData.defaultOptions);
    Object.assign(this, options);

    this.random = new PseudoRandom(this.seed);
    this.scale = UNIT_SCALE * this.width * this.zoom;

    this._buildGenerator();
    this._buildData();
  }

  valueAt(index) {
    const x = index % this.width;
    const y = Math.floor(index / this.width);

    return this.valueAtCoord(x, y);
  }

  valueAtCoord(x, y) {
    return this._data[y][x];
  }

  _buildGenerator() {
    this.generator = {
      valueAt: (x, y) => 1 - this.random.generate() * 2
    }
  }

  _buildData() {
    this._data = [];

    for (var y = 0; y < this.height; y++) {
      this._data[y] = [];

      for (var x = 0; x < this.width; x++) {
        var sampleX = ((x - this.width / 2) / this.scale + this.offsetX) * this.frequency;
        var sampleY = ((y - this.height / 2) / this.scale + this.offsetY) * this.frequency;

        var value = this.generator.valueAt(sampleX / 100, sampleY / 100);
        this._data[y][x] = this.modifier(value, x, y) * this.amplitude;

        if (value > this.maxValue) {
          this.maxValue = value;
        }

        if (value < this.minValue) {
          this.minValue = value;
        }
      }
    }
  }
}

class PerlinNoiseData extends NoiseData {
  _buildGenerator() {
    var noise = new Noise();
    noise.seed(this.seed);

    this.generator = { valueAt: (x, y) => noise.perlin2(x, y) };
  }
}

class CombinedPerlinNoiseData extends NoiseData {
  constructor(options) {
    super(options);

    this.modifier = typeof options.modifier === 'function' ? options.modifier : defaultModifier;

    this.noises = (options.noises || []).map((noiseOptions) => {
      noiseOptions.seed = this.seed;
      noiseOptions.width = this.width;
      noiseOptions.height = this.height;
      noiseOptions.zoom = this.zoom;
      noiseOptions.modifier = (v) => v;
      noiseOptions.offsetX = 10000 * (1.0 - this.random.generate() * 2) + this.offsetX
      noiseOptions.offsetY = 10000 * (1.0 - this.random.generate() * 2) + this.offsetY

      return new PerlinNoiseData(noiseOptions);
    });

    this._combineData();
  }

  _buildData() {};

  _combineData() {
    this._data = [];

    for (var y = 0; y < this.height; y++) {
      this._data[y] = [];

      for (var x = 0; x < this.width; x++) {
        var value = this.noises.reduce((total, noise) => total + noise.valueAtCoord(x, y), 0);
        this._data[y][x] = this.modifier(value, x / this.width, y / this.height);
      }
    }
  }
}

export { PerlinNoiseData, NoiseData, CombinedPerlinNoiseData };

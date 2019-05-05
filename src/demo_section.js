export default class DemoSection {
  constructor(container, noiseData, show1D) {
    this.container = container;
    this.noiseData = noiseData;
    this.width = noiseData.width;
    this.height = noiseData.height;
    this.show1D = show1D;

    this._build();
    this._render()
  }

  updateNoise(noiseData) {
    this.noiseData = noiseData;

    this._render();
  }

  _build() {
    if (this.show1D) this._buildCanvas1D();
    this._buildCanvas2D();
  }

  _render() {
    if (this.show1D) this._renderCanvas1D();
    this._renderCanvas2D();
  }

  _buildCanvas1D() {
    this.canvas1D = document.createElement('canvas');

    this.canvas1D.width = this.width;
    this.canvas1D.height = Math.floor(this.height / 4);
    this.canvas1D.classList.add('canvas--1d');

    this.container.appendChild(this.canvas1D);
  }

  _buildCanvas2D() {
    this.canvas2D = document.createElement('canvas');

    this.canvas2D.width = this.width;
    this.canvas2D.height = this.height;
    this.canvas2D.classList.add('canvas--2d');

    this.container.appendChild(this.canvas2D);
  }

  _renderCanvas1D() {
    var ctx = this.canvas1D.getContext('2d');
    var width = this.canvas1D.width;
    var height = this.canvas1D.height;

    ctx.clearRect(0, 0, width, height);

    var image = ctx.createImageData(width, height);

    for (var x = 0; x < width; x++) {
      var value = this.noiseData.valueAtCoord(x, this.height / 2);
      var maxY = Math.floor(height * (1 - value));

      for (var y = 0; y < height; y++) {
        if (y > maxY) {
          var i = (x + y * width) * 4
          image.data[i + 3] = 100;
        }
      }
    }

    ctx.putImageData(image, 0, 0);
  }

  _valueToColor(value) {
    return [
      value * 256,
      value * 256,
      value * 256
    ]
  }

  _renderCanvas2D() {
    var ctx = this.canvas2D.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.height);
    var image = ctx.createImageData(this.width, this.height);

    for (var i = 0; i < image.data.length; i+=4) {
      var color = this._valueToColor(this.noiseData.valueAt(i / 4));

      image.data[i + 0] = color[0];
      image.data[i + 1] = color[1];
      image.data[i + 2] = color[2];
      image.data[i + 3] = 255;
    }

    ctx.putImageData(image, 0, 0);
  }
}

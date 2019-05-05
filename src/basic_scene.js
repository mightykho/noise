var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class BasicScene {
  constructor(container) {
    this.container = container;

    this._setupScene();
    this._setupLights();
    this._setupCamera();
    this._setupRenderer();

    this._startControlsLoop();
  }

  add(element) {
    this.scene.add(element);
  }

  remove(element) {
    this.scene.remove(element);
  }

  renderOnce() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  render() {
    requestAnimationFrame(this.render.bind(this));

    this.renderOnce();
  }

  updateCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);

    this.controls.update();
  }

  _startControlsLoop() {
    localStorage.setItem('cameraPosition', JSON.stringify(this.camera.position));

    setTimeout(this._startControlsLoop.bind(this), 500);
  }

  _setupCamera() {
    var position = JSON.parse(localStorage.getItem('cameraPosition'));

    this.camera = new THREE.PerspectiveCamera(70, this.container.offsetWidth / this.container.offsetHeight, 1, 1000);
    this.camera.position.set(position.x, position.y, position.z);

    this.add(this.camera);

    this.controls = new OrbitControls(this.camera);
  }

  _setupLights() {
    this.add(new THREE.AmbientLight(0xffffff, 0.75));

    this.light = new THREE.SpotLight(0xfdb813, 1);
    this.light.position.set(200, 200, -200);
    this.light.castShadow = true;
    this.light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
    this.light.shadow.mapSize.width = 2048 * 4;
    this.light.shadow.mapSize.height = 2048 * 4;
    this.light.shadow.radius = 1;

    this.add(this.light)
  }

  _setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xfffffff );
  }

  _setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }
}

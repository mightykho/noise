var THREE = require('three');
import TerrainData from './terrain_data.js';
import ColoredDemoSection from './colored_demo_section.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


const DEFAULT_HEIGHT_MULTIPLIER = 100;

const modifier = (v) => {
  var value = (0.5 + v / 2);
  return value**3;
}

const islandModifier = (v, x, y) => {
  var xd = (x - 0.5) * 2;
  var yd = (y - 0.5) * 2;

  var d = Math.sqrt(xd**2 + yd**2);

  var value = (0.5 + v / 2);
  if (d < 0.5) {
    return value**3;
  } else {
    var dm = (0.5 - (d - 0.5)) / 0.5;

    return value**3 * dm;
  }
}

export default class TerrainBuilder {
  constructor(options) {
    this.meshSize = options.size || 100;
    this.resolution = options.resolution || 100;
    this.noiseOptions = options.noiseOptions;
    this.cloudsLevel = options.cloudsLevel || 0.6;
    this.waterLevel = options.waterLevel || 0.05;
    this.waterSize = options.waterSize || this.meshSize * 2;
    this.verticesPerSide = this.resolution + 1;
    this.colorData = options.colorData;
    this.dataResolutionMultiplier = options.dataResolutionMultiplier || 4
    this.material = options.material;
    this.scene = options.scene;

    this.isIsland = options.island == true
    this.addTrees = options.addTrees == true;
    this.addClouds = options.addClouds == true;

    this.noiseOptions.modifier = this.isIsland ? islandModifier : modifier
  }

  build() {
    this._buildTerrainData();
    if (!this.material) this._setupMaterial();
    this._buildGeometry();

    this._buildMesh()
    if (this.isIsland) {
      this._buildWater()
    }

    if (this.addTrees) {
      this._loadAndBuildTrees();
    }

    if (this.addClouds) {
      this._buildClouds();
    }
  }

  regenerate(seed) {
    this.noiseOptions.seed = seed;

    this.scene.remove(this.mesh);
    this.scene.remove(this.clouds);

    (this.trees || []).forEach((tree) => {
      this.scene.remove(tree);
    });
    document.getElementById('texture').innerHTML = ""

    this._buildTerrainData();
    this._setupMaterial();
    this._buildGeometry();

    this._buildMesh()

    if (this.addTrees) {
      this._buildTrees();
    }

    if (this.addClouds) {
      this._buildClouds();
    }
  }

  _buildWater() {
    var waterGeometry = new THREE.PlaneBufferGeometry(this.waterSize, this.waterSize, 1, 1);
    waterGeometry.rotateX(- Math.PI / 2);

    var waterMaterial = new THREE.MeshStandardMaterial( { color: 0x1c82c8, roughness: 0.5, metalness: 0.0 } );

    var water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.receiveShadow = true;
    water.castShadow = true;
    water.position.y = this.waterLevel * this.terrainData.zoom * DEFAULT_HEIGHT_MULTIPLIER;

    this.scene.add(water);
  }

  _buildMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.scene.add(this.mesh);
  }

  _buildTerrainData() {
    this.noiseOptions.width = this.verticesPerSide * this.dataResolutionMultiplier;
    this.noiseOptions.height = this.verticesPerSide * this.dataResolutionMultiplier;

    this.terrainData = new TerrainData(this.noiseOptions);
  }

  _setupMaterial() {
    var section = new ColoredDemoSection(document.getElementById('texture'), this.terrainData, this.colorData);
    var texture = new THREE.CanvasTexture(section.canvas2D);

    this.material = new THREE.MeshStandardMaterial({ roughness: 1.0, metalness: 0.0, map: texture });
  }

  _buildGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(this.meshSize, this.meshSize, this.resolution, this.resolution);
    this.geometry.rotateX(- Math.PI / 2);

    for (var x = 0; x < this.verticesPerSide; x++)  {
      for (var y = 0; y < this.verticesPerSide; y++)  {
        var ind = (x + this.verticesPerSide * y) * 3 + 1

        this.geometry.attributes.position.array[ind] = this.terrainData.valueAtCoord(x * this.dataResolutionMultiplier, y * this.dataResolutionMultiplier) * this.terrainData.zoom * DEFAULT_HEIGHT_MULTIPLIER;
      }
    }
  }

  _buildClouds() {
    var section = new ColoredDemoSection(document.getElementById('texture'), new TerrainData({ width: 300, height: 300, octaves: 3, zoom: 0.05, modifier: islandModifier }));
    var texture = new THREE.CanvasTexture(section.canvas2D);
    var material = new THREE.MeshStandardMaterial({ roughness: 1.0, metalness: 0.0, color: 0xffffff, alphaMap: texture });

    material.alphaTest = 0.25;
    material.opacity = 0.8;
    material.transparent = 1;

    var geometry = new THREE.PlaneBufferGeometry(this.meshSize, this.meshSize, 1, 1);
    geometry.rotateX(- Math.PI / 2);

    this.clouds = new THREE.Mesh(geometry, material);

    this.clouds.castShadow = true;
    this.clouds.position.y = this.cloudsLevel * this.terrainData.zoom * DEFAULT_HEIGHT_MULTIPLIER;

    this.scene.add(this.clouds);
  }

  _buildTree(object) {
    for (var i = 0; i < 4000; i++) {
      var rand = this.terrainData.noiseData.random
      var y = Math.floor(rand.generate() * this.resolution);
      var x = Math.floor(rand.generate() * this.resolution);
      var rot = rand.generate() * 2;
      var tree = object.clone();
      var scale = this.terrainData.zoom / 2 + rand.generate() * (2 * this.terrainData.zoom);

      var value = this.terrainData.valueAtCoord(x * this.dataResolutionMultiplier, y * this.dataResolutionMultiplier);

      if (value > 0.08 && value < 0.5) {
        tree.position.x = this.meshSize / this.resolution * ( x - this.resolution / 2)
        tree.position.z = this.meshSize / this.resolution * ( y - this.resolution / 2)
        tree.position.y = value * this.terrainData.zoom * DEFAULT_HEIGHT_MULTIPLIER;
        tree.rotateY(Math.PI / rot);
        tree.scale.set(scale, scale, scale);
        var colorChange = Math.floor((0.5 - rand.generate()) * 10) * 0.02;
        var material = tree.children[0].material.clone()
        material.color.addScalar(colorChange);
        tree.children[0].material = material;

        this.trees.push(tree);
        this.scene.add(tree);
      }
    }
  }

  _buildTrees() {
    this.trees = [];
    this.treeGroups.forEach((tree) => {
      this._buildTree(tree);
    });
  }

  _loadAndBuildTrees() {
    var loader = new OBJLoader();
    this.trees = [];
    this.treeGroups = [];
    var trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x964B00, roughness: 1.0, metalness: 0.0 } );
    var bodyMaterial = new THREE.MeshStandardMaterial( { color: 0x01796f, roughness: 1.0, metalness: 0.0 } );

    // load a resource
    for (var i = 0; i < 4; i++) {
      loader.load(
        `/obj/tree${i}.obj`,
        (object) => {
          object.children.forEach((child) => {
            if (child.name === 'Body_bGeometry') {
              child.material = bodyMaterial;
            } else {
              child.material = trunkMaterial;
            }
            child.castShadow = true;
            child.receiveShadow = true;
          });

          object.castShadow = true;
          object.receiveShadow = true;
          this.treeGroups.push(object);
          this._buildTree(object);
        },
        (xhr) => {},
        (error) => {}
      );
    }
  }
}

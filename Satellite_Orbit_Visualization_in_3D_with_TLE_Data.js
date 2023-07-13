// Import necessary modules from Three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define satellite data class
class SatelliteData {
  constructor(name, line1, line2, color) {
    this.name = name;
    this.line1 = line1;
    this.line2 = line2;
    this.color = color;
  }
}

const satelliteDataList = [];

function readTLEData(tleFile) {
  const fileReader = new FileReader();
  fileReader.addEventListener('load', function (e) {
    const lines = e.target.result.split('\n');
    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i].trim();
      const line1 = lines[i + 1].trim();
      const line2 = lines[i + 2].trim();
      const color = new THREE.Color(0, 0, 0); // Set default color to black
      const satelliteData = new SatelliteData(name, line1, line2, color);
      satelliteDataList.push(satelliteData);
    }
    visualizeOrbits();
  });
  fileReader.readAsText(tleFile);
}

function visualizeOrbits() {
  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Set up orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Add Earth to the scene
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earthMesh);

  // Add satellite paths to the scene
  for (const satelliteData of satelliteDataList) {
    const orbitGeometry = new THREE.BufferGeometry();
    const positions = [];
    const orbitMaterial = new THREE.LineBasicMaterial({ color: satelliteData.color });
    const orbit = new TLE(satelliteData.name, satelliteData.line1, satelliteData.line2).orbit;
    let t = 0.0;
    const dt = 5.0;
    for (let i = 0; i < 72; i++) {
      const date = AbsoluteDate.J2000_EPOCH.shiftedBy(t);
      const pvCoordinates = orbit.getPVCoordinates(date);
      const x = pvCoordinates.getPosition().getX() / 1000.0; // Scale the coordinates
      const y = pvCoordinates.getPosition().getY() / 1000.0;
      const z = pvCoordinates.getPosition().getZ() / 1000.0;
      positions.push(x, y, z);
      t += dt;
    }
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbitLine);
  }

  // Set up camera position and controls
  camera.position.z = 5;
  controls.update();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

// Read TLE data from a file
const tleFileInput = document.getElementById('tleFileInput');
tleFileInput.addEventListener('change', (e) => {
  const tleFile = e.target.files[0];
  readTLEData(tleFile);
});

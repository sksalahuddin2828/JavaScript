const axios = require('axios');
const THREE = require('three');

// Step 1: Retrieve satellite data from the API
const satelliteDataApiUrl = 'API_URL_HERE';

axios.get(satelliteDataApiUrl)
  .then(response => {
    const satelliteData = response.data;

    // Step 2: Parse TLE data using skyfield
    const tleData = satelliteData.map(satellite => [satellite.tle_line1, satellite.tle_line2]);

    // Step 3: Visualize satellite orbits in 3D
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const orbits = [];

    tleData.forEach(tle => {
      const satellite = new Satrec();
      satellite.sgp4init(Constants.wgs84, tle[0], tle[1]);

      const positionAndVelocity = satellite.propagate(2023, 7, 11, 0, 0, 0);
      const positionEci = positionAndVelocity.position;

      const satelliteOrbit = [];
      for (let i = 0; i < 3600; i += 60) {
        const time = 2023 * 24 * 60 + 7 * 24 * 60 + 11 * 24 * 60 + i;
        const positionAndVelocity = satellite.propagate(2023, 7, 11, 0, i, 0);
        const positionEci = positionAndVelocity.position;

        const gmst = satellite.gstimeFromDate(2023, 7, 11, 0, i, 0);
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);

        satelliteOrbit.push({
          latitude: satellite.degreesLat(positionGd.latitude),
          longitude: satellite.degreesLong(positionGd.longitude),
          altitude: positionGd.height,
        });
      }

      orbits.push(satelliteOrbit);
    });

    orbits.forEach(satelliteOrbit => {
      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const points = satelliteOrbit.map(coords => {
        const radius = coords.altitude + 6371;
        const phi = (90 - coords.latitude) * Math.PI / 180;
        const theta = (180 - coords.longitude) * Math.PI / 180;
        return new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      });

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    camera.position.z = 500;

    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the scene if needed
      // scene.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  })
  .catch(error => {
    console.error('Error retrieving satellite data:', error);
  });

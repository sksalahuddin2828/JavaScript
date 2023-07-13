const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const EARTH_RADIUS = 6371;
const NUM_SATELLITES = 10;
const SATELLITE_RADIUS = 100;
const SATELLITE_COLOR = 'red';

function SatelliteOrbit() {
  this.semi_major_axis = 800 + Math.random() * 700;
  this.eccentricity = 0.1 + Math.random() * 0.3;
}

const satellites = [];
for (let i = 0; i < NUM_SATELLITES; i++) {
  satellites.push(new SatelliteOrbit());
}

function drawEarth() {
  ctx.fillStyle = 'lightblue';
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 50; j++) {
      const u = (i * 2 * Math.PI) / 100;
      const v = (j * Math.PI) / 50;
      const x = EARTH_RADIUS * Math.cos(u) * Math.sin(v) + SCREEN_WIDTH / 2;
      const y = EARTH_RADIUS * Math.sin(u) * Math.sin(v) + SCREEN_HEIGHT / 2;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function drawSatelliteOrbit(satellite, time) {
  ctx.beginPath();
  for (let i = 0; i < time.length; i++) {
    const r =
      (satellite.semi_major_axis * (1 - satellite.eccentricity ** 2)) /
      (1 + satellite.eccentricity * Math.cos(time[i]));
    const x = r * Math.cos(time[i]) + SCREEN_WIDTH / 2;
    const y = r * Math.sin(time[i]) + SCREEN_HEIGHT / 2;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = 'gray';
  ctx.stroke();
}

function drawSatelliteMarker(satellite, time) {
  const r =
    (satellite.semi_major_axis * (1 - satellite.eccentricity ** 2)) /
    (1 + satellite.eccentricity * Math.cos(time[time.length - 1]));
  const x = r * Math.cos(time[time.length - 1]) + SCREEN_WIDTH / 2;
  const y = r * Math.sin(time[time.length - 1]) + SCREEN_HEIGHT / 2;
  ctx.fillStyle = SATELLITE_COLOR;
  ctx.beginPath();
  ctx.arc(x, y, SATELLITE_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  drawEarth();

  const numFrames = 100;
  const time = new Array(numFrames).fill(0).map((_, i) => (i * 2 * Math.PI) / numFrames);

  for (const satellite of satellites) {
    drawSatelliteOrbit(satellite, time);
    drawSatelliteMarker(satellite, time);
  }

  requestAnimationFrame(draw);
}

draw();

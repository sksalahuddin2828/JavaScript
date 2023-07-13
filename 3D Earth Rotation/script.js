const FRAME_WIDTH = 800;
const FRAME_HEIGHT = 600;
const ROTATION_INTERVAL = 20;

function drawFrame(ctx, frame) {
  ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
  ctx.save();
  ctx.translate(FRAME_WIDTH / 2, FRAME_HEIGHT / 2);
  ctx.rotate((frame * Math.PI) / 180);
  
  // Draw the Earth marker (blue square)
  ctx.fillStyle = 'blue';
  ctx.fillRect(-50, -50, 100, 100);
  
  ctx.restore();
}

function rotateEarth() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let frame = 0;
  
  function updateRotation() {
    drawFrame(ctx, frame);
    frame += 2;
    if (frame > 360) {
      frame = 0;
    }
  }
  
  setInterval(updateRotation, ROTATION_INTERVAL);
}

rotateEarth();

const cv = require('opencv4nodejs');

// Create a tracker object
const tracker = new cv.TrackerKCF();

// Open the video capture
const cap = new cv.VideoCapture(0);

// Read the first frame from the video
let frame = cap.read();
if (frame.empty) {
  console.log('Failed to read video');
  process.exit(1);
}

// Create a window to display the video
const window = new cv.NamedWindow('Tracking', cv.WindowFlags.NORMAL);

// Select the region of interest (ROI) for tracking
const bbox = cv.selectROI('Tracking', frame, false);

// Initialize the tracker with the selected ROI
tracker.init(frame, bbox);

// Main loop for video processing
while (true) {
  // Read a frame from the video
  frame = cap.read();
  if (frame.empty) {
    console.log('Failed to read video');
    break;
  }

  // Update the tracker with the current frame
  const success = tracker.update(frame);

  // If tracking is successful, draw the bounding box
  if (success) {
    const trackedRect = tracker.getRegion();
    frame.drawRectangle(trackedRect, new cv.Vec(0, 255, 255), 3);
    frame.putText('Tracking', new cv.Point2(trackedRect.x, trackedRect.y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.9, new cv.Vec(0, 255, 255), 2, cv.LINE_AA);
  } else {
    // If tracking is lost, display "Lost" message
    frame.putText('Lost', new cv.Point2(20, 40), cv.FONT_HERSHEY_SIMPLEX, 0.9, new cv.Vec(0, 0, 255), 2, cv.LINE_AA);
  }

  // Display the image with tracking results
  window.show(frame);

  // Exit the loop if 'q' is pressed
  if (cv.waitKey(1) === 'q'.charCodeAt(0)) {
    break;
  }
}

// Release the video capture and close windows
cap.release();
window.destroyAllWindows();

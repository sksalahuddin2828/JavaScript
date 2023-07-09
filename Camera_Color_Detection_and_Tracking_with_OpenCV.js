let videoElement = document.createElement('video');
videoElement.width = 640;
videoElement.height = 480;
document.body.appendChild(videoElement);

let canvasElement = document.createElement('canvas');
canvasElement.width = 640;
canvasElement.height = 240;
document.body.appendChild(canvasElement);
let ctx = canvasElement.getContext('2d');

function emptyFunction() {
  let threshold1 = cv.getTrackbarPos("Threshold1", "Parameters");
  let threshold2 = cv.getTrackbarPos("Threshold2", "Parameters");
  let area = cv.getTrackbarPos("Area", "Parameters");
  console.log("Threshold1:", threshold1);
  console.log("Threshold2:", threshold2);
  console.log("Area:", area);
}

cv.onRuntimeInitialized = () => {
  let cap = new cv.VideoCapture(videoElement);
  let frame = new cv.Mat();
  let imgHsv = new cv.Mat();
  let mask = new cv.Mat();
  let result = new cv.Mat();
  let hStack = new cv.Mat();

  cv.namedWindow("HSV");
  cv.resizeWindow("HSV", 640, 240);
  cv.createTrackbar("HUE Min", "HSV", 0, 179, emptyFunction);
  cv.createTrackbar("HUE Max", "HSV", 179, 179, emptyFunction);
  cv.createTrackbar("SAT Min", "HSV", 0, 255, emptyFunction);
  cv.createTrackbar("SAT Max", "HSV", 255, 255, emptyFunction);
  cv.createTrackbar("VALUE Min", "HSV", 0, 255, emptyFunction);
  cv.createTrackbar("VALUE Max", "HSV", 255, 255, emptyFunction);

  function processVideo() {
    cap.read(frame);

    if (frame.empty()) {
      console.log("Failed to capture frame from the camera.");
      return;
    }

    cv.cvtColor(frame, imgHsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(imgHsv, imgHsv, cv.COLOR_RGB2HSV);

    let hMin = cv.getTrackbarPos("HUE Min", "HSV");
    let hMax = cv.getTrackbarPos("HUE Max", "HSV");
    let sMin = cv.getTrackbarPos("SAT Min", "HSV");
    let sMax = cv.getTrackbarPos("SAT Max", "HSV");
    let vMin = cv.getTrackbarPos("VALUE Min", "HSV");
    let vMax = cv.getTrackbarPos("VALUE Max", "HSV");

    let lower = new cv.Scalar(hMin, sMin, vMin, 0);
    let upper = new cv.Scalar(hMax, sMax, vMax, 255);

    cv.inRange(imgHsv, lower, upper, mask);
    cv.bitwise_and(frame, frame, result, mask);

    cv.cvtColor(mask, mask, cv.COLOR_GRAY2BGR);

    cv.hconcat([frame, mask, result], hStack);

    cv.imshow('Horizontal Stacking', hStack);
    requestAnimationFrame(processVideo);
  }

  videoElement.onloadedmetadata = () => {
    videoElement.play();
    requestAnimationFrame(processVideo);
  };
};

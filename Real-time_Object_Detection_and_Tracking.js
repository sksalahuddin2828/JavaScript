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
  let imgContour = new cv.Mat();
  let imgBlur = new cv.Mat();
  let imgGray = new cv.Mat();
  let imgCanny = new cv.Mat();
  let kernel = new cv.Mat();
  let imgDil = new cv.Mat();
  let imgStack = new cv.Mat();

  cv.namedWindow("Parameters");
  cv.resizeWindow("Parameters", 640, 240);
  cv.createTrackbar("Threshold1", "Parameters", 23, 255, emptyFunction);
  cv.createTrackbar("Threshold2", "Parameters", 20, 255, emptyFunction);
  cv.createTrackbar("Area", "Parameters", 5000, 30000, emptyFunction);

  function processVideo() {
    cap.read(frame);

    if (frame.empty()) {
      console.log("Failed to capture frame from the camera.");
      return;
    }

    imgContour = frame.clone();
    cv.GaussianBlur(frame, imgBlur, new cv.Size(7, 7), 1);
    cv.cvtColor(imgBlur, imgGray, cv.COLOR_BGR2GRAY);

    let threshold1 = cv.getTrackbarPos("Threshold1", "Parameters");
    let threshold2 = cv.getTrackbarPos("Threshold2", "Parameters");
    cv.Canny(imgGray, imgCanny, threshold1, threshold2);
    kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));
    cv.dilate(imgCanny, imgDil, kernel, new cv.Point(-1, -1), 1);

    getContours(imgDil, imgContour);

    imgStack = stackImages(0.8, [[frame, imgCanny], [imgDil, imgContour]]);

    cv.imshow("Result", imgStack);
    requestAnimationFrame(processVideo);
  }

  function getContours(img, imgContour) {
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(img, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);

    for (let i = 0; i < contours.size(); i++) {
      let area = cv.contourArea(contours.get(i));
      let areaMin = cv.getTrackbarPos("Area", "Parameters");

      if (area > areaMin) {
        cv.drawContours(imgContour, contours, i, new cv.Scalar(255, 0, 255, 255), 7);

        let perimeter = cv.arcLength(contours.get(i), true);
        let approx = new cv.Mat();
        cv.approxPolyDP(contours.get(i), approx, 0.02 * perimeter, true);

        let rect = cv.boundingRect(approx);
        cv.rectangle(imgContour, rect, new cv.Scalar(0, 255, 0, 255), 5);

        cv.putText(imgContour, "Points: " + approx.size(), new cv.Point(rect.x + rect.width + 20, rect.y + 20),
          cv.FONT_HERSHEY_COMPLEX, 0.7, new cv.Scalar(0, 255, 0, 255), 2);
        cv.putText(imgContour, "Area: " + Math.floor(area), new cv.Point(rect.x + rect.width + 20, rect.y + 45),
          cv.FONT_HERSHEY_COMPLEX, 0.7, new cv.Scalar(0, 255, 0, 255), 2);

        approx.delete();
      }
    }

    contours.delete();
    hierarchy.delete();
  }

  videoElement.onloadedmetadata = () => {
    videoElement.play();
    requestAnimationFrame(processVideo);
  };
};

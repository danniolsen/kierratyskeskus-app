const nodeWebcam = require('node-webcam');
const imageRecognition = require('./imageRecognition');

const imageCapture = () => {
  const anotherCam = nodeWebcam.create();
  anotherCam.capture('./images/image', (err, data) => {
    if (data) {
      imageRecognition();
    }
  });
};

module.exports = imageCapture;

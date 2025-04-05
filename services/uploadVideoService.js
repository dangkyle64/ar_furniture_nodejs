import fs from 'fs';
import cv from 'opencv4nodejs-prebuilt-install';

export const processVideo = async (videoBuffer) => {
    const tempVideoPath = './temp_video.mp4';
    
    fs.writeFileSync(tempVideoPath, videoBuffer);

    const videoCaptureObj = new cv.VideoCapture(tempVideoPath);

    let frame;
    let frameCount = 0;
    let frames = [];

    while(true) {
        frame  = videoCaptureObj.read();

        if (frame.empty) {
            break;
        };
        frameCount++;
    };


    videoCaptureObj.release();
    cv.destroyAllWindows();

    fs.unlinkSync(tempVideoPath.tempVideoPath);

    return {
        message: 'Video processed successfully in-memory',
        videoSize: frames.length,
        frameCount: frameCount
    };
};
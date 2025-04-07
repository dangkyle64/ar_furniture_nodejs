import fs from 'fs';
import cv from 'opencv4nodejs-prebuilt-install';
import ffmpeg from 'fluent-ffmpeg';

export const processVideo = async (videoBuffer) => {
    const tempVideoPath = './recorded-video.webm';
    const tempMp4Path = './temp-video.mp4';

    fs.writeFileSync(tempVideoPath, videoBuffer);

    try {
        await convertWebmToMp4(tempVideoPath, tempMp4Path);

        const videoCaptureObj = new cv.VideoCapture(tempMp4Path);

        let frame;
        let frameCount = 0;
        let frames = [];

        while(true) {
            frame = videoCaptureObj.read();

            if (frame.empty) {
                break;
            };
            frames.push(frame);
            frameCount++;
        };

        videoCaptureObj.release();
        cv.destroyAllWindows();
        fs.unlinkSync(tempVideoPath); 
        fs.unlinkSync(tempMp4Path);   

        console.log({
            message: 'Video processed successfully in-memory',
            frameCount: frameCount
        });
        
    } catch(error) {
        console.error('Error processing video:', error);
    };
};

const convertWebmToMp4 = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject('Error converting video: ' + err))
            .run();
    });
};

/**
 * return {
        message: 'Video processed successfully in-memory',
        videoSize: frames.length,
        frameCount: frameCount
    };
 */
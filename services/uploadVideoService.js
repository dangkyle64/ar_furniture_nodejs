export const processVideo = async (videoBuffer) => {
    console.log('Video received with size:', videoBuffer.length, 'butes');

    return {
        message: 'Video processed successfully in-memory',
        videoSize: videoBuffer.length,
    };
};
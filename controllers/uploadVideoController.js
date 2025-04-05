import { processVideo } from "../services/uploadVideoService.js";

export const postUploadVideoController = async (request, response) => {

    if (!request.file) {
        return response.status(400).json({ error: 'No video file uploaded' });
    };

    try {
        const videoBuffer = request.file.buffer;

        const result = await processVideo(videoBuffer);

        response.status(200).json({
            result: result,
            message: 'Video processed successfully',
        });
    } catch(error) {
        console.error('Error processing video:', error);
        response.status(500).json({ error: 'Error processing video' });
    };
};
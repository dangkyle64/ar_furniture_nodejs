import { describe, it, expect, mock } from 'vitest';
import { processVideo } from '../../services/uploadVideoService';
import { postUploadVideoController } from '../../controllers/uploadVideoController';

vi.mock('../../services/uploadVideoService');

describe('uploadVideoController', () => {
    it('should return error message `No video file uploaded` when not given a video file', async () => {
        const request = {};
        const response = { json: vi.fn(), status: vi.fn().mockReturnThis() };
        await postUploadVideoController(request, response);

        expect(response.status).toHaveBeenCalledWith (400);
        expect(response.json).toHaveBeenCalledWith ({
            error: 'No video file uploaded',
        });
    });

    it('should return success message when a valid video file is uploaded', async () => {
        const mockResult = { message: 'Video processed successfully' };
        processVideo.mockResolvedValue(mockResult);

        const request = {
            file: { buffer: Buffer.from('mock video content') }
        };

        const response = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };

        await postUploadVideoController(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return error message when there is an error processing the video', async () => {
        const mockError = new Error('Error processing video');
        processVideo.mockRejectedValue(mockError);

        const request = {
            file: { buffer: Buffer.from('mock video content') }
        };

        const response = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };

        await postUploadVideoController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: 'Error processing video' });
    });

    it('should return error message when file property is missing in the request object', async () => {
        const request = {};
        const response = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };

        await postUploadVideoController(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            error: 'No video file uploaded',
        });
    });

    it('should return error message when an invalid file type is uploaded', async () => {
        const request = {
            file: { buffer: Buffer.from('mock text content'), mimetype: 'text/plain' }
        };

        const response = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };

        await postUploadVideoController(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            error: 'Error processing video',
        });
    });
});
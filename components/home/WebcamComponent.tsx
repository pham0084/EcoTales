'use client';
import React, { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    width?: number;
    height?: number;
}

const WebcamComponent: React.FC<WebcamProps> = ({ width = 640, height = 640 }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageCaptured, setImageCaptured] = useState(false);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startWebcam();
    }, []);

    const captureImageAndPause = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const capturedDataURL = canvas.toDataURL('image/png');

                const a = document.createElement('a');
                a.href = capturedDataURL;
                a.download = 'captured_image.png';
                document.body.appendChild(a); // Append the link to the document
                a.click();
                document.body.removeChild(a); // Remove the link from the document

                setImageCaptured(true);

                // Pause the video stream
                video.pause();
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <video ref={videoRef} width={width} height={height} autoPlay playsInline muted />
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src="./frog.png" alt="Dinosaur" style={{ width: '100%', height: 'auto' }} />

                <button
                    onClick={captureImageAndPause}
                    className={`absolute ${imageCaptured ? 'bg-gray-300 hover:bg-gray-400 text-gray-600 border-gray-500' : 'bg-green-300 hover:bg-green-400 text-green-600 border-green-500'} font-bold py-2 px-4 rounded border-4 mt-2`}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
                >
                    {imageCaptured ? 'Captured' : 'Capture and Pause'}
                </button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default WebcamComponent;


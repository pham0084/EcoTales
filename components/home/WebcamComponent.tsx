'use client';
import React, { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    width?: number;
    height?: number;
}

const WebcamComponent: React.FC<WebcamProps> = ({ width = 640, height = 640 }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImageData, setCapturedImageData] = useState<string | null>(null);

    let stream: MediaStream | null = null;

    useEffect(() => {
        const startWebcam = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startWebcam();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

            const capturedDataURL = canvas.toDataURL('image/png');
            setCapturedImageData(capturedDataURL);

            // Stop the webcam stream after capturing the image
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            {capturedImageData ? (
                <img src={capturedImageData} alt="Captured" width={width} height={height} />
            ) : (
                <video ref={videoRef} width={width} height={height} autoPlay playsInline muted={!stream} />
            )}
            <div className="mt-4">
                <button
                    onClick={captureImage}
                    className="bg-green-300 hover:bg-green-400 text-green-600 font-bold py-2 px-4 rounded border-green-500 border-4"
                >
                    Capture Image
                </button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default WebcamComponent;

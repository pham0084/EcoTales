import React, { useState, useEffect, useRef } from 'react';

interface WebcamProps {
    width?: number;
    height?: number;
}

const WebcamComponent: React.FC<WebcamProps> = ({ width = 640, height = 480 }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

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

    return <video ref={videoRef} width={width} height={height} autoPlay playsInline />;
};

export default WebcamComponent;
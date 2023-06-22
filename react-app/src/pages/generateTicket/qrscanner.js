import { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let scanInterval;

    const startScanning = async () => {
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      scanInterval = setInterval(() => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            clearInterval(scanInterval);
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            setIsScanning(false);
            onScan(code.data);
          }
        }
      }, 100);
    };

    if (isScanning) {
      startScanning();
    }

    return () => {
      clearInterval(scanInterval);
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning, onScan]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={() => setIsScanning(true)}>Scan QR Code</button>
    </div>
  );
}

export default QRScanner;

import { useRef, useEffect } from 'react';

type Props = {
  mediaStream: MediaStream;
  onCapture: (base64Image: string) => void;
};

const VideoCapture = ({ mediaStream, onCapture }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const videoElement = videoRef.current;

    if (ctx && canvas && videoElement) {
      videoElement.srcObject = mediaStream
    }
  }, [mediaStream]);

  const updateConstraints = () => {
    const track = mediaStream.getVideoTracks()[0]
    // 100~1000の間でランダムな数値を生成
    const random = Math.floor(Math.random() * (1000 + 1 - 100)) + 100;
    track.applyConstraints({
      width: { ideal: random },
      height: { ideal: random },
      frameRate: {ideal: 2}
    })
  }

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!ctx || !canvas) return;
    const base64Image = canvas.toDataURL('image/jpeg');
    onCapture(base64Image);
  };

  return (
    <div className="VideoCapture">
      <>
        <video ref={videoRef} autoPlay muted playsInline className='VideoCapture__video' />
        <canvas ref={canvasRef} className='VideoCapture__canvas' />
        <button onClick={(event) => {
          event.preventDefault();
          captureFrame()
        }} />
        <div onClick={updateConstraints}>Constraintsを更新</div>
      </>
    </div>
  );
};

export default VideoCapture;

import './VideoCapture.css';

import { useRef, useEffect, useState } from 'react';
import { getMediaTrackSettings } from '../utils';
import { Flex } from 'antd';

type Props = {
  mediaStream: MediaStream;
  onCapture: (base64Image: string) => void;
};

const VideoCapture = ({ mediaStream, onCapture }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [settings, setSettings] = useState<MediaTrackSettings>({});
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const videoElement = videoRef.current;
    setSettings(getMediaTrackSettings(mediaStream))

    if (ctx && canvas && videoElement) {
      videoElement.srcObject = mediaStream
    }
  }, [mediaStream]);

  const updateConstraints = async () => {
    const track = mediaStream.getVideoTracks()[0]
    // 100~1000の間でランダムな数値を生成
    // const random = Math.floor(Math.random() * (1000 + 1 - 100)) + 100;
    const random = 2000;
    await track.applyConstraints({
      width: { ideal: random },
      height: { ideal: random },
      frameRate: {ideal: 10}
    })
    setSettings(getMediaTrackSettings(mediaStream))
  }

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!ctx || !canvas) return;
    const base64Image = canvas.toDataURL('image/jpeg');
    onCapture(base64Image);
  };

  return (
    <>
      <div>
        <h3>MediaTrackSettings</h3>
        <pre>
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
      <div className="VideoCapture">
        <div>
          <video ref={videoRef} autoPlay muted playsInline className='VideoCapture__video' />
          <canvas ref={canvasRef} className='VideoCapture__canvas' />
        </div>
        <Flex gap="small" style={{ marginTop: 16 }}>
          <button onClick={(event) => {
            event.preventDefault();
            captureFrame()
          }}>撮影</button>
          <button onClick={updateConstraints}>Constraintsを更新</button>
        </Flex>
      </div>
    </>
  );
};

export default VideoCapture;

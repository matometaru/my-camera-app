import { useState } from 'react'
import useDevice from './hooks/useDevice';
import { getMediaTrackSettings } from './utils';
import VideoCapture from './componetns/VideoCapture';

const videoConstraints: MediaTrackConstraints = {
  facingMode: 'environment'
}

function App() {
  const deviceHook = useDevice();
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [settings, setSettings] = useState<MediaTrackSettings>({});
  

  const startVideoCapture = (async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
    setMediaStream(stream)
    setSettings(getMediaTrackSettings(stream))
  })

  return (
    <>
      <pre>
        {JSON.stringify(deviceHook.videoDevices, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(deviceHook.orientation, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(settings, null, 2)}
      </pre>
      { mediaStream && (
        <VideoCapture
          mediaStream={mediaStream}
          onCapture={(base64Image) => {
            console.log(base64Image)
          }}
        />
      )}
      <button onClick={startVideoCapture}>ビデオ開始</button>
    </>
  )
}

export default App

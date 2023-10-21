import { useState } from 'react'
import { useMount } from 'react-use';
import useDevice from './hooks/useDevice';
import { getMediaTrackSettings } from './utils';

const videoConstraints: MediaTrackConstraints = {
  facingMode: 'environment'
}

function App() {
  const deviceHook = useDevice();
  const [settings, setSettings] = useState<MediaTrackSettings>({});
 

  useMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
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
    </>
  )
}

export default App

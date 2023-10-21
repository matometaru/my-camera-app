import { useEffect, useState } from 'react'

function getVideoSize(mediaStream: MediaStream) {
  const track = mediaStream.getVideoTracks()[0]
  const { width, height } = track.getSettings()
  console.log({ width, height })
}

function App() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    setMediaStream(stream)
    getVideoSize(stream)
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App

import { useState } from 'react'
import useDevice from '../hooks/useDevice';
import useModal from '../hooks/useModal';
import VideoCapture from '../componetns/VideoCapture';
import { useUnmount } from 'react-use';
import { Modal, Flex } from 'antd'

type Props = {
  constraints: MediaStreamConstraints
};

const VideoCaptureManager = ({ constraints }: Props) => {
  const deviceHook = useDevice();
  const modalHook = useModal();
  const capturedModal = useModal();
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [base64Image, setBase64Image] = useState<string>('');

  const startVideoCapture = (async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    setMediaStream(stream)
  })

  const stopVideoCapture = () => {
    mediaStream?.getTracks().forEach((track) => {
      track.stop()
    })
    setMediaStream(null)
  }

  useUnmount(() => {
    stopVideoCapture()
  })

  return (
    <div className="VideoCaptureManager">
      { mediaStream && (
        <VideoCapture
          mediaStream={mediaStream}
          onCapture={(base64) => {
            setBase64Image(base64)
            capturedModal.handleOpen()
          }}
        />
      )}
      <Flex gap="small" style={{ marginTop: 16 }}>
        { mediaStream ? (
          <button onClick={stopVideoCapture}>ビデオ停止</button>
        ) : (
          <button onClick={startVideoCapture}>ビデオ開始</button>
        )}
        <button onClick={modalHook.handleOpen}>デバイス情報</button>
      </Flex>
      <Modal
        title="デバイス情報"
        open={modalHook.open}
        onCancel={modalHook.handleClose}
        style={{ minWidth: 800 }}
        footer={null}
      >
        <h3>カメラデバイス</h3>
        <pre>
          {JSON.stringify(deviceHook.videoDevices, null, 2)}
        </pre>
        <h3>デバイス向き</h3>
        <pre>
          {JSON.stringify(deviceHook.orientation, null, 2)}
        </pre>
      </Modal>
      <Modal
        title="キャプチャ"
        open={capturedModal.open}
        onCancel={capturedModal.handleClose}
        footer={null}
      >
        <img src={base64Image} style={{ width: '100%', height: 'auto' }} />
      </Modal>
    </div>
  )
};

export default VideoCaptureManager;
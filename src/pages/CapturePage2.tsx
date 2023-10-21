import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import VideoCaptureManager from '../componetns/VideoCaptureManager'

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: 'environment',
    width: { ideal: 1000 },
    height: { ideal: 1000 },
  },
  audio: false,
}

const CameraPage = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'カメラ1',
      children: <VideoCaptureManager constraints={constraints} />,
    },
    {
      key: '2',
      label: 'カメラ2',
      children: <VideoCaptureManager constraints={constraints} />,
    },
  ];

  return (
    <>
      <h3>MediaStreamConstraintsのサイズを指定</h3>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
      />
    </>
  )
}

export default CameraPage

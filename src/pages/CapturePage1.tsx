import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import VideoCaptureManager from '../componetns/VideoCaptureManager'

const constraints_no_size: MediaStreamConstraints = {
  video: {
    facingMode: 'environment',
  },
  audio: false,
}

const CameraPage = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'カメラ1',
      children: <VideoCaptureManager constraints={constraints_no_size} />,
    },
    {
      key: '2',
      label: 'カメラ2',
      children: <VideoCaptureManager constraints={constraints_no_size} />,
    },
  ];

  return (
    <>
      <h3>MediaStreamConstraintsのサイズを未指定</h3>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
      />
    </>
  )
}

export default CameraPage

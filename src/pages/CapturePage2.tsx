import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import VideoCaptureManager from '../componetns/VideoCaptureManager'
import Nav from '../componetns/Nav';

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
      <Nav />
      <h3>MediaStreamConstraintsのサイズを指定</h3>
      <p>サイズを指定した場合、video要素には指定したサイズの映像が表示されます。</p>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
      />
    </>
  )
}

export default CameraPage

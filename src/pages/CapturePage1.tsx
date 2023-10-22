import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import VideoCaptureManager from '../componetns/VideoCaptureManager'
import Nav from '../componetns/Nav';

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
      <Nav />
      <h3>MediaStreamConstraintsのサイズを未指定</h3>
      <p>iOSのブラウザでサイズ未指定の場合、カメラ1のビデオ開始 → カメラ2のビデオ開始を押すとvideo要素に表示されるサイズの幅と高さが逆なって表示されました。</p>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
      />
    </>
  )
}

export default CameraPage

import { useState } from 'react';
import { useMount, useOrientation } from 'react-use';

type OrientationCustomState = {
  angle: number;
  type: string;
  label: string;
}

const orientationMap: { [key: string]: string } = {
  "portrait-primary": "通常縦向きのデバイスをそのまま使用",
  "portrait-secondary": "通常縦向きのデバイスを180度回転",
  "landscape-primary": "通常横向きのデバイスをそのまま使用",
  "landscape-secondary": "通常横向きのデバイスを180度回転",
  "portrait": "縦向きのどちらでもOK（primaryまたはsecondary）",
  "landscape": "横向きのどちらでもOK（primaryまたはsecondary）",
}

export type DeviceHook = {
  videoDevices: MediaDeviceInfo[];
  orientation: OrientationCustomState
}

export default function useDevice(): DeviceHook {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const orientation = useOrientation();

  useMount(async () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      setVideoDevices(videoDevices)
    });
  })

  const orientationState: OrientationCustomState = {
    angle: orientation.angle,
    type: orientation.type,
    label: orientationMap[orientation.type],
  }

  return {
    videoDevices,
    orientation: orientationState,
  };
}

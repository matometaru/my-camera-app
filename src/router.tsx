import { createBrowserRouter } from 'react-router-dom';

import CapturePage1 from './pages/CapturePage1';
import CapturePage2 from './pages/CapturePage2';

export const router = createBrowserRouter([
  // ログインなしでも見れる
  {
    path: '/',
    children: [
      { path: '/', element: <CapturePage1 /> },
      { path: '/capture-2', element: <CapturePage2 /> },
    ]
  },
]);
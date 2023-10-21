import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      <ul>
        <li><a href={import.meta.env.BASE_URL}>サイズ未指定</a></li>
        <li><a href={`${import.meta.env.BASE_URL}capture-2`}>サイズ指定</a></li>
      </ul>
      <RouterProvider router={router} />
    </>
  )
}

export default App

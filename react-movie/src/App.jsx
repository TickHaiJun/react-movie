import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import router from './routes'
import AuthContextProvider from './context/AuthContextWrapper'
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ButtonBar from './components/BottomBar/BottomBar';
import Index from './pages/Index/Index';
import DetailInfo from './pages/DetailInfo/DetailInfo';
import Payment from './pages/Payment/Payment';
import ResultPage from './pages/ResultPage/ResultPage'


function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App

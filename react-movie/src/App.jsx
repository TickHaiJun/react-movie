import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ButtonBar from './components/BottomBar/BottomBar';
import Index from './pages/Index/Index';
import DetailInfo from './pages/DetailInfo/DetailInfo';
import Payment from './pages/Payment/Payment';
// import './App.css'

function App() {
 

  return (
    <>
      <div>
        {/* <Index />
        <ButtonBar /> */}
       <Payment/>
      </div>
      
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ButtonBar from './components/BottomBar/BottomBar';
import Index from './pages/Index/Index';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Index />
        <ButtonBar />
       
      </div>
      
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/components/ui/button'
import Hero from './components/components/custom/Hero'
import { Toaster } from 'react-hot-toast';
import Features from './components/components/custom/Features'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-center" />
      <Hero />
      <Features />
    </>
  )
}

export default App

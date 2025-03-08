import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MyPlayer from './components/MyPlayer'
import NavBar from './components/NavBar'
import { useRef } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"
function App() {

  let time = 0
  let animationId = null
  let inputRef = useRef(null)
  function runanimaton () {
    if(inputRef.current?.value<1000){
      time= time+0.5
      inputRef.current.value = time
      console.log(inputRef.current.value);
      
    animationId = requestAnimationFrame(runanimaton)

    }else{
      cancelAnimationFrame(animationId)
    }
    // console.log(inputRef.current.value +=1);
    
  }
  return (
    <>
      <div>
        <NavBar/>
      <MyPlayer/>
      </div>
    </>
  )
}

export default App

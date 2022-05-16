import React from 'react'
import './App.scss'
import ChartWave from './components/ChartWave'
import Weather from './components/Weather'

function App() {
  return (
    <div className="App">
      <div className="App__top">
        <Weather />
      </div>
      <div className="App__bottom">
        <ChartWave />
      </div>
    </div>
  )
}

export default App

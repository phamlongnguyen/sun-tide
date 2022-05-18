import React from 'react'
import './App.scss'
import ChartWave from './components/ChartWave'
import Weather from './components/Weather'
import { chartWeather } from './Services/mockData'

function App() {
  return (
    <div className="App">
      <div className="App__top">
        <Weather />
      </div>
      <div className="App__bottom">
        <ChartWave data={chartWeather} />
      </div>
    </div>
  )
}

export default App

import React from 'react'
import './App.scss'
import Chart from './components/Chart'
import Weather from './components/Weather'
import { chartWeather } from './services/mockData'

function App() {
  return (
    <div className="App">
      <div className="App__top">
        <Weather />
      </div>
      <div className="App__bottom">
        <Chart data={chartWeather} />
      </div>
    </div>
  )
}

export default App

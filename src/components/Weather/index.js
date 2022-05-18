import React from 'react'
import './Weather.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosNotifications } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaTemperatureHigh } from 'react-icons/fa'
import { IoIosWater } from 'react-icons/io'
import { getCountries, getWeatherByCountry } from '../../Services'

const initCountry = {
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d',
    },
  ],
  main: {
    temp: 302.23,
    feels_like: 305.68,
    temp_min: 302.23,
    temp_max: 302.23,
    pressure: 1008,
    humidity: 68,
    sea_level: 1008,
    grnd_level: 973,
  },
  wind: {
    speed: 0.5,
    deg: 68,
    gust: 0.82,
  },
}

const Weather = () => {
  const [countries, setCountries] = React.useState([])
  const [selectCountry, setSelectedCountry] = React.useState('VN')
  const [weatherContry, setWeatherCountry] = React.useState(initCountry)

  React.useEffect(() => {
    getCountries().then(rs => setCountries(rs?.data || []))
  }, [])

  React.useEffect(() => {
    const country = countries.find(e => e.iso2 === selectCountry)
    if (country) {
      getWeatherByCountry({
        lat: country.lat,
        long: country.long,
      }).then(res => setWeatherCountry(res))
    }
  }, [selectCountry, countries])

  const onChangeCountry = async evt => {
    setSelectedCountry(evt.target.value)
  }
  return (
    <div className="Weather__container">
      <div className="Weather__top">
        <GiHamburgerMenu />
        <div className="Weather__top__location">
          <p className="Weather__top__location--p">myENV</p>
          <p className="Weather__top__location--current">
            <select
              id="countries"
              onChange={onChangeCountry}
              value={selectCountry}
            >
              {countries.map(e => {
                return (
                  <option key={e.iso2} value={e.iso2}>
                    {e.name}
                  </option>
                )
              })}
            </select>
          </p>
        </div>
        <IoIosNotifications />
      </div>
      <div className="Weather__center">
        <div className="Weather__center__info">
          <img
            className="Weather__center__info--cloud"
            src={`https://openweathermap.org/img/wn/${weatherContry.weather[0].icon}@2x.png`}
            alt="moon"
          />
          <div>
            <h1>{weatherContry.weather[0].main}</h1>
            <div className="Weather__center__info--deg">
              <p>
                <FaTemperatureHigh /> {weatherContry.wind.deg} C
              </p>
              <p>
                <IoIosWater /> {weatherContry.wind.gust}%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Weather__bottom">
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">PSI</div>
          <div className="Weather__bottom__info--psi">
            {weatherContry.main.feels_like}
          </div>
          <div>Good</div>
        </div>
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">RAIN</div>
          <div className="Weather__bottom__info--rain">
            {weatherContry.main.humidity}
          </div>
          <div>mm</div>
        </div>
        <div className="Weather__bottom__info">
          <div className="Weather__bottom__info--title">DENGUE</div>
          <div className="Weather__bottom__info--dengue " />
        </div>
        <div className="Weather__bottom__info">
          <AiOutlinePlusCircle className="Weather__bottom__info--add" />
          <div className="Weather__bottom__info--title">Add</div>
        </div>
      </div>
    </div>
  )
}

export default Weather

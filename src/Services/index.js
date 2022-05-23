import axios from 'axios'

export const getCountries = async () => {
  const url = `https://countriesnow.space/api/v0.1/countries/positions`
  return axios.get(url)
}

export const getWeatherByCountry = async ({ lat, long }) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=92ae361d56eed38547fc11b1e3003857`
  )
}

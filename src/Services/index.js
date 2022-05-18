export const getCountries = async () => {
  const response = await fetch(
    'https://countriesnow.space/api/v0.1/countries/positions'
  )
  return response.json()
}

export const getWeatherByCountry = async ({ lat, long }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=92ae361d56eed38547fc11b1e3003857`
  )
  return response.json()
}

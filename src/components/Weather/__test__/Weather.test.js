import { fireEvent, render, screen } from '@testing-library/react'
import Weather from '../index.js'
import axios from 'axios'
import { initWeather } from '../../../services/mockData.js'

describe('<Weather/>', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  jest.mock('axios')

  it('renders weather status', async () => {
    render(<Weather />)
    const element = screen.getByTestId('info-cloud')
    expect(element).toBeInTheDocument()
  })

  it('fetch API', async () => {
    axios.get = jest.fn().mockResolvedValueOnce(initWeather)
    render(<Weather />)
    const titleCloud = screen.getByTestId('cloud--title')
    expect(titleCloud.innerHTML).toEqual(initWeather.weather[0].main)
  })

  it('fetch list countries', async () => {
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ data: mockCountries })
      .mockResolvedValueOnce({ data: initWeather })
    render(<Weather />)
    const option = await screen.findAllByTestId('option-location')
    expect(option.length).toEqual(mockCountries.data.length)
  })

  it('select Yemen country', async () => {
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ data: mockCountries })
      .mockResolvedValueOnce({ data: mockSelectedCountry })
    render(<Weather />)
    await screen.findAllByTestId('option-location')
    fireEvent.change(screen.getByTestId('select-location'), {
      target: { value: 'YE' },
    })

    const selected = await screen.findByTestId('select-location')
    expect(selected.value).toEqual('YE')
  })
})

const mockCountries = {
  error: false,
  msg: 'countries and positions retrieved',
  data: [
    {
      name: 'Vietnam',
      iso2: 'VN',
      long: 106,
      lat: 16,
    },
    {
      name: 'Virgin Islands, British',
      iso2: 'VG',
      long: -64.5,
      lat: 18.5,
    },
    {
      name: 'Virgin Islands, U.S.',
      iso2: 'VI',
      long: -64.8333,
      lat: 18.3333,
    },
    {
      name: 'Wallis and Futuna',
      iso2: 'WF',
      long: -176.2,
      lat: -13.3,
    },
    {
      name: 'Western Sahara',
      iso2: 'EH',
      long: -13,
      lat: 24.5,
    },
    {
      name: 'Yemen',
      iso2: 'YE',
      long: 48,
      lat: 15,
    },
    {
      name: 'Zambia',
      iso2: 'ZM',
      long: 30,
      lat: -15,
    },
    {
      name: 'Zimbabwe',
      iso2: 'ZW',
      long: 30,
      lat: -20,
    },
  ],
}

const mockSelectedCountry = {
  coord: {
    lon: 48,
    lat: 15,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 303.85,
    feels_like: 301.92,
    temp_min: 303.85,
    temp_max: 303.85,
    pressure: 1010,
    humidity: 7,
    sea_level: 1010,
    grnd_level: 863,
  },
  visibility: 10000,
  wind: {
    speed: 4.84,
    deg: 34,
    gust: 9.11,
  },
  clouds: {
    all: 10,
  },
  dt: 1653286875,
  sys: {
    country: 'YE',
    sunrise: 1653272288,
    sunset: 1653318698,
  },
  timezone: 10800,
  id: 80383,
  name: 'Az Zali`ah',
  cod: 200,
}

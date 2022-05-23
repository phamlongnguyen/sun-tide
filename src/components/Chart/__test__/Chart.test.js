/* eslint-disable  */
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { chartWeather } from '../../../services/mockData.js'
import Chart from '../index.js'

afterEach(cleanup)
describe('<Chart/>', () => {
  it('Chart visible', async () => {
    const { container } = render(<Chart />)
    const weatherChart = container.querySelector('.Chart__wave__container')
    const svgElement = screen.getByTestId('chart-svg')
    expect(weatherChart).toContainElement(svgElement)
  })

  it('chart scroll', async () => {
    const { container } = render(<Chart data={chartWeather} />)
    const weatherChart = container.querySelector('.Chart__wave__container')
    const moon = container.querySelector('.Chart__wave__moon')
    await waitFor(() => expect(moon).toBeInTheDocument())
    expect(moon).toBeVisible()
    fireEvent.scroll(weatherChart, { target: { scrollLeft: 400 } })
    expect(moon).not.toBeVisible()
  })
})

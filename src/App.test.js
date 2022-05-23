import { render, screen } from '@testing-library/react'
import App from './App'

test('<App/>', () => {
  render(<App />)
  const name = screen.getByText(/myENV/i)
  expect(name).toBeInTheDocument()
})

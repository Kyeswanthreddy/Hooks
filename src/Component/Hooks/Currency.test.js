import { render, screen } from '@testing-library/react';
// import App from './App';
import Currency from './Currency'

test('renders Converted Amount link', () => {
  render(<Currency />);
  const linkElement = screen.getByText(/Converted Amount/i);
  expect(linkElement).toBeInTheDocument();
});


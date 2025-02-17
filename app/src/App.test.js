import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

globalThis.fetch = jest.fn();

describe(('FizzBuzz App'), () => {
  beforeEach(() => {
    fetch.mockClear();
  })

  test('renders the input field and submit button correctly', () => {
    render(<App />);
  
    expect(screen.getByLabelText(/Enter a List of numbers separated by commas:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
  
  test('sends valid input to fizzbuzz API and displays results', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        { value: 3, result: 'Fizz' },
        { value: 5, result: 'Buzz' },
        { value: 15, result: 'FizzBuzz' },
      ],
    });
  
    render(<App />);
  
    userEvent.type(screen.getByRole('textbox'), '3,5,15');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    expect(await screen.findByText(/fizz/i)).toBeInTheDocument();
    expect(screen.getByText(/buzz/i)).toBeInTheDocument();
    expect(screen.getByText(/fizzbuzz/i)).toBeInTheDocument();
  });

  test('handles invalid input correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        { value: '', result: 'Invalid Item' },
      ],
    });
  
    render(<App />);
  
    userEvent.type(screen.getByRole('textbox'), '3,5,invalid');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    expect(await screen.findByText(/invalid item/i)).toBeInTheDocument();
  });
  
  test('handles API errors correctly', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));
  
    render(<App />);
  
    userEvent.type(screen.getByRole('textbox'), '3,5,15');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    expect(await screen.findByText(/Server Error. Please, check if backend server is running/i)).toBeInTheDocument();
  });
})

import { useState } from 'react';
import './styles.css';
import ResultList from './components/ResultList';
import InputForm from './components/InputForm';

function App() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setResults([{ value: '', result: 'Invalid Item' }]);
            return;
        }
        const values = input.split(",").map((value) => (isNaN(value) ? value : Number(value)));
        try {
            const response = await fetch('http://localhost:5000/fizzbuzz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values }),
            });

            const data = await response.json();
            setResults(data);
            setError('');
        }
        catch (error) {
            setError('Server Error. Please, check if backend server is running');
        }
    };

    return (
        <div>
            <h1>FizzBuzz App</h1>
            <InputForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
            {error && <p className="error">{error}</p>}
            <ResultList results={results} />
        </div>
    );
}

export default App;

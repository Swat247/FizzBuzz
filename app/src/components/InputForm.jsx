import React from 'react';

const InputForm = ({ input, setInput, handleSubmit }) => {
    return (
    <form className="app-form" onSubmit={handleSubmit}>
        <label for="input-data">Enter a List of numbers separated by commas:
        </label>
        <div className="input-wrapper">
            <input
                id="input-data"
                type="text"
                value={input}
                placeholder="Ex. 1,2,3,4,5"
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
        </div>
    </form>);
};

export default InputForm;
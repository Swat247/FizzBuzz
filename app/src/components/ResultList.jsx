import React from 'react';
import './resultListStyles.css';

const ResultList = ({ results }) => {
    return (
        <div className="result-list">
            <h2 className="heading">Results:</h2>
            <ul>
                {results.map((item, index) => (
                    <li key={index}>{`${item.result}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default ResultList;
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());
app.post('/fizzbuzz', (req, res) => {
    const { values } = req.body;
    if(!Array.isArray(values) || values.length === 0) {
        return res.status(400).json({ error: 'Invalid Item' });
    }

    const results = values.map((value) => {
        if (typeof value !== 'number' || isNaN(value)) {
            return {value, result: 'Invalid Item'};
        }

        let result = '';
        if (value % 3 === 0) {
            result += 'Fizz';
        }
        if (value % 5 === 0) {
            result += 'Buzz';
        }
        if(result) return {value, result};

            return [
                { value, result: `Divided ${value} by 3` },
                { value, result: `Divided ${value} by 5` },
            ];
    
    });
    
        res.json(results.flat());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
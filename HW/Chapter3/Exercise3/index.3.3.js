const express = require('express');
const port = 3000;
const app = express();

app.get('/factorial', (req, res) => {
    return res.redirect(`/factorial/${req.query.number}`);
});

app.get('/factorial/:number', (req, res) => {
    let result = 1;
    let number = parseInt(req.params.number, 10);
    for (let i = 2; i <= number; i++)
        result *= i;
    res.send(`${result}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
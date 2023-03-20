const express = require('express');
import configViewEngine from './configs/viewEngine';

const app = express();
const port = 3000;


configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
// required packages
const fs = require('fs');
const express = require('express');
const layout = require('express-ejs-layouts');

// express app config
const app = express()
const PORT = 3001
app.set('view engine', 'ejs')
app.use(layout)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))

// middleware
app.use('/dinosaurs', require('/controllers/dinosaurs'))
app.use('/prehistoric', require('/controllers/prehistoric_creatures'))

// lists all dinosaurs
app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    console.log(dinosaurs);
  });

// listen on a port
app.listen(PORT, () => console.log(`is that dinos i hear ${PORT}🦕`))
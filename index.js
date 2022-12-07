// required packages
const express = require('express');
const layout = require('express-ejs-layouts');
const fs = require('fs');

// express app config
const app = express();
const PORT = 3001
app.set('view engine', 'ejs')
app.use(layout)
// tell express to listen for request bodies sent from HTML forms
app.use(express.urlencoded({ extended: false }))

// middleware
// app.use('/dinosaurs', require('/controllers/dinosaurs'))
// app.use('/prehistoric', require('/controllers/prehistoric_creatures'))

// route definitions
app.get('/', (req, res) => {
  res.render('home.ejs')
})

// lists all dinosaurs
app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/index', {myDinos: dinoData});
  });

//express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);
  
    //render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
  });

// new route
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new');
  });

// POST route
app.post('/dinosaurs', (req, res) => {
  // read dinosaurs file
  let dinosaurs = fs.readFileSync('./dinosaurs.json');
  let dinoData = JSON.parse(dinosaurs);

  // add item to dinosaurs array
  dinoData.push(req.body);

  // save dinosaurs to the data.json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

  //redirect to the GET /dinosaurs route (index)
  res.redirect('/dinosaurs');
});

// listen on a port
app.listen(PORT, () => console.log(`is that dinos i hear ${PORT}🦕`))
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const hbs = require('hbs');
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('assets'));
app.use(express.static('public'));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

//-----------------------------------------------------//
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

//-----------------------------------------------------//

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
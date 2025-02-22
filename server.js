const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.use(express.static('assets'));
app.use(express.static('public'));

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const express = require("express");
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = 3000;

const {formatDateToWIB, getRelativeTime} = require('./utils/time');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, "assets")));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

let blogs = [];

hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)

//-----------------------------------------------------//
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/blog', (req, res) => {
  console.log(blogs);
  res.render('blog-list', {blogs: blogs});

});

app.get('/blog-create', (req, res) => {
  res.render('blog-create');
});

app.post('/blog-create', (req, res) => {
  const { title, content } = req.body;

  let image = "https://picsum.photos/200/300";

  let newBlog = {
    title: title,
    content: content,
    image: "https://picsum.photos/200/300",
    author: "Asa Marsal",
    postedAt: new Date(),
  };

  blogs.push(newBlog);

  res.redirect('/blog');
});

app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/blog-detail', (req, res) => {
  res.render('blog-detail');
});

//-----------------------------------------------------//

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
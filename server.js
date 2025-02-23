const express = require("express");
const app = express();
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override');

const{renderBlog, renderBlogDetail, renderBlogEdit, createBlog, updateBlog, deleteBlog,} = require('./controllers/controller-v1');

const port = 3000;

const {formatDateToWIB, getRelativeTime} = require('./utils/time');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)

//-----------------------------------------------------//

//Index
app.get('/', (req, res) => {
  res.render('index');
});

//Blog List
app.get('/blog', renderBlog);

//Blog Create
app.get('/blog-create', (req, res) => {
  res.render('blog-create');
});

app.post('/blog-create', createBlog);

//Blog Edit
app.get('/blog-edit/:id', renderBlogEdit);

//Blog Save
app.patch('/blog-update/:id', updateBlog);

//Testimonials
app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});

//Contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

//Delete Existing Blog
app.delete('/blog/:id', deleteBlog);

//Blog Detail
app.get('/blog/:id', renderBlogDetail);

//-----------------------------------------------------//

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
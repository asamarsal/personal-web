const express = require("express");
const app = express();
const hbs = require('hbs');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const upload = require('./middlewares/upload-file');
require("dotenv").config();

// const{renderBlogEdit, updateBlog,} = require('./controllers/controller-v1');
const{renderHome,
      renderLogin,
      renderRegister,
      renderContact,
      renderTestimonials,
      renderError,
      authLogin,
      authLogout,
      authRegister, 
      renderBlog, 
      renderBlogDetail, 
      deleteBlog, 
      renderBlogCreate, 
      createBlog, 
      renderBlogEdit, 
      updateBlog,} = require('./controllers/controller-v2');

const port = process.env.SERVER_PORT || 3000;

const {formatDateToWIB, getRelativeTime} = require('./utils/time');
const checkUser = require("./middlewares/auth");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Modul
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, './uploads')));

app.use(methodOverride("_method"));

app.use(flash());
app.use(session({
  name: 'my-session',
  secret: 'qwertyuiop',
  resave: false,
  saveUninitialized: true,
}));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

hbs.registerHelper("formatDateToWIB", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)

//-----------------------------------------------------//

//Index
app.get('/', renderHome);

app.get('/login', renderLogin);

app.get('/register', renderRegister);

app.get("/logout", authLogout);

app.post('/login', authLogin);

app.post('/register', authRegister);

//Blog List
app.get('/blog', renderBlog);

//Blog Create
app.get('/blog-create', checkUser, renderBlogCreate);

app.post('/blog-create', checkUser, upload.single("image"), createBlog);

//Blog Edit
app.get('/blog-edit/:id', renderBlogEdit);

//Blog Save
app.patch('/blog-update/:id', updateBlog);

//Testimonials
app.get('/testimonials', renderTestimonials);

//Contact
app.get('/contact', renderContact);

//Delete Existing Blog
app.delete('/blog/:id', deleteBlog);

//Blog Detail
app.get('/blog/:id', renderBlogDetail);

app.get("*", renderError);

//-----------------------------------------------------//

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
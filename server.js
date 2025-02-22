const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/testimonials', (req, res) => {
  res.sendFile(path.join(__dirname, 'testimonials.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
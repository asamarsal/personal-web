const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

// Setup Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setup folder public untuk assets
app.use(express.static(path.join(__dirname, "public")));

// Route ke halaman utama
app.get("/", (req, res) => {
  res.render("home", {
    name: "Asa Marsal",
    experience: [
      { title: "Develop Personal Website", year: "2025" },
    ],
    skills: [
      { title: "Frontend Developer", icon: "js.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
      { title: "Version Control", icon: "github.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
      { title: "Automated Deployment", icon: "deploy.png", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    ],
    socialMedia: ["facebook", "twitter", "instagram", "email", "whatsapp"]
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

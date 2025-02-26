const {Sequelize, where} = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const {Blog, User} = require("../models");
const flash = require("express-flash");
require("dotenv").config();
// const { updateBlog } = require("./controller-v1");

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

async function renderHome(req, res) {
    const user = req.session.user;
    res.render('index', {user: user});
}

async function renderContact(req, res) {
    const user = req.session.user;
    res.render('contact', {user: user});
}

async function renderTestimonials(req, res) {
    const user = req.session.user;
    res.render('testimonials', {user: user});
}

async function renderLogin(req, res) {
    const user = req.session.user;

    if(user) {
        req.flash("warning", "Anda sudah login!");
        res.redirect("/");
    } else {
        res.render('auth-login', {user: user});
    }
}

async function renderRegister(req, res) {
    const user = req.session.user;

    if(user) {
        return res.redirect("/");
    } else {
        res.render('auth-register', {user: user});
    }
}

async function authLogin(req, res) {
    const { email, password } = req.body;
    console.log("emailnya: ",email, "passwordnya: ", password);

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    //Cek jika user tidak dalam DB
    if(!user) {
        req.flash("error", "User tidak ditemukan!");
        return res.redirect("/login");
    }

    //Cek jika password tidak sesuai
    const isValidated = await bcrypt.compare(password, user.password);

    if(!isValidated) {
        req.flash("error", "Password tidak sesuai!");
        return res.redirect("/login");
    }

    let loggedInUser = user.toJSON();
    delete loggedInUser.password;

    console.log("After password deleted: ", loggedInUser);
    req.session.user = loggedInUser;

    req.flash("success", `Login Berhasil!, ${loggedInUser.name}`);

    res.redirect("/");
}

async function authRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if(password != confirmPassword) {
        req.flash("error", "Password dan Confirm Password Tidak Sesuai!");
        return res.redirect("/register");
    }

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    if(user) {
        req.flash("error", "Email sudah terdaftar!");
        return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds = 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // const userInsert = await User.create(newUser);

    console.log("user baru :", newUser);

    req.flash("success", "Register Berhasil!, Silahkan Login");

    res.redirect("/login");
}

async function authLogout(req, res) {
    req.session.user = null;

    res.redirect("/login");
}

async function renderBlog(req, res) {
    const user = req.session.user;

    const blogs = await Blog.findAll(
        {
            include: {
                model: User,
                as: "user",
                attributes: {exclude: ["password"]},
            },
            order: [["createdAt", "DESC"]],
        },
    );
    // console.log("Paling Atas",blogs);
    // console.log("blog-list", blogs[0].user);

    if(user) {
        res.render('blog-list', {blogs: blogs, user: user});
    } else {
        res.render('blog-list', {blogs: blogs});
    }
}

async function renderBlogDetail(req, res) {
    const user = req.session.user;

    const id = req.params.id;
    try {

        // ================
        const blogYangDipilih = await Blog.findOne({
            where: {
                id: id,
            },
        });
    
        if(blogYangDipilih === null) {
            res.render('page-404');
        } else {
            res.render('blog-detail', {blog: blogYangDipilih, user: user});
        }
        // ================

    } 
    catch (error) {
        console.error("Error:", error);
        res.status(404).render('page-404');
    }

}

async function deleteBlog(req, res) {
    const {id} = req.params;

    const deleteResult = await Blog.destroy({
        where: {
            id: id,
        },
    });

    res.redirect("/blog");
}

async function renderBlogCreate(req, res) {
    //Render Halaman Create Blog
    const user = req.session.user;

    if (user) {
        return res.render("blog-create", { user: user }); 
      } else {
        res.redirect("/login");
      }
}

async function createBlog(req, res) {

    const { title, content } = req.body;
    const user = req.session.user;
    let dummyimage = "https://picsum.photos/200/300";

    if(!user) {
        req.flash("error", "Please login first!");
        return res.redirect('/login');
    }

    const image = req.file.path;
    console.log("image di upload :", image);

    const newBlog = {
        title,
        content,
        image: image,
        authorId: user.id
    }

    const resultSubmit = await Blog.create(newBlog);

    res.redirect('/blog');

    //Create Blog Submission
}

async function renderBlogEdit(req , res) {
    const {id} = req.params;

    const user = req.session.user;

    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id,
        },
    });

    if(!user) {
        return res.redirect('/login');
    }
    
    if(blogYangDipilih === null) {
        res.render('page-404');
    } else {
        res.render('blog-edit', {blog: blogYangDipilih, user: user});
    }
    //Render Halaman Edit Blog
}

async function updateBlog(req , res) {
    const id = req.params.id;
    const { title, content } = req.body;

    const updateResult = await Blog.update(
        {
            title,
            content,
            updatedAt: sequelize.fn('NOW'),
        },
        {
            where: {
                id: id,
            },
        }
    );

    res.redirect('/blog');

    //Update Blog
}

async function renderError(req, res) {
    const user = req.session.user;
    res.render('page-404', {user: user});
}

module.exports = {
    renderLogin,
    renderRegister,
    renderContact,
    renderTestimonials,
    renderError,
    renderHome,
    authLogin,
    authLogout,
    authRegister,
    renderBlog, 
    renderBlogDetail, 
    deleteBlog, 
    renderBlogCreate, 
    createBlog, 
    renderBlogEdit, 
    updateBlog};
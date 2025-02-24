const {Sequelize, where} = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const {Blog, User} = require("../models");

// const { updateBlog } = require("./controller-v1");

const sequelize = new Sequelize(config.development);

async function renderHome(req, res) {
    const user = req.session.user;
    res.render('index', {user: user});
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
    const blogs = await Blog.findAll(
        {
            order: [["createdAt", "DESC"]],
        }
    );
    console.log(blogs);
    res.render('blog-list', {blogs: blogs});
}

async function renderBlogDetail(req, res) {
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
            res.render('blog-detail', {blog: blogYangDipilih});
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
    res.render('blog-create');
}

async function createBlog(req, res) {
    const { title, content } = req.body;
    let image = "https://picsum.photos/200/300";

    const newBlog = {
        title,
        content,
        image,
    }

    const resultSubmit = await Blog.create(newBlog);

    res.redirect('/blog');

    //Create Blog Submission
}

async function renderBlogEdit(req , res) {
    const {id} = req.params;

    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id,
        },
    });
    
    if(blogYangDipilih === null) {
        res.render('page-404');
    } else {
        res.render('blog-edit', {blog: blogYangDipilih});
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

module.exports = {
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
const {Sequelize, QueryTypes} = require("sequelize");
const config = require("../config/config.js");
const { INSERT } = require("sequelize/lib/query-types");
const { query } = require("express");

require("dotenv").config();

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

let blogs = [
    {
      title: "Title 1",
      content: "Content 1",
      image: "https://picsum.photos/200/300",
      author: "Asa Marsal",
      postedAt: new Date(
        "July 20 2023, 69 00:20:18 GMT+0700 (Western Indonesia Time)"
      ),
    },
    {
      title: "Title 2",
      content: "Content 2",
      image: "https://picsum.photos/200/300",
      author: "Ujang Kodim",
      postedAt: new Date(
        "July 25 2023, 69 00:20:18 GMT+0700 (Western Indonesia Time)"
      ),
    }
  ];

async function renderBlog(req, res) {
    const blogs = await sequelize.query('SELECT * FROM public."Blogs" ORDER BY "createdAt" DESC', {
        type: QueryTypes.SELECT,
    });
    console.log(blogs);
    res.render('blog-list', {blogs: blogs});
}

async function renderBlogDetail(req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
    const blogYangDipilih = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.render('blog-detail', { blog: blogYangDipilih[0]});
}

async function createBlog(req, res) {
    const { title, content } = req.body;

    let image = "https://picsum.photos/200/300";

    let query = `INSERT INTO "Blogs" (title, content, image) VALUES ('${title}', '${content}', '${image}')`;

    const newBlog = await sequelize.query(query, {
        type: QueryTypes.INSERT,
    });

    // let newBlog = {
    //     title: title,
    //     content: content,
    //     image: "https://picsum.photos/200/300",
    //     author: "Asa Marsal",
    //     postedAt: new Date(),
    // };

    // blogs.push(newBlog);

    res.redirect('/blog');
}

async function renderBlogEdit(req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM "Blogs" WHERE id = ${id}`;
    const blogYangDipilih = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    });

    res.render('blog-edit', { blog: blogYangDipilih[0]});
}

async function updateBlog(req, res) {
    const id = req.params.id;
    const { title, content } = req.body;

    const query = `UPDATE "Blogs" SET title = '${title}', content = '${content}' WHERE id = ${id}`;

    const updateResult = await sequelize.query(query, {
        type: QueryTypes.UPDATE,
    });

    console.log("Hasil :", updateResult);

    //------------------------------------------------
    // let image = "https://picsum.photos/200/300";

    // let updatedBlog = {
    //     title: title,
    //     content: content,
    //     image: "https://picsum.photos/200/300",
    //     author: "Sumanto",
    //     postedAt: new Date(),
    // };

    // blogs[id] = updatedBlog;

    //------------------------------------------------

    res.redirect('/blog');
}

async function deleteBlog(req, res) {
    const id = req.params.id;
    const query = `DELETE FROM "Blogs" WHERE id = ${id}`;

    const deleteResult = await sequelize.query(query, {
        type: QueryTypes.DELETE,
    });

    console.log("Hasil :", deleteResult);

    // blogs.splice(id, 1);

    res.redirect('/blog');
}

module.exports = {
    renderBlog,
    renderBlogDetail,
    renderBlogEdit,
    createBlog,
    updateBlog,
    deleteBlog,
};
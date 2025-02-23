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

function renderBlog(req, res) {
    console.log(blogs);
    res.render('blog-list', {blogs: blogs});
}

function renderBlogDetail(req, res) {
    const id = req.params.id;
    res.render('blog-detail', { blog: blogs[id] });
}

function createBlog(req, res) {
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
}

function renderBlogEdit(req, res) {
    const id = req.params.id;

    res.render('blog-edit', { blog: blogs[id], index: id });
}

function updateBlog(req, res) {
    const { title, content } = req.body;
    const id = req.params.id;

    let image = "https://picsum.photos/200/300";

    let updatedBlog = {
        title: title,
        content: content,
        image: "https://picsum.photos/200/300",
        author: "Sumanto",
        postedAt: new Date(),
    };

    blogs[id] = updatedBlog;

    res.redirect('/blog');
}

function deleteBlog(req, res) {
    const id = req.params.id;

    blogs.splice(id, 1);

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
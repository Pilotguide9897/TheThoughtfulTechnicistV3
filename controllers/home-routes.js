const router = require("express").Router();
const { BlogPost, Bloggers, Comment } = require("../models");
const hasAuthorization = require("../utils/authorize");

// Render homepage
router.get("/", async (req, res) => { // localhost:3001/
  try {
    const postData = await BlogPost.findAll({
      include: [
        {
          model: Bloggers,
          attributes: ["username"],
        },
      ],
    });

     if (!postData) {
       res.status(400).json({ message: "No posts currently available." });
       return;
     }

    const blogpostData = postData.map((blogPost) =>
      blogPost.get({ plain: true }));

      console.log(blogpostData);

    res.render('homepage', {
      logged_in: req.session.logged_in,
      blogpostData,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "We are experiencing a problem retrieving the posts.", error: err });;
  }
});

// Render login page
router.get("/login", async (req, res) => { // localhost:3001/login
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  try {
    res.render("login");
  } catch (err) {
    res
      .status(500)
      .json({
        message: "We are experiencing a problem retrieving your desired page.",
        error: err,
      });
  }
});

// Render signup page
router.get("/", async (req, res) => { // localhost:3001/signup
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  try {
    res.render("signup");
  } catch (err) {
    res
      .status(500)
      .json({
        message: "We are experiencing a problem retrieving your desired page.",
        error: err,
      });
  }
});

// Render individual blog posts in their own separate page -- linked from the homepage
router.get("/post/:id", hasAuthorization, async (req, res) => { //localhost:3001/post/:id
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "creator_id", "createdAt"],
          order: [["createdAt", "ASC"]]
        },
        {
            model: Bloggers
        }
      ],
    });

      if (!postData) {
        res.status(400).json({
          message: "Unable locate your post.",
          data: postData,
        });
        return;
      }

    const singlePost = postData.get({ plain: true });

    res.render("post", {
      singlePost,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected difficulty retrieving the post.',
      error: err,
    });
  }
});

// Render a user's individual blog post for editing or deletion
router.get("/edit/:id", hasAuthorization, async (req, res) => { // localhost:3001/edit/:id
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "creator_id", "createdAt"],
          order: [["createdAt", "ASC"]],
        },
        {
          model: Bloggers,
        },
      ],
    });

    if (!postData) {
      res.status(400).json({
        message: "Unable locate your post.",
        data: postData,
      });
      return;
    }

    const singlePost = postData.get({ plain: true });

    res.render("post", {
      singlePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an unexpected difficulty retrieving the post.",
      error: err,
    });
  }
});

// Render create new post page
router.get("/new", hasAuthorization, async (req, res) => { // localhost:3001/new
try {
  res.render("createPost", {
    logged_in: req.session.logged_in,
  });
} catch (err) {
  res
    .status(500)
    .json({
      message: "We are experiencing a problem retrieving your desired page.",
      error: err,
    });
}
});

module.exports = router;
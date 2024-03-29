// API routes for managing user interactions with the site
const router = require("express").Router();
const { BlogPost, Bloggers, Comment } = require("../../models");
const hasAuthorization = require("../../utils/authorize");

// GET all posts by all users
router.get("/", async (req, res) => { // localhost:3001/api/posts/
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

    const blogPostData = postData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    
    console.log (postData);
    res.render("dashboard", {
      blogPostData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server unable to reach post data', err });
  }
});

// GET all posts by current user
router.get("/dashboard", async (req, res) => { // localhost:3001/api/posts/dashboard/
  try {
    const userId = req.session.user_id; // Get the user ID from the session

    const postData = await BlogPost.findAll({
      where: {
        creator_id: userId, // Filter posts by the user's ID
      },
    });

    const blogpostData = postData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    res.render("dashboard", {
      blogpostData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: "Server unable to reach post data", err });
  }
});

// GET posts by id
router.get("/posts/:id", async (req, res) => { // localhost:3001/api/posts/:id
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!postData) {
      res.status(400).json({
        message: "Unable to find a post with that id.",
        data: postData,
      });
      return;
    }

    const post = postData.get({ plan: true });
    res.render("post", { post });
  } catch (err) {
    console.error({
      message: "There was a problem retrieving the post.",
      error: err,
    });
    res.status(500).json({
      message: "There was a problem retrieving the post.",
      error: err,
    });
  }
});

// POST new post
router.post("/new", hasAuthorization, async (req, res) => { // localhost:3001/api/posts/new
  try {
    const username = await Bloggers.findByPk(req.session.user_id);

    const newBlogPost = await BlogPost.create({
      ...req.body,
      creator_id: req.session.user_id,
    });
    res.status(200).json({ message: "Blog post added successfully." });
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to create post", err });
  }
});

// UPDATE post by id
router.put("/update/:id", hasAuthorization, async (req, res) => { // localhost:3001/api/posts/update/:id
  try {
    const postId = req.params.id;
    console.log("Request Post ID:", postId);
    const { title, post_content } = req.body;
    console.log("Request Body:", req.body);
    console.log({ creator_id: req.session.user_id});
    const updatedPost = await BlogPost.update(
      { title, post_content },
      {
        where: {
          id: postId,
          creator_id: req.session.user_id,
        },
      }
    );

    if (updatedPost[0]) {
      console.log("Blog post updated successfully");
      res.status(200).json({ message: "Blog post updated successfully." });
    } else {
      console.log("Blog post not found");
      res.status(404).json({ message: "Blog post not found." });
    }
  } catch (err) {
    console.error("Error in /update/:id route:", err);
    res.status(500).json({ message: "Unable to update blog post", err });
  }
});

// Create comment
router.post("/post/:id", hasAuthorization, async (req, res) => {
  console.log("Comment route called");
  console.log("Request body:", req.body);
  console.log("User ID:", req.session.user_id);
  console.log("Post ID:", req.params.id);
  try {
    const postComment = await Comment.create({
      content: req.body.commentContent,
      creator_id: req.session.user_id,
      post_id: parseInt(req.params.id),
    });
    console.log("Created comment:", postComment); // Log the created comment

    await res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.error(err); // Log the full error object
    res.status(400).json({ error: err.message });
  }
});


// DELETE post
router.delete("/delete/:id", hasAuthorization, async (req, res) => { // localhost:3001/api/posts/delete
  try {
    const postId = req.params.id;
    const postToDelete = await BlogPost.findOne({
      where: {
        id: postId,
        creator_id: req.session.user_id,
      },
    });

    if (postToDelete) {
      await BlogPost.destroy({
        where: {
          id: postId,
        },
      });

      res.status(200).json({ message: "Blog post deleted successfully." });
    } else {
      res.status(404).json({ message: "Blog post not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Unable to delete blog post", err });
  }
});

module.exports = router;
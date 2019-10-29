/*dependencies*/
const express = require("express");
const router = require("express").Router();

/*imports*/
const Posts = require("../data/db.js");

/*requests*/

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  !title || !contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : Posts.insert(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          });
        });
});

router.post("/:id/comments", (req, res) => {
  const { text, post_id } = req.body;

  !post_id
    ? res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    : !text
    ? res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment" })
    : Posts.insertComment(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the comment to the database"
          });
        });
});

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      comments
        ? res.status(200).json(comments)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;

  Posts.update(req.params.id, req.body);

  !req.params.id
    ? res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    : !title || !contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : Posts.update(req.params.id, req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "The post information could not be modified"
          });
        });
});

module.exports = router;

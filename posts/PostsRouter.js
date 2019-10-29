/*dependencies*/
const express = require('express')
const router = require("express").Router();

/*imports*/
const Posts = require("../data/db.js");

/*requests*/



router.post("/", (req, res) => {
  const { title, contents } = req.body;

  !title || !contents
    ? res
        .status(400)
        .json({
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

module.exports = router;

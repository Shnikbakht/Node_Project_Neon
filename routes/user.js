const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
let users = require("./../users");

router.get("/", (req, res) => {
  res.render("users", { users: users });
});

router.get("/", (req, res) => {
  res.status(200).json({ data: users, success: true });
});

router.get("/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (user) {
    console.log("renderrrrrrrrrrrrrrrrrr")
    res.render('user',{user:user});
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

router.post(
  "/",
  [
    body("first_name").trim().not().isEmpty().withMessage("Must Not be empty"),
    body("email").isEmail().withMessage("must be in email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("must be atleast 8 character"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/user");
      //status(400).json({ errors: errors.array() });
    }
    req.body.id = parseInt(req.body.id); // Ensure you're receiving 'id' in your request body or adjust accordingly.
    users.push(req.body);
    res.redirect("/user");
  }
);

router.put(
  "/:id",
  [
    body("email").isEmail().withMessage("email format is wrong"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("must be atleast 8 character"),
    body("first_name").trim().not().isEmpty().withMessage("must not be empty"),
  ],
  (req, res) => {
    console.log("ddddddddddddddddddddddddddddddd")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    let found = false;
    users = users.map((user) => {
      if (user.id == parseInt(req.params.id)) {
        found = true;
        
        return { ...user, ...req.body };
      }
      return user;
    });
    if (!found) {
      res.status(404).json({ message: "User not found" });
    }
    console.log("putttttttttttttttttttttttttt")
    res.redirect("/user");
  }
);

router.delete("/:id", (req, res) => {
  users = users.filter((user) => {
    if (user.id !== parseInt(req.params.id)) {
      return user;
    }
  });
  return res.redirect("/user");
});

module.exports = router;

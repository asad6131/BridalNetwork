const express = require("express");
const router = express.Router();
const passport = require("passport");
const { multer, uploadImageToStorage } = require("../../config/multer");
// var multer = require("multer");
// var upload = multer();

router.post(
  "/single",
  multer.single("file"), 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // // console.log(req.body.table);
    // console.log(req.file);
    // return;
    const file = req.file;

    if (file) {
      uploadImageToStorage(file).then(url => res.json({ file: url }));
    } else {
      req.json({ file: "" });
    }
  }
);

router.post(
  "/multiple",
  multer.array("file", 6),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let urls = [];
    // // console.log(req);
    // // console.log(req.files);
    const files = req.files;
    const table = req.body.table;

    if (files) {
      for (var i = 0; i < files.length; i++) {
        uploadImageToStorage(files[i], table).then(url => {
          // console.log(url);
          urls.push(url);
        });
        // console.log(urls.length + " = " + files.length);
        if (urls.length === files.length) {
          res.json({ file: urls, table: table });
          break;
        }
      }
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load Validation
const validateVendorInput = require("../../validation/vendors");
const validateVendorInputUpdate = require("../../validation/vendorsupdate");

// Load User Model
const Vendors = require("../../models/Vendors");
const Fav = require("../../models/Fav");
const Users = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Vendors Works" }));
// router.get("/test", (req, res) => {
//   Vendors.find({
//     "$group": { category: "category" }
//   })
//     .limit(9)
//     .then(v => res.json(v))
//     .catch(err => res.json({ error: true }));
// });

// @route   GET api/vendors/all
// @desc    Get all vendor
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  // let sort = {};
  // sort.featured = -1;

  // if ((Math.floor(Math.random() * 11)) % 2 === 0) {
  //   sort.name = 1;
  // } else {
  //   sort._id = 1;
  // }

  Vendors.find({ active: { $eq: true } })
    .sort({ top: -1 })
    .populate("category")
    .populate("user")
    .then(vendors => {
      if (!vendors) {
        res.json({});
      }
      res.status(200).json(vendors);
    })
    .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
});


router.post("/all", (req, res) => {
  const errors = {};
  var limit = req.body.limit;
  var skip = req.body.skip;
  var cat = req.body.cat;
  // console.log('fetching vendors');
  // console.log(skip, limit, 'checking skip limit');
  if (cat != '') {
    // console.log('fetching vendors with cat id');
    Vendors.find({ category: cat, active: { $eq: true } })
      .sort({ top: -1 })
      .populate("category")
      .populate("user")
      .skip(skip)
      .limit(limit)
      .then(vendors => {
        // console.log(vendors.length);
        if (!vendors) {
          res.json({});
        }
        res.status(200).json(vendors);
      })
      .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
  } else {
    // console.log('fetching vendors without cat id');
    Vendors.find({ active: { $eq: true } })
      .sort({ top: -1 })
      .populate("category")
      .populate("user")
      .skip(skip)
      .limit(limit)
      .then(vendors => {
        if (!vendors) {
          res.json({});
        }
        res.status(200).json(vendors);
      })
      .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
  }
});


router.get("/allVendors", (req, res) => {
  const errors = {};

  Users.find({ user_type: "2" })
    .then(users => {
      // console.log(users, ' from nodejs');
      if (!users) {
        res.json({});
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({ users: "There are no users" }));
});


router.post("/searchviews",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.handle);
    Vendors.findOne({ handle: req.body.handle }).then(vendor => {
      // Add to exp array
      vendor.searchviews.unshift({ user: req.user.id });
      console.log(vendor);

      vendor.save().then(vendor => {
        console.log(vendor);
        res.json(vendor)
      });
    });
  });

router.post("/getsearchviews",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body);
    Vendors.findOne({ user: req.body.id })
      .then(v => {
        res.json({ views: v.searchviews });
      })
      .catch(err => {
        res.json({ views: [] });
      })
  });

router.get("/all2", (req, res) => {
  const errors = {};

  Vendors.find()
    .populate("category")
    .populate("user")
    .then(vendors => {
      // console.log(vendors, ' from nodejs');
      if (!vendors) {
        res.json({});
      }
      res.json(vendors);
    })
    .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
});

router.post("/assignuser", (req, res) => {
  const errors = {};
  // console.log(req.body);

  let user_id = "";
  let vendor_id = "";
  user_id = req.body.user_id;
  vendor_id = req.body.vendor_id;

  if (isEmpty(user_id) || isEmpty(vendor_id)) {
    errors.user_id =
      "There was some error assigning the user to vendor profile.";
    res.status(404).json(errors);
  } else {
    Vendors.find({ user: user_id })
      .then(user => {
        // console.log(user);
        if (!isEmpty(user)) {
          errors.user_id =
            "This user is already assigned to some vendor profile.";
          res.status(404).json(errors);
        } else {
          Vendors.findOneAndUpdate(
            { _id: vendor_id },
            { $set: { user: user_id } },
            { new: true }
          )
            .then(vendor => {
              // console.log(vendor);
              res.json(vendor);
            })
            .catch(err => {
              errors.user_id =
                "There was some error assigning the user to vendor profile.";
              res.status(404).json(errors);
            });
        }
      })
      .catch(err => {
        errors.user_id =
          "There was some error assigning the user to vendor profile.";
        res.status(404).json(errors);
      });
  }

  // console.log(req.body);

  // Vendors.find()
  //   .populate("category")
  //   .populate("user")
  //   .then(vendors => {
  //     if (!vendors) {
  //       res.json({});
  //     }
  //     res.json(vendors);
  //   })
  //   .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
});

// @route   POST api/vendors/filter
// @desc    Get all vendor
// @access  Public
router.post("/filter", (req, res) => {
  const errors = {};

  // console.log(req.body);

  let or = [];
  // or.push('5cfe71b627ef3e0844de5cf8');
  // or.push('5cfe71a727ef3e0844de5cf7');
  // or.push('5cfe717427ef3e0844de5cf5');
  // or.push('5cfe718627ef3e0844de5cf6');
  if (!isEmpty(req.body.artist) && req.body.artist === '1') {
    or.push('5d3ea32bfe97d500171b85d8');
  }
  if (!isEmpty(req.body.berkat) && req.body.berkat === '1') {
    or.push('5d44e1bea2bc0e0017bbff8e');
  }
  if (!isEmpty(req.body.cakes) && req.body.cakes === '1') {
    or.push('5d44e1aaa2bc0e0017bbff8d');
  }
  if (!isEmpty(req.body.stylist) && req.body.stylist === '1') {
    or.push('5d44e1e7a2bc0e0017bbff8f');
  }
  if (!isEmpty(req.body.heena) && req.body.heena === '1') {
    or.push('5d3e9ff6fe97d500171b85ca');
  }

  let data = []
  if (req.body.outfits != "") {
    data.push({
      name: req.body.outfits,
      min: req.body.outfits_budget.split(' - ')[0],
      max: req.body.outfits_budget.split(' - ')[1]
    })
  }
  if (req.body.photography != "") {
    data.push({
      name: req.body.photography,
      min: req.body.photography_budget.split(' - ')[0],
      max: req.body.photography_budget.split(' - ')[1]
    })
  }
  if (req.body.videography != "") {
    data.push({
      name: req.body.videography,
      min: req.body.videography_budget.split(' - ')[0],
      max: req.body.videography_budget.split(' - ')[1]
    })
  }
  if (req.body.deco != "") {
    data.push({
      name: req.body.deco,
      min: req.body.deco_budget.split(' - ')[0],
      max: req.body.deco_budget.split(' - ')[1]
    })
  }

  // let search = {};

  if (or.length > 0) {
    search = { $or: [{ category: { $in: or } }, { price: { $elemMatch: { $or: data } } }] }
  } else {
    search = { price: { $elemMatch: { $or: data } } };
  }

  // or.price = { $elemMatch: { $or: data } };

  // console.log(search);
  // console.log(or);
  // Vendors.find({ price: data, active: { $eq: true } })
  Vendors.find(search)
    .populate("category")
    .populate("user")
    .then(vendors => {
      // console.log(vendors.length);
      if (!vendors) {
        res.json({});
      }
      res.json(vendors);
    })
    .catch(err => res.status(404).json({ vendors: "There are no vendors" }));
});

// router.get('/categories', (req, res) => {
//   const errors = {};
//   Category.find()
//     .then(categories => {
//       if(!categories) {
//         res.json({});
//       } else {
//         let data = categories.map((item, index) => {

//         });

//         data = [];
//         for (var i = categories.length - 1; i >= 0; i--) {
//           // categories[i]
//           let rt = {};
//           Vendors.find({ category: categories[i]._id })
//           .then(vendor => {
//             rt = {
//               category: categories[i],
//               vendors: vendor
//             };
//           })
//           .catch(err => res.status(404).json({categories: 'There are no categories 2'}));
//           res.json(rt);
//         };
//         // res.json(data, 'asdasd');
//       }
//     })
//     .catch(err => res.status(404).json({categories: 'There are no categories'}));

//   Vendors.find()
//     .populate('category')
//     .then(vendors => {
//       // console.log(vendors, ' from nodejs');
//       if (!vendors) {
//         res.json({});
//       }
//       res.json(vendors);
//     })
//     .catch(err => res.status(404).json({ profile: 'There are no vendors' }));
// });

// @route   GET api/vendor/handle/:handle
// @desc    Get vendor by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Vendors.findOne({ handle: req.params.handle })
    .populate("user")
    // .populate('category')
    .then(vendor => {
      // console.log(vendor);
      if (!vendor) {
        errors.novendor = "There is no vendor for this user";
        res.status(404).json(errors);
      }

      res.json(vendor);
    })
    .catch(err => res.status(404).json(err));
});
router.get("/handleWIthCat/:handle", (req, res) => {
  const errors = {};

  Vendors.findOne({ handle: req.params.handle })
    .populate("category")
    .populate("user")
    .then(vendor => {
      // console.log(vendor);
      if (!vendor) {
        errors.novendor = "There is no vendor for this user";
        res.status(404).json(errors);
      }

      res.json(vendor);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/vendors/vendor/:user_id
// @desc    Get vendor by user ID
// @access  Public
router.get("/vendor/:user_id", (req, res) => {
  const errors = {};

  Vendors.findOne({ user: req.params.user_id })
    .populate("categories", ["name", "avatar"])
    .populate("user")
    .then(vendor => {
      if (!vendor) {
        errors.novendor = "There is no vendor for this id";
        res.status(404).json(errors);
      }

      res.json(vendor);
    })
    .catch(err =>
      res.status(404).json({ vendor: "There is no vendor for this id" })
    );
});
router.get("/vendor/:vendor_id", (req, res) => {
  const errors = {};

  Vendors.findOne({ user: req.params.vendor_id })
    .populate("categories", ["name", "avatar"])
    .populate("user")
    .then(vendor => {
      if (!vendor) {
        errors.novendor = "There is no vendor for this id";
        res.status(404).json(errors);
      }

      res.json(vendor);
    })
    .catch(err =>
      res.status(404).json({ vendor: "There is no vendor for this id" })
    );
});
router.get("/vendor_id/:vendor_id", (req, res) => {
  const errors = {};

  Vendors.findOne({ _id: req.params.vendor_id })
    .populate("categories", ["name", "avatar"])
    .populate("user")
    .then(vendor => {
      // console.log(vendor);
      if (!vendor) {
        errors.novendor = "There is no vendor for this id";
        res.status(404).json(errors);
      }

      res.json(vendor);
    })
    .catch(err =>
      res.status(404).json({ vendor: "There is no vendor for this id" })
    );
});

// @route   POST api/vendor
// @desc    Create vendor
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVendorInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const vendorFields = {};
    vendorFields.user = req.user.id;
    if (req.body.handle) vendorFields.handle = req.body.handle.toLowerCase();
    if (req.body.name) vendorFields.name = req.body.name;
    if (req.body.category) vendorFields.category = req.body.category;
    if (req.body.website) vendorFields.website = req.body.website;
    if (req.body.bio) vendorFields.description = req.body.bio;
    if (req.body.instagram) vendorFields.instagram = req.body.instagram;
    if (req.body.phone) vendorFields.phone = req.body.phone;
    if (req.body.avatar) vendorFields.avatar = req.body.avatar;
    // if (req.body.bio) vendorFields.bio = req.body.bio;
    // console.log(vendorFields);
    // return;
    // Check if handle exists
    Vendors.findOne({ handle: vendorFields.handle.toLowerCase() }).then(
      vendor => {
        // console.log(vendor);
        if (vendor) {
          errors.handle = "That username already exists";
          res.status(400).json(errors);
        } else {
          // Save Vendors
          new Vendors(vendorFields).save().then(vendor => res.json(vendor));
        }
      }
    );
  }
);

// @route   POST api/vendor
// @desc   Edit vendor
// @access  Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVendorInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const vendorFields = {};
    vendorFields.user = req.user.id;
    if (req.body.name) vendorFields.name = req.body.name;
    if (req.body.category) vendorFields.category = req.body.category;
    if (req.body.website) vendorFields.website = req.body.website;
    if (req.body.bio) vendorFields.description = req.body.bio;
    if (req.body.instagram) vendorFields.instagram = req.body.instagram;
    if (req.body.avatar) vendorFields.avatar = req.body.avatar;

    Vendors.findOneAndUpdate(
      { handle: req.body.handle },
      { $set: vendorFields },
      { new: true }
    ).then(vendor => res.json(vendor));
  }
);

router.post(
  "/updatevendormain",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVendorInputUpdate(req.body);
    // console.log(req.body);
    // return;
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let data = {};
    data.category = req.body.category ? req.body.category : "";
    data.description = req.body.description ? req.body.description : "";
    data.instagram = req.body.instagram ? req.body.instagram : "";
    data.website = req.body.website ? req.body.website : "";
    if (req.body.password) {
      data.password = req.body.password;
    }
    if (req.body.avatar) {
      data.avatar = req.body.avatar;
    }
    data.name = req.body.name ? req.body.name : "";

    data.artist = req.body.artist ? req.body.artist : "0";
    data.berkat = req.body.berkat ? req.body.berkat : "0";
    data.cakes = req.body.cakes ? req.body.cakes : "0";
    data.stylist = req.body.stylist ? req.body.stylist : "0";
    data.heena = req.body.heena ? req.body.heena : "0";
    // console.log(req.body);
    if (req.body.bridal === true) {
      data.price = [
        {
          name: "1 OUTFIT 4HRS",
          min: req.body.outfits14.split(" - ")[0],
          max: req.body.outfits14.split(" - ")[1]
        },
        {
          name: "1 OUTFIT 7HRS",
          min: req.body.outfits17.split(" - ")[0],
          max: req.body.outfits17.split(" - ")[1]
        },
        {
          name: "2 OUTFIT",
          min: req.body.outfits2.split(" - ")[0],
          max: req.body.outfits2.split(" - ")[1]
        },
        {
          name: "3 OUTFIT",
          min: req.body.outfits3.split(" - ")[0],
          max: req.body.outfits3.split(" - ")[1]
        },
        {
          name: "4 OUTFIT",
          min: req.body.outfits4.split(" - ")[0],
          max: req.body.outfits4.split(" - ")[1]
        }
      ];
    }

    if (req.body.photography === true) {
      data.price = [
        {
          name: "Event 4HRS",
          min: req.body.event4.split(" - ")[0],
          max: req.body.event4.split(" - ")[1]
        },
        {
          name: "Event 8HRS",
          min: req.body.event8.split(" - ")[0],
          max: req.body.event8.split(" - ")[1]
        },
        {
          name: "Event only + outdoor 10hrs",
          min: req.body.eventout10.split(" - ")[0],
          max: req.body.eventout10.split(" - ")[1]
        },
        {
          name: "Pre wed + Event + Outdoor",
          min: req.body.preeventout.split(" - ")[0],
          max: req.body.preeventout.split(" - ")[1]
        }
      ];
    }

    if (req.body.videography === true) {
      data.price = [
        {
          name: "Event 4HRS",
          min: req.body.event4video.split(" - ")[0],
          max: req.body.event4video.split(" - ")[1]
        },
        {
          name: "Event 8HRS",
          min: req.body.event8video.split(" - ")[0],
          max: req.body.event8video.split(" - ")[1]
        },
        {
          name: "Event only + outdoor 10hrs",
          min: req.body.eventout10video.split(" - ")[0],
          max: req.body.eventout10video.split(" - ")[1]
        },
        {
          name: "Pre wed + Event + Outdoor",
          min: req.body.preeventoutvideo.split(" - ")[0],
          max: req.body.preeventoutvideo.split(" - ")[1]
        }
      ];
    }

    if (req.body.catering === true) {
      data.price = [
        {
          name: "Full Deco + Catering",
          min: req.body.fcatering.split(" - ")[0],
          max: req.body.fcatering.split(" - ")[1]
        },
        {
          name: "Full Deco w/o Catering",
          min: req.body.fwcatering.split(" - ")[0],
          max: req.body.fwcatering.split(" - ")[1]
        }
      ];
    }

    Vendors.findOne({ user: req.user.id })
      .then(user => {
        if (user) {
          Vendors.findOneAndUpdate(
            { user: req.user.id },
            { $set: data },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          data.handle = Math.random()
            .toString(36)
            .replace("0.", "");
          data.user = req.user.id;
          new Vendors(data).save().then(vendor => res.json(vendor));
        }
      })
      .catch(err => res.json({}));
    // console.log(data);
  }
);

router.delete(
  "/del/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vendors.findOneAndRemove({ _id: req.params.id }).then(() =>
      res.json({ success: true })
    );
  }
);



router.post(
  "/updatevendormainbyadmin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVendorInputUpdate(req.body);
    // console.log(req.body);
    // return;
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let data = {};
    data.category = req.body.category ? req.body.category : "";
    data.description = req.body.description ? req.body.description : "";
    data.instagram = req.body.instagram ? req.body.instagram : "";
    data.website = req.body.website ? req.body.website : "";
    if (req.body.password) {
      data.password = req.body.password;
    }
    if (req.body.avatar) {
      data.avatar = req.body.avatar;
    }
    data.name = req.body.name ? req.body.name : "";

    data.artist = req.body.artist ? req.body.artist : "0";
    data.berkat = req.body.berkat ? req.body.berkat : "0";
    data.cakes = req.body.cakes ? req.body.cakes : "0";
    data.stylist = req.body.stylist ? req.body.stylist : "0";
    data.heena = req.body.heena ? req.body.heena : "0";
    console.log(req.body);
    if (req.body.bridal === true) {
      data.price = [
        {
          name: "1 OUTFIT 4HRS",
          min: req.body.outfits14.split(" - ")[0],
          max: req.body.outfits14.split(" - ")[1]
        },
        {
          name: "1 OUTFIT 7HRS",
          min: req.body.outfits17.split(" - ")[0],
          max: req.body.outfits17.split(" - ")[1]
        },
        {
          name: "2 OUTFIT",
          min: req.body.outfits2.split(" - ")[0],
          max: req.body.outfits2.split(" - ")[1]
        },
        {
          name: "3 OUTFIT",
          min: req.body.outfits3.split(" - ")[0],
          max: req.body.outfits3.split(" - ")[1]
        },
        {
          name: "4 OUTFIT",
          min: req.body.outfits4.split(" - ")[0],
          max: req.body.outfits4.split(" - ")[1]
        }
      ];
    }

    if (req.body.photography === true) {
      data.price = [
        {
          name: "Event 4HRS",
          min: req.body.event4.split(" - ")[0],
          max: req.body.event4.split(" - ")[1]
        },
        {
          name: "Event 8HRS",
          min: req.body.event8.split(" - ")[0],
          max: req.body.event8.split(" - ")[1]
        },
        {
          name: "Event only + outdoor 10hrs",
          min: req.body.eventout10.split(" - ")[0],
          max: req.body.eventout10.split(" - ")[1]
        },
        {
          name: "Pre wed + Event + Outdoor",
          min: req.body.preeventout.split(" - ")[0],
          max: req.body.preeventout.split(" - ")[1]
        }
      ];
    }

    if (req.body.videography === true) {
      data.price = [
        {
          name: "Event 4HRS",
          min: req.body.event4video.split(" - ")[0],
          max: req.body.event4video.split(" - ")[1]
        },
        {
          name: "Event 8HRS",
          min: req.body.event8video.split(" - ")[0],
          max: req.body.event8video.split(" - ")[1]
        },
        {
          name: "Event only + outdoor 10hrs",
          min: req.body.eventout10video.split(" - ")[0],
          max: req.body.eventout10video.split(" - ")[1]
        },
        {
          name: "Pre wed + Event + Outdoor",
          min: req.body.preeventoutvideo.split(" - ")[0],
          max: req.body.preeventoutvideo.split(" - ")[1]
        }
      ];
    }

    if (req.body.catering === true) {
      data.price = [
        {
          name: "Full Deco + Catering",
          min: req.body.fcatering.split(" - ")[0],
          max: req.body.fcatering.split(" - ")[1]
        },
        {
          name: "Full Deco w/o Catering",
          min: req.body.fwcatering.split(" - ")[0],
          max: req.body.fwcatering.split(" - ")[1]
        }
      ];
    }

    Vendors.findOne({ handle: req.body.handle })
      .then(user => {
        if (user) {
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: data },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          err => res.json({});
          // data.handle = Math.random()
          //   .toString(36)
          //   .replace("0.", "");
          // data.user = req.user.id;
          // new Vendors(data).save().then(vendor => res.json(vendor));
        }
      })
      .catch(err => res.json({}));
    // console.log(data);
  }
);

router.delete(
  "/del/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vendors.findOneAndRemove({ _id: req.params.id }).then(() =>
      res.json({ success: true })
    );
  }
);

router.post(
  "/slider/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check Validation
    // console.log(req.body);e
    // return;

    Vendors.findOne({ _id: req.body.vendor_id }).then(vendor => {
      // console.log(req.body.linkList);
      // const newIMG = {
      //   img: req.body.avatar,
      //   tags: req.body.tags
      // };
      // Add to exp array
      for (i = 0; i < req.body.linkList.length; i++) {
        vendor.slider.unshift(req.body.linkList[i]);
      }

      vendor.save().then(vendor => res.json(vendor));
    });
  }
);

router.delete(
  "/slider/:id/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params);
    Vendors.findOne({ handle: req.params.handle })
      .then(vendor => {
        // console.log(vendor);
        // Get remove index
        const removeIndex = vendor.slider
          .map(item => item.id)
          .indexOf(req.params.id);

        // Splice out of array
        vendor.slider.splice(removeIndex, 1);

        // Save
        vendor.save().then(vendor => res.json(vendor));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  "/slider2/:id/:v_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params);
    Vendors.findOne({ _id: req.params.v_id })
      .then(vendor => {
        // console.log(vendor);
        // Get remove index
        const removeIndex = vendor.slider
          .map(item => item.id)
          .indexOf(req.params.id);

        // Splice out of array
        vendor.slider.splice(removeIndex, 1);

        // Save
        vendor.save().then(vendor => res.json(vendor));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/submittags",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body);
    Vendors.findOne({ _id: req.body.vendor_id })
      .then(vendor => {
        // console.log(vendor);
        // Get remove index
        const removeIndex = vendor.slider
          .map(item => item.id)
          .indexOf(req.body.slider_id);

        const slider_url = vendor.slider[removeIndex].img;
        // console.log(removeIndex);
        // return;

        // Splice out of array
        vendor.slider.splice(removeIndex, 1);

        const newSlider = {
          img: slider_url,
          tags: req.body.tags
        };
        vendor.slider.unshift(newSlider);

        // console.log(vendor);

        vendor.save().then(done => {
          console.log(done);
          res.json(done);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/enable",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.active = true;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to enable this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/disable",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.active = false;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to disable this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/feature",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.featured = true;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to feature this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/unfeature",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.featured = false;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to unfeature this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/top",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.top = true;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to feature this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/untop",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.top = false;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to unfeature this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/addbrochure",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.brochure = req.body.brochure;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to update this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/removebrochure",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.brochure = "";

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to update this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vendors.findOneAndRemove({ _id: req.body._id }).then(() =>
      res.json({ success: true })
    );
  }
);

router.post(
  "/enableMsg",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.msg = true;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to enable this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/disableMsg",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const vendors = {};
    vendors.msg = false;

    Vendors.findOne({ handle: req.body.handle })
      .then(vendor => {
        if (vendor) {
          // Update
          Vendors.findOneAndUpdate(
            { handle: req.body.handle },
            { $set: vendors },
            { new: true }
          ).then(vendor => res.json(vendor));
        } else {
          res.status(404).json({ err: "Unable to enable this vendor." });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  '/view/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ _id: req.user.id }).then(user => {
      Vendors.findOne({ handle: req.params.id })
        .then(post => {
          // if (
          //   post.views.filter(like => like.user.toString() === req.user.id)
          //     .length > 0
          // ) {
          //   return res
          //     .status(400)
          //     .json({ alreadyliked: 'User already liked this post' });
          // }

          // Add user id to likes array
          post.views.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

router.post(
  '/fav/:handle',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ _id: req.user.id }).then(user => {
      Vendors.findOne({ handle: req.params.handle })
        .then(v => {
          Fav.findOne({ vendor: v._id })
            .then(vendor => {
              if (vendor) {
                vendor.remove().then(() => res.json({ success: false }));
              } else {
                const newData = new Fav({
                  vendor: v._id,
                  user: req.user.id
                })
                newData.save().then(() => res.json({ success: true }));
              }
            })
            .catch(err => res.status(404).json({ vendornotfound: 'No post found' }));
        })
        .catch(err => res.status(404).json({ vendornotfound: 'No post found' }));
    });
  }
);

router.get(
  '/myfav', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Fav.find({ user: req.user.id })
      .populate('vendor')
      .then(fav => {
        if (fav) {
          res.json(fav);
        } else {
          res.json({});
        }
      })
      .catch(err => res.status(404).json({}));
  });

router.post(
  '/getFavByUserID/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ _id: req.user.id }).then(user => {
      Vendors.findOne({ user: req.params.id })
        .then(vendor => {
          if (vendor) {
            Fav.find({ vendor: vendor._id })
              .then(fav => {
                if (fav) {
                  res.json(fav);
                } else {
                  res.json({});
                }
              })
              .catch(err => res.status(404).json({}));
          } else {
            res.json({})
          }
        })
        .catch(err => res.status(404).json({}));
    });
  }
);

module.exports = router;

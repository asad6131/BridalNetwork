const Multer = require("multer");
const firebase = require("firebase");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const util = require("util");
const uuidv1 = require("uuid/v1");

let multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1000 * 1000 * 7
  }
});

const storage = new Storage({
  projectId: "bridal-network-e9867.appspot.com",
  credentials: require("./firebase.json")
});

const bucket = storage.bucket("bridal-network-e9867.appspot.com");

const uploadImageToStorage = (file) => {
  let prom = new Promise((resolve, reject) => {
    if (!file) {
      reject("No image provided");
    }
    console.log(file);
    let newFileName =
      uuidv1({
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: new Date(Date.now()).getTime(),
        nsecs: 5678
      }) +
      "-" +
      Date.now().toString() +
      "-" +
      file.originalname;

    let fileUpload = bucket.file("/" + newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on("error", error => {
      // console.log(error);
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      fileUpload.makePublic(function (err) {
        // console.log(err);
      });
      // console.log('doneeeeeeeeee.........')
      const url = util.format(
        `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      );
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
  return prom;
};
module.exports = {
  multer,
  uploadImageToStorage
};

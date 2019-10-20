var User = require("../models/User");
var ChatMessage = require("../models/Chat");
var ContactList = require("../models/Contacts");
var uuid = require("uuidv4");

module.exports = {
  getUserList: (socket, uid) => {
    // ContactList.find(
    //   ({ $or: [{ user: uid }, { friend: uid }] },
    //   (err, data) => {
    //     if (data.length !== 0) {
    //       let newList = [];
    //       data.map(v => {
    //         newList.push({ _id: v._id, email: v.email });
    //       });
    //       socket.emit("all_Users", data);
    //     }
    //   })
    // );
    ContactList.find({ user: uid })
      .populate("user")
      .populate("friend")
      .then(user => socket.emit("all_Users", user))
      .catch(e => socket.emit("all_Users", []));
  },
  getChatList: (socket, uid) => {
    // console.log(uid);
    ChatMessage.find({ $or: [{ receiverId: uid }, { senderId: uid }] })
      .then(chats => {
        // console.log(chats, " asdasdasd");
        socket.emit("all_chats", chats);
      })
      .catch(e => console.log(e));
  },
  handleMessageSend: async (message, io, bucket) => {
    var imageFile = message.chat.image;
    if (imageFile) {
      var fileName = `${uuid()}.png`;
      var file2 = bucket.file("chat-images/" + fileName);
      await file2.save(imageFile, {
        metadata: { contentType: "image/jpeg" }
      });
      var yearlater = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      );
      file2.getSignedUrl({ action: "read", expires: yearlater }).then(url => {
        message.chat.image = url[0];
        ChatMessage.create(message)
          .then(chat => {
            io.emit("update_chat", chat);
          })
          .catch(e => console.log(e));
      });
    } else {
      // ChatMessage.find({ receiverId: message.receiverId, senderId: message.senderId, has_new: true })
      //   .then(msg => {
      //     if (msg && msg.length > 0) {
      //       msg.forEach(m => {
      //         console.log(m._id);
      //         // ChatMessage.findOneAndUpdate(
      //         //   { _id: m._id },
      //         //   { $set: { has_new: false } },
      //         //   { useFindAndModify: false }
      //         // )

      //       })
      //     }
      //   })
      ChatMessage.update(
        { receiverId: message.senderId, senderId: message.receiverId, has_new: true },
        { has_new: false },
        { multi: true })
        .then(res => {
          ChatMessage.create(message)
            .then(chat => {
              // console.log(chat);
              io.emit("update_chat", chat);
            })
            .catch(e => console.log(e));
        })
        .catch(err => console.log(err));

    }
  }
};

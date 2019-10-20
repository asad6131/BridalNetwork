import {
  GET_MESSAGES,
  GET_USERS,
  UPDATE_USER,
  UPDATE_CHAT,
  IMAGE_LOADER,
  GET_CHAT_NOTIFICATION
} from "./types";

export default class ChatAction {
  static sendMessage(chat, io) {
    // console.log(chat);
    return dispatch => {
      if (chat.chat.image) {
        dispatch({ type: IMAGE_LOADER });
      }
      io.emit("message_send", chat);
    };
  }
  i;
  static handleSockets(socket, uid) {
    return (dispatch, getState) => {
      socket.emit("getUsersAndChats", { userUid: uid });
      socket.on("all_Users", users => {
        dispatch({ type: GET_USERS, allUsers: users });
      });
      socket.on("all_chats", chats => {
        dispatch({ type: GET_MESSAGES, messages: chats });
      });
      socket.on("update_chat", chat => {
        // console.log(chat, ' asdadadadsdas');
        if (getState().auth.user.id == chat.receiverId) {
          dispatch({ type: GET_CHAT_NOTIFICATION });
        }
        var flag = false;
        var messages = getState().ChatReducer.messages;
        messages.length !== 0 &&
          messages.map(v => {
            if (v._id === chat._id) {
              flag = true;
            }
          });
        if (!flag) {
          // console.log(chat);
          dispatch({ type: UPDATE_CHAT, chat });
        }
      });
    };
  }
}

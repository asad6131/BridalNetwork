import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Link } from "react-router-dom";
import InnerNav from "../innerNav";
import notify_gif from '../msg_notify.png';
import ChatAction from "../../actions/chatAction";
import { allContacts, deleteContact } from "../../actions/chatinitActions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      message: "",
      messages: [],
      uploadImage: "",
      uploadImage1: "",
      imageStatus: false,
      showMore: 20,
      selectedChatLength: 0,
      scrollDisable: false,
      socket: null,
      notify: [],
      watchSocket: false,
      allUsers: []
    };
  }

  componentDidMount() {
    this.props.allContacts();
    this.handleChatList(this.props.messages);
    if (this.props.socket) {
      this.props.handleSockets(this.props.socket, this.props.auth.user.id);
    }
  }

  componentWillReceiveProps(props) {
    if (props.messages) {
      this.setState({ scrollDisable: false });
      let notify = [];
      props.messages.forEach(v => {
        if (v.has_new === true) {
          if (v.senderId != this.props.auth.user.id) {
            notify.push(v.senderId);
          }
        }
      });
      let result = [];
      let map = new Map();
      for (let item of notify) {
        if (!map.has(item)) {
          map.set(item, true);    // set any value to Map
          result.push(item);
        }
      }
      console.log(result);
      this.setState({ notify: result });
      this.handleChatList(props.messages);
    }
    if (props.chat) {
      this.setState({ chat: props.chat });
      this.setState({ allUsers: props.chat.contacts });
    }
    if (props.socket) {
      this.setState({ socket: props.socket });
      this.watchSocket(props.socket);
    }
  }

  watchSocket(socket) {
    if (!this.state.watchSocket) {
      this.props.handleSockets(socket, this.props.auth.user.id);
      this.setState({ watchSocket: true });
    }
  }

  handleChatList(messages) {
    const { id } = this.props.match.params;
    let selectedChats = messages.filter(
      v =>
        (v.senderId === id && v.receiverId === this.props.auth.user.id) ||
        (v.receiverId === id && v.senderId === this.props.auth.user.id)
    );
    this.setState({
      messages: selectedChats
    });
  }

  componentDidUpdate() {
    // const objDiv = document.getElementById("messageList");
    // if (!this.state.scrollDisable) {
    //   objDiv.scrollTop = objDiv.scrollHeight;
    // }
  }

  handleSubmit() {
    const { id } = this.props.match.params;
    if (this.state.message || this.state.uploadImage) {
      let chat = {
        senderId: this.props.auth.user.id,
        receiverId: id,
        chat: {
          message: this.state.message,
          image: this.state.uploadImage1
        },
        createdAt: new Date()
      };
      this.props.sendMessage(chat, this.props.socket);
      this.setState({
        message: "",
        uploadImage: "",
        imageStatus: false,
        uploadImage1: ""
      });
    } else {
      alert("Type a message first");
    }
  }

  showMore() {
    let firstMessage = document.querySelectorAll(".messages .message")[0];
    firstMessage.scrollIntoView();
    this.setState({ showMore: this.state.showMore + 20, scrollDisable: true });
  }

  uploadImage() {
    var file = document.getElementById("fileid");
    file.click();
    let that = this;
    file.addEventListener("change", e => {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = function () {
        that.setState({ uploadImage: [reader.result], imageStatus: true });
      };
      this.setState({ uploadImage1: e.target.files[0] });
    });
  }

  deleteChat(user) {
    this.props.deleteContact(user);
  }

  render() {
    const { id } = this.state;
    const { messages, message, showMore, chat, allUsers } = this.state;
    // console.log(this.state.allUsers);
    // let receiver = allUsers
    //   ? allUsers[0]
    //     ? allUsers[0].friend._id === this.props.auth.user.id
    //       ? allUsers[0].user.first_name + " " + allUsers[0].user.last_name
    //       : allUsers[0].friend.first_name + " " + allUsers[0].friend.last_name
    //     : ""
    //   : "";
    // console.log(receiver);
    return (
      <section
        id="vendor2"
        className="gallery traffic"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row flex-column-reverse flex-md-row">

            <div class="col-md-10 right-content" style={{ background: '#fff !important' }}>
              <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane show active">
                  <div class="">
                    <div id="contact">
                      <div class="">
                        <div class="messaging">
                          <div class="inbox_msg">
                            <div class="inbox_people">
                              <div class="shape">

                              </div>
                              <div class="inbox_chat">
                                <div class="chat_list ">
                                </div>
                                {allUsers &&
                                  allUsers.map((user, index) => {
                                    let receiver = user
                                      ? user
                                        ? user.friend._id === this.props.auth.user.id
                                          ? user.user
                                          : user.friend
                                        : ""
                                      : "";
                                    let user_type = user
                                      ? user
                                        ? user.friend._id === this.props.auth.user.id
                                          ? user.user.user_type
                                          : user.friend.user_type
                                        : ""
                                      : "";
                                    return (

                                      <div class="chat_list"
                                        key={index}>
                                        <div class="chat_people">
                                          <Link
                                            to={"/inbox/" + receiver._id + "?showChat=true"}
                                            state={{ id: receiver._id }}
                                          >
                                            <div class="chat_img" style={{
                                              backgroundColor: (user_type == 2) ? '#b2bfe4' : '#f29e9e'
                                            }}>
                                              {receiver.first_name}{" "}
                                              {receiver.last_name}


                                            </div>
                                          </Link>
                                          {this.state.notify &&
                                            this.state.notify.length > 0 &&
                                            this.state.notify.includes(receiver._id) && <img style={{ marginLeft: '10px', height: '20px', width: '20px' }} src={notify_gif} />}

                                          <div class="chat_ib">
                                            <h5><span class="chat_date"><i style={{ cursor: 'pointer' }} class="far fa-trash-alt" onClick={this.deleteChat.bind(this, user)}></i></span></h5>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                            <div class="mesgs" style={{ display: 'none' }}>

                              <div class="msg_history">
                                <div className="col-md-12" style={{ paddingTop: "23%" }}>
                                  <img
                                    src="https://npm-assets.fiverrcdn.com/assets/@fiverr/inbox_perseus/bubble-green.da39d35.svg"
                                    alt="chat"
                                  />
                                  <br />
                                  <strong className="font-accent">
                                    Select a Conversation
                        </strong>
                                  <br />
                                  <small>
                                    Try selecting a conversation for someone specific.
                        </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InnerNav />
          </div>
        </div>
      </section>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.ChatReducer,
  auth: state.auth,
  errors: state.errors,
  messages: state.ChatReducer.messages,
  socket: state.auth.socket
});

const mapDispatchToProps = dispatch => {
  return {
    handleSockets: (io, id) => dispatch(ChatAction.handleSockets(io, id)),
    sendMessage: (m, s) => dispatch(ChatAction.sendMessage(m, s)),
    deleteContact: (id) => dispatch(deleteContact(id)),
    allContacts: () => dispatch(allContacts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import InnerNav from "../innerNav";
import ChatAction from "../../actions/chatAction";
import { allContacts, deleteContact } from "../../actions/chatinitActions";
import store from '../../store';
import notify_gif from '../msg_notify.png';
import { GET_CHAT_NOTIFICATION } from '../../actions/types';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      message: "",
      messages: [],
      notify: [],
      uploadImage: "",
      uploadImage1: "",
      imageStatus: false,
      showMore: 20,
      selectedChatLength: 0,
      scrollDisable: false,
      socket: null,
      watchSocket: false,
      hideContacts: false,
      allUsers: []
    };
  }

  componentDidMount() {
    this.setState({ hideContacts: (queryString.parse(this.props.location.search).showChat) ? queryString.parse(this.props.location.search).showChat : false })
    this.props.allContacts();
    this.handleChatList(this.props.messages);
    if (this.props.socket) {
      this.props.handleSockets(this.props.socket, this.props.auth.user.id);
    }
  }

  componentWillReceiveProps(props) {
    if (props.messages) {
      this.setState({ scrollDisable: false });
      this.setState({ notify: [] });
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
        if (!map.has(item._id)) {
          map.set(item._id, true);    // set any value to Map
          result.push(item);
        }
      }
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

  deleteChat(user) {
    this.props.deleteContact(user);
  }

  componentDidUpdate() {
    const objDiv = document.getElementById("messageList");
    if (!this.state.scrollDisable) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  handleSubmit() {
    const { id, hideContacts } = this.props.match.params;
    this.setState({ hideContacts: hideContacts });
    if (this.state.message || this.state.uploadImage) {
      let chat = {
        senderId: this.props.auth.user.id,
        receiverId: id,
        has_new: true,
        chat: {
          message: this.state.message,
          image: this.state.uploadImage1
        },
        createdAt: new Date()
      };
      this.props.sendMessage(chat, this.props.socket);
      this.setState({
        hideContacts: true,
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

  render() {
    const { id } = this.state;
    const { messages, message, showMore, chat, allUsers } = this.state;

    let receiver_name = '';
    if (allUsers && allUsers.length > 0) {
      allUsers.forEach(item => {
        if (this.props.match.params.id == item.friend._id) {
          receiver_name = item.friend.first_name + " " + item.friend.last_name
        }
      })
    }

    // receiver = chat.contacts.length > 0 ? 
    // chat.contacts[0].friend._id == this.props.auth.user.id ? 
    // chat.contacts[0].friend[1]
    // : ''
    // : ''; 
    return (
      <section
        id="vendor2"
        className="gallery traffic"
        style={{ marginTop: "50px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <InnerNav />
            <div className="col-md-10 right-content" style={{ background: '#fff !important', minHeight: '90vh' }}>
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane show active">
                  <div className="">
                    <div id="contact">
                      <div className="">
                        <div className="messaging">
                          <div className="inbox_msg">
                            <div className="inbox_people" style={{ display: (this.state.hideContacts) ? 'none' : 'block' }}>
                              <div className="shape">

                              </div>
                              <div className="inbox_chat">
                                <div className="chat_list ">
                                  {/* <div className="chat_people">
						                
						                	HIDE CHAT
						               
						              </div> */}
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

                                      <div className="chat_list">
                                        <div className="chat_people">
                                          <a
                                            key={index}
                                            href={"/inbox/" + receiver._id + "?showChat=true"}
                                            onClick={() => {
                                              this.setState({ hideContacts: false })
                                            }}
                                            state={{ id: receiver._id, hideContacts: true }}
                                          >
                                            <div class="chat_img" style={{
                                              backgroundColor: (user_type == 2) ? '#b2bfe4' : '#f29e9e'
                                            }}>
                                              {receiver.first_name}{" "}
                                              {receiver.last_name}
                                            </div>
                                          </a>
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
                            <span style={{ display: (!this.state.hideContacts) ? 'none' : 'block' }}>
                              <div className="shape" style={{ height: '50px' }}>
                                <h6 className="text-left m" style={{ color: 'white', fontWeight: 'bold' }}>
                                  <button class="btn btn-warning btn-sm" style={{ marginLeft: '7px' }}
                                    onClick={() => {
                                      this.setState({ hideContacts: false, notify: [] })
                                    }}>Back</button>
                                  &nbsp;&nbsp;Chat with {receiver_name}
                                </h6>
                              </div>
                              <div className="mesgs">

                                <div className="msg_history" style={{ height: '384px' }} id="messageList">
                                  {messages.length !== 0
                                    ? messages.map((v, i) => {
                                      return (
                                        v.senderId === this.props.auth.user.id
                                          ? <div className="outgoing_msg">
                                            <div className="sent_msg">
                                              <p>{v.chat.message}</p>
                                              <span className="time_date">
                                                <Moment parse="YYYY-MM-DD HH:mm">
                                                  {v.createdAt}
                                                </Moment>
                                              </span> </div>
                                          </div>
                                          : <div className="incoming_msg">
                                            <div className="incoming_msg_img">  </div>
                                            <div className="received_msg">
                                              <div className="received_withd_msg">
                                                <p>{v.chat.message}</p>
                                                <span className="time_date">
                                                  <Moment parse="YYYY-MM-DD HH:mm">
                                                    {v.createdAt}
                                                  </Moment>
                                                </span></div>
                                            </div>
                                          </div>
                                      );
                                    })
                                    : null}
                                </div>
                                <div className="type_msg">
                                  <div className="input_msg_write">
                                    <textarea
                                      onChange={e =>
                                        this.setState({
                                          message: e.target.value,
                                          scrollDisable: false
                                        })
                                      }
                                      style={{ width: '100%' }}
                                      value={message}
                                      className="write_msg" placeholder="Type a message"></textarea>
                                    <button onClick={this.handleSubmit.bind(this)} className="msg_send_btn" type="button" style={{ height: '90%' }}><i className="far fa-paper-plane"></i></button>
                                  </div>
                                </div>
                              </div>
                            </span>
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
    allContacts: () => dispatch(allContacts()),
    deleteContact: (id) => dispatch(deleteContact(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

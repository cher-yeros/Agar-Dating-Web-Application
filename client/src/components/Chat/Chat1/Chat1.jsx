import React, { useState, useEffect, useRef } from "react";
import "./chat1.css";
import {
  Icon,
  Container,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Card,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LeftMessage, RightMessage } from "./Messege";
import { Scrollbars } from "react-custom-scrollbars";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { io } from "socket.io-client";
import api from "../../../utils/api_call";
import moment from "moment";
import { useSelector } from "react-redux";

let socket;
function Chat1(props) {
  let messagesEnd = useRef(null);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const { user } = props;
  const currentUser = useSelector((state) => state.auth.loggedUser);
  useEffect(() => {
    loadChats();
  }, [chats, user]);

  useEffect(() => {
    //scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socketOperation();
  }, [user]);

  function socketOperation() {
    const myInfo = {
      id: currentUser?.id,
      username: currentUser.username,
    };
    socket.emit("openChat", myInfo);

    socket.on("userAdded", (users) => {});

    socket.on("disconnect", () => {
      socket.emit("user_disconnected", myInfo.id);
    });

    socket.on("messageSent", (data) => {
      chats.push(data);
    });
  }

  const id = currentUser?.id;

  function loadChats() {
    scrollToBottom();
    api
      .post("/chat/get-chats", {
        id: id,
        fid: user.id,
      })
      .then(({ data }) => {
        setChats(data);
      });
  }

  function sendMessage(ev) {
    const newChat = {
      text: text,
      sender_id: id,
      receiver_id: parseInt(user.id),
      username: user.username,
    };

    socket.emit("sendMessage", newChat);

    api.post("/chat/send", newChat).then(({ data }) => {});

    setChats((oldArray) => [...oldArray, newChat]);
  }
  function EnterPressed(ev) {
    if (ev.key == "Enter") {
      sendMessage();
      setText("");
    }
  }

  function scrollToBottom() {
    const chatBox = document.querySelector(".chat-panel");
    chatBox.scrollTop = chatBox.scrollHeight;
    //setTimeout(() => {
    //	chatBox.scrollTop = chatBox.scrollHeight;
    //}, 1);
    //messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  function parsedTime(time) {
    //console.log(time);
    let parsed = moment(time).format("LT");
    //console.log(parsed);
    return parsed;
  }
  //const currentUser = useSelector((state) => state.auth.loggedUser);
  return (
    <Card className="mt-1" style={{ background: "white", padding: "0" }}>
      <div className="row no-gutters" style={{ margin: 0 }}>
        <div className="settings-tray">
          <div className="friend-drawer no-gutters friend-drawer--grey">
            <img
              className="profile-image"
              src={
                user?.avatar
                  ? `http://localhost:5000/${currentUser?.avatar}`
                  : "images/default-avatar.jpg"
              }
              //src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg"
              alt=""
            />
            <div className="text">
              <h6>{user.firstname + " " + user.lastname}</h6>
              <p className="text-muted">last seen 12:06 AM</p>
            </div>
            <span className="settings-tray--right"></span>
          </div>
        </div>
        <div className="chat-panel">
          {chats.map((chat) => (
            <div key={chat.id}>
              {id == chat.sender_id ? (
                <LeftMessage
                  key={chat.sender_id}
                  text={chat.text}
                  name={chat.sender.firstname + " " + chat.sender.lastname}
                  time={parsedTime(chat.createdAt)}
                />
              ) : (
                <RightMessage
                  key={chat.receiver_id}
                  text={chat.text}
                  name={chat.sender.firstname + " " + chat.sender.lastname}
                  time={parsedTime(chat.createdAt)}
                />
              )}
            </div>
          ))}
          <div
            ref={(el) => {
              messagesEnd = el;
            }}
          ></div>
        </div>
        <div className="row" style={{ margin: "0", padding: "0" }}>
          <div className="col-12" style={{ padding: "0" }}>
            <div className="chat-box-tray">
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Write messege here...
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={EnterPressed}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                      //onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </div>
        {/*</div>*/}
      </div>
    </Card>
  );
}

export default Chat1;

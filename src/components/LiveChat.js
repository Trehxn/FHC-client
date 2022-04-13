import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import date from "date-and-time";
import Button from "@mui/material/Button";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:5000");

const LiveChat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  const [room, setRoom] = useState("");
  const username = useSelector((state) => state?.auth?.username);
  socket.on("connect", () => {
    console.log(socket.id);
  });

  const joinRoom = () => {
    if (room !== "" && username != "") {
      socket.emit("join_room", room);
      setShowRoom(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        roomId: room,
        date: date.format(new Date(), "DD/MM HH:mm"),
        message: currentMessage,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      {!showRoom ? (
        <div className="livechat-room">
          <Typography variant="h4" mb={4}>
            Enter Room Id
          </Typography>
          <TextField
            autoComplete="off"
            id="outlined-basic"
            label="Room id..."
            variant="outlined"
            sx={{ marginBottom: "1.5rem" }}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button variant="contained" onClick={joinRoom}>
            Join
          </Button>
        </div>
      ) : (
        <>
          <div className="livechat-window">
            <div className="livechat-header">
              <Typography variant="h5">Live Chat</Typography>
            </div>
            <div className="livechat-body">
              <ScrollToBottom className="livechat-body">
                {messageList.map((message) => {
                  const status = username === message.author ? "left" : "right";
                  return (
                    <div
                      className={`livechat-container livechat-container--${status}`}
                    >
                      <div className={`message message--${status}`}>
                        <Typography
                          align="left"
                          gutterBottom="true"
                          variant="subtitle2"
                        >
                          {message?.author}
                        </Typography>
                        <Typography align="left" variant="body1">
                          {message?.message}
                        </Typography>
                      </div>
                      <Typography
                        align="left"
                        fontSize={12}
                        sx={{ textAlign: "center" }}
                      >
                        {message?.date}
                      </Typography>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>
            <div className="livechat-input">
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="message..."
                variant="outlined"
                sx={{ margin: ".4rem 0" }}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ ml: ".4rem" }}
                onClick={sendMessage}
              >
                &#9658;
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LiveChat;

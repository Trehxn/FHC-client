import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import useAxios from "../hooks/useAxios";

const ChatBox = () => {
  const username = useSelector((state) => state.auth?.username);
  const { register, handleSubmit } = useForm();

  const { data, callAxios } = useAxios({
    modifyData: (existingData, newData) => {
      return [
        ...existingData,
        ...(Array.isArray(newData) ? [...newData] : [newData]),
      ];
    },
    url: "/chat",
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     callAxios({
  //       url: "/chat",
  //     });
  //   }, 2000);
  // }, []);

  return (
    <>
      <div className="chatbox">
        <div className="chatbox-title">Chat with other online users</div>
        <div className="chatbox-window">
          {data?.map((data) => {
            const className = data.username === username ? "right" : "left";
            const containerClassName =
              data.username === username
                ? "chat-container--left"
                : "chat-container--right";
            return (
              <div
                key={data._id}
                className={`${containerClassName} chat-container`}
              >
                <div className={`${className} chatbox-bubble`}>
                  <div className="chatbox-username">{data.username}</div>
                  <div className="chatbox-message">{data.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chatbox-input">
          <form
            onSubmit={handleSubmit((data) => {
              callAxios({
                url: "/chat",
                method: "post",
                data: { username, ...data },
              });
            })}
          >
            <input
              {...register("message", { required: true })}
              autoComplete="off"
              className="input"
              placeholder="Type a message"
            />
            <button
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;

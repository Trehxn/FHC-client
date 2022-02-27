import { useState } from "react";
import { useForm } from "react-hook-form";

import useAxios from "../hooks/useAxios";

const ChatBox = () => {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);

  console.log(formData);

  const { data } = useAxios({
    url: "/chat",
  });

  const { callAxios } = useAxios({
    url: !formData ? null : "/chat",
    method: "post",
    data: formData,
  });

  return (
    <div className="chatbox">
      <div className="chatbox-title">Chat with other online users</div>
      <div className="chatbox-window">
        {data.map((data) => {
          const className =
            (data.username ? data.username : "left") + " chatbox-bubble";
          return (
            <div key={data._id} className={className}>
              <div className="chatbox-username">
                {data.username ? data.username : "trehxn"}
              </div>
              <div className="chatbox-message">{data.message}</div>
            </div>
          );
        })}
      </div>
      <div className="chatbox-input">
        <form
          onSubmit={handleSubmit((data) => {
            setFormData(data);
            callAxios();
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
  );
};

export default ChatBox;

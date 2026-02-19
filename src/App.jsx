import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const joinChat = () => {
    if (name.trim() === "") return;
    setJoined(true);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const msgData = {
      name: name,
      text: message,
      sender: socket.id,
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  const handleImageSend = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const msgData = {
      name: name,
      image: imageUrl,
      sender: socket.id,
    };

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
  };

  // 🔥 NAME SCREEN
  if (!joined) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0B141A]">
        <div className="bg-[#202C33] p-8 rounded-xl w-80 text-center">
          <h2 className="text-white text-xl mb-4">Enter Your Name</h2>

          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#2A3942] text-white outline-none mb-4"
          />

          <button
            onClick={joinChat}
            className="w-full bg-green-500 text-white py-2 rounded-lg"
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  }

  // 🔥 CHAT SCREEN
  return (
    <div className="fixed inset-0 bg-[#0B141A]">
      <div className="flex flex-col h-full w-full max-w-md mx-auto">

        {/* HEADER */}
        <div className="bg-[#202C33] p-4 text-white flex items-center gap-3 flex-shrink-0">

          <label htmlFor="profileUpload" className="cursor-pointer">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </label>

          <span className="font-semibold">{name}</span>

          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfilePic(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-lg text-sm text-white break-words max-w-[20%] ${
                msg.sender === socket.id
                  ? "bg-green-600 ml-auto"
                  : "bg-[#202C33]"
              }`}
            >
              <p className="text-xs text-gray-300 mb-1">{msg.name}</p>

              {msg.text && <p>{msg.text}</p>}

              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="mt-2 rounded-lg max-h-60"
                />
              )}
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="bg-[#202C33] p-3 flex items-center gap-2 flex-shrink-0">

          <label
            htmlFor="imageUpload"
            className=" text-white px-3 py-2 rounded-full cursor-pointer"
          >
            📷
          </label>

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            className="hidden"
            onChange={handleImageSend}
          />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#2A3942] text-white px-4 py-2 rounded-full outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;

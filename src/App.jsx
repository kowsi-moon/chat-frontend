import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://chat-backend-mmfp.onrender.com", {
  transports: ["websocket"],
});

export default function App() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState("");
  const [joined, setJoined] = useState(false);

  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const joinChat = () => {
    if (!user.trim()) {
      alert("Enter your name");
      return;
    }
    setJoined(true);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const sendMessage = () => {
    if (!message.trim() && !image) return;

    const newMessage = {
      user,
      text: message,
      image,
      profilePic:
        profilePic ||
        `https://ui-avatars.com/api/?background=00A884&color=fff&name=${user}`,
    };

    socket.emit("send_message", newMessage);

    setMessage("");
    setImage(null);
  };

  useEffect(() => {
    const receiveHandler = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", receiveHandler);

    return () => {
      socket.off("receive_message", receiveHandler);
    };
  }, []);

  // ---------------- BEFORE JOIN ----------------
  if (!joined) {
    return (
      <div className="min-h-screen bg-[#111B21] flex items-center justify-center text-white overflow-hidden">
        <div className="bg-[#202C33] p-6 rounded-xl w-[90%] max-w-sm space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Setup Profile
          </h2>

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full p-2 rounded bg-[#2A3942] outline-none"
            onChange={(e) => setUser(e.target.value)}
          />

          <button
            onClick={joinChat}
            className="w-full bg-[#00A884] p-2 rounded font-semibold"
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  }

  // ---------------- CHAT SCREEN ----------------
  return (
    <div className="fixed inset-0 bg-[#111B21] flex justify-center">

    <div className="flex flex-col w-full max-w-md h-full">
      

        {/* HEADER */}
        <div className="bg-[#202C33] p-4 text-white font-semibold text-lg flex items-center gap-3">
          <img
            src={
              profilePic ||
              `https://ui-avatars.com/api/?background=00A884&color=fff&name=${user}`
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleProfileChange}
            className="hidden"
          />

          {user}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => {
            const isOwn = msg.user === user;

            return (
              <div
                key={index}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${
                    isOwn
                      ? "bg-[#005C4B] text-white"
                      : "bg-[#202C33] text-white"
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs text-green-400 mb-1">
                      {msg.user}
                    </div>
                  )}

                  {msg.text && <div>{msg.text}</div>}

                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="sent-img"
                      className="mt-2 rounded-lg max-h-48 w-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* IMAGE PREVIEW */}
        {image && (
          <div className="px-3 pb-2">
            <img
              src={image}
              alt="preview"
              className="max-h-24 rounded-lg"
            />
          </div>
        )}

        {/* INPUT AREA */}
        <div className="flex-1 bg-[#2A3942] text-white px-3 py-2 rounded-lg outline-none min-w-0"
>
        

          <button
            onClick={() => imageInputRef.current.click()}
            className="text-white text-xl"
          >
            📸
          </button>

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />

          <input
            className="flex-1 bg-[#2A3942] text-white px-3 py-2 rounded-lg outline-none min-w-0"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button
            onClick={sendMessage}
            className="bg-[#00A884] px-4 rounded-lg text-white font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

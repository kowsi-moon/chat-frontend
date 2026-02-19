return (
  <div className="fixed inset-0 bg-[#0B141A]">

    <div className="flex flex-col h-full w-full max-w-md mx-auto">

      {/* HEADER */}
      <div className="bg-[#202C33] p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          HE
        </div>
        <span className="font-semibold">Hello</span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-white ${
              msg.sender === socket.id
                ? "bg-green-600 ml-auto"
                : "bg-[#202C33]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="bg-[#202C33] p-3 flex gap-2 items-center">

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

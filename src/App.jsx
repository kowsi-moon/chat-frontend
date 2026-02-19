return (
  <div className="fixed inset-0 bg-[#0B141A] flex justify-center">

    {/* Chat Container */}
    <div className="flex flex-col w-full max-w-md h-full">

      {/* HEADER */}
      <div className="bg-[#202C33] p-4 text-white font-semibold flex items-center gap-3 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          HE
        </div>
        Hello
      </div>

      {/* MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-white ${
              msg.sender === socket.id
                ? "bg-green-600 self-end ml-auto"
                : "bg-[#202C33]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="bg-[#202C33] p-3 flex items-center gap-2 flex-shrink-0">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#2A3942] text-white px-4 py-2 rounded-full outline-none min-w-0"
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

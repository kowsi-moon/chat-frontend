import { useState } from "react";

export default function ChatSetup({ onStart }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    onStart({ name });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80 text-center">
        <h1 className="text-2xl mb-4">Chat Setup</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />

        <button
          onClick={handleStart}
          className="w-full bg-green-500 p-2 rounded"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
}

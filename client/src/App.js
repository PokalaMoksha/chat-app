import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        message,
        time: new Date().toLocaleTimeString()
      });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Real-time Chat App</h2>
      <div style={{
        border: "1px solid black",
        height: 300,
        overflowY: "scroll",
        marginBottom: 10,
        padding: "10px"
      }}>
        {chat.map((msg, idx) => (
          <p key={idx}><strong>[{msg.time}]</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;

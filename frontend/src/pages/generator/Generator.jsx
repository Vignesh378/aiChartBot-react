import React, { useEffect, useState, useRef, use } from "react";
import { Send, Mic,Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import {useAuth} from "../../context/AuthContext.jsx";
function Generator() {
  const {user,loading}=useAuth();
  console.log("User in Generator:", user);
  const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem("chatMessages");
  return saved ? JSON.parse(saved) : [];
});
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [listening, setListening] = useState(false);
  
useEffect(() => {
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}, [messages]);

useEffect(() => {
  console.log(localStorage.getItem("chatMessages"));  
  setMessages(localStorage.getItem("chatMessages") ? JSON.parse(localStorage.getItem("chatMessages")) : []);
},[]);

useEffect(() => {
  if (!loading && user) {
    setMessages((prev) => {
      // only show greeting if no previous chat history
      if (prev.length === 0) {
        return [
          { sender: "ai", text: `Hello ${user.name}, how can I assist you today?` },
        ];
      }
      return prev;
    });
  }

  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
 
const handleMic = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support voice input.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.start();
  setListening(true);

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    setListening(false);
  };

  recognition.onerror = () => setListening(false);
  recognition.onend = () => setListening(false);
};

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  const loadingMessage = { sender: "ai", type: "loading" };

  // Add user message + AI loading message together
  setMessages((prev) => [...prev, userMessage, loadingMessage]);
  setIsLoading(true);

  try {
    const response = await axiosInstance.post(API_PATHS.AI.GENERATE, { text: input });

    let data = response.data.parsed;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        data = { reply: response.data.parsed };
      }
    }

    const aiMessage = data.reply
      ? { sender: "ai", type: "text", text: data.reply }
      : { sender: "ai", type: "structured", data };

    // Replace the loading message with the real AI message
    setMessages((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((msg) => msg.type === "loading");
      if (index !== -1) updated[index] = aiMessage;
      return updated;
    });
  } catch (error) {
    console.error(error);
    setMessages((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((msg) => msg.type === "loading");
      if (index !== -1) updated[index] = { sender: "ai", text: "Sorry, something went wrong." };
      return updated;
    });
  }

  setInput("");
  setIsLoading(false);
};

return (
    <div className="flex flex-col h-screen bg-[#111111] text-gray-200">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-[#2c2c2c] text-white"
                  : "bg-[#1a1a1a] text-gray-300 border border-gray-700"
              }`}
            >
              {/*  Conditional Rendering */}
{msg.type === "loading" ? (
  <Loader2 className="w-5 h-5 animate-spin" />
) : msg.type === "structured" ? (
  <div>
    <h3 className="font-semibold text-white mb-2">{msg.data.question}</h3>
    <ul className="list-disc ml-5 text-sm text-gray-400">
      {msg.data.relevant_info?.map((info, i) => (
        <li key={i}>{info}</li>
      ))}
    </ul>
    <p className="mt-2 text-sm text-gray-400">{msg.data.answer}</p>
    <p className="text-sm mt-1 text-gray-400">{msg.data.explanation}</p>
  </div>
) : (
  <p>{msg.text}</p>
)}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="w-full border-t border-gray-800 p-4">
        <div className="flex items-center bg-[#1e1e1e] rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 px-2"
          />
          <button onClick={handleMic}>
             <Mic
    className={`w-5 h-5 mx-2 cursor-pointer ${
      listening ? "text-red-500 animate-pulse" : "text-gray-400"
    }`}/>
          </button>
          <button onClick={handleSend}>
            <Send className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}


export default Generator;

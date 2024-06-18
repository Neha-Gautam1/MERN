import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Progress } from "./pages/Progress.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Recommendation } from "./pages/Recommendation.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Error } from "./pages/Error.jsx";
import { Footer } from "./component/footer/Footer.jsx";
import "./index.css";

const App = () => {
  const chatboxRef = useRef(null);
  const chatInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here

  useEffect(() => {
    const handleResize = () => {
      if (chatInputRef.current) {
        chatInputRef.current.style.height = "auto";
        chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => {
    document.body.classList.toggle("show-chatbot");
  };

  const createChatLi = (message, className) => {
    return (
      <li className={`chat ${className}`} key={message}>
        {className === "outgoing" ? (
          <p>{message}</p>
        ) : (
          <>
            <span className="material-symbols-outlined">smart_toy</span>
            <p>{message}</p>
          </>
        )}
      </li>
    );
  };

  const generateResponse = (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    };

    fetch(API_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const responseMessage = data.choices[0].message.content.trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: responseMessage, className: "incoming" },
        ]);
      })
      .catch(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Oops! Something went wrong. Please try again.",
            className: "incoming error",
          },
        ]);
      })
      .finally(() => {
        if (chatboxRef.current) {
          chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
        }
      });
  };

  const handleChat = () => {
    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userMessage, className: "outgoing" },
    ]);

    chatInputRef.current.value = "";

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: "Thinking...", className: "incoming" },
      ]);

      if (chatboxRef.current) {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
      }

      generateResponse(userMessage);
    }, 600);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <br />
        <button className="chatbot-toggler" onClick={toggle}>
          <span className="material-symbols-rounded">mode_comment</span>
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
            <span className="close-btn material-symbols-outlined">close</span>
          </header>
          <ul className="chatbox" ref={chatboxRef}>
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>
                Hi there 👋<br />
                How can I help you today?
              </p>
            </li>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                {createChatLi(msg.message, msg.className)}
              </React.Fragment>
            ))}
          </ul>
          <div className="chat-input">
            <textarea
              placeholder="Enter a message..."
              spellCheck="false"
              required
              ref={chatInputRef}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
              send
            </span>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

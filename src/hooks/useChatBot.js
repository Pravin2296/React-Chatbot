import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual Gemini API key from https://aistudio.google.com/app/apikey
const API_KEY = 'YOUR_API_KEY';

const genAI = new GoogleGenerativeAI(API_KEY);

const useChatbot = () => {
  const [messages, setMessages] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async (message) => {
    await delay(1000);

    const newMessages = [
      ...messages,
      { text: message, sender: "user" },
    ];
    setMessages(newMessages);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(message);
      const botMessage = result.response.text();

      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;

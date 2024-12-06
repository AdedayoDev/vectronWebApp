"use client";
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";


const Feed = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hi, I'm Vectron!",
      sender: "ChatGPT",
      sentTime: new Date().toLocaleTimeString(),
    },
  ]);

  const handleSend = async (message) => {
    if (!message.trim()) return; // Prevent empty messages
    const newMessage = {
      message,
      sender: "User",
      sentTime: new Date().toLocaleTimeString(),
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    let apiMessages = chatMessages.map((messageObj) => ({
      role: messageObj.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObj.message,
    }));

    const systemMessage = {
      role: "system",
      content: "You are an intelligent automotive companion.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      // Check if the response is okay
      if (!response.ok) {
        const errorText = await response.text(); // Fetch the raw error message
        console.error("Error response from API:", errorText);
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      // Parse the JSON response
      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error("Invalid API response: No choices returned");
      }

      // Append the response from ChatGPT to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          sentTime: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error processing message with ChatGPT:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Sorry, something went wrong. Please try again.",
          sender: "ChatGPT",
          sentTime: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="chat-feed">
    
      <MainContainer>
        <ChatContainer style={{
            backgroundColor: "transparent",
            border: "none"
          }}>
          <MessageList
           
            typingIndicator={
              typing ? (
                <TypingIndicator content="Vectron is typing..." />
              ) : null
            }
          >
            {messages.map((msg, index) => (
              <Message className="message-list" key={index} model={msg} />
            ))}
          </MessageList>
          <MessageInput
            disabled={typing}
            placeholder="Type your message here..."
            onSend={handleSend}
            className="chat-input"
            
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Feed;

// "use client";
// import React, { useRef, useEffect } from "react";
// import { useChat } from "ai/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { SendHorizonalIcon } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import CopyToClipBoard from "@/components/copy-to-clip-board/copy-to-clip-board";
// import Image from 'next/image'

// export default function Feed() {
//   const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
//     useChat({
//         id: Date.now().toString(),
//         role: 'system',
//         content: 'You are a car maintenance ai, you give short replies to user'
//     });
//   const ref = useRef(null);

//   useEffect(() => {
//     if (ref.current === null) return;
//     ref.current.scrollTo(0, ref.current.scrollHeight);
//   }, [messages]);

//   return (
//     <div>
//       {/* Response */}
//       <div className="chat-response">
//       <ScrollArea ref={ref}>
//         {error && <div>{error.message}</div>}

//         {messages.map((m) => (
//           <div key={m.id}>
//             {m.role === "user" ? (
//               <div className="image-avatar">
//                 <Avatar>
//                   <AvatarImage src="" />
//                   <AvatarFallback>U</AvatarFallback>
//                 </Avatar>
//                 <div className="user-message">
//                   <p>You</p>
//                   <div>{m.content}</div>
//                 </div>
//               </div>
//             ) : (
//               m.role === "assistant" && (
//                 <div className="image-avatar">
//                   <Avatar>
//                     <AvatarImage src="" />
//                     <AvatarFallback>AI</AvatarFallback>
//                   </Avatar>
//                   <div className="user-message">
//                     <p>Docvantage</p>
//                     <CopyToClipBoard message={m} />
//                     <div>{m.content}</div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         ))}
//         <h1>Hello</h1>
//       </ScrollArea>
//       </div>

//       {/* Input */}
//       <form className="form" onSubmit={handleSubmit}>
//       <Image
//           src="/assets/images/Bot-small.png"
//           alt="ai icon"
//           width={20}
//           height={20}
//         />
//         <Input
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Ask me anything..."
//           className='chat-input'
//         />
//         <Button
//           size="icon"
//           type="submit"
//           variant="secondary"
//           disabled={isLoading}
//           className="send-btn"
//         >
//           <SendHorizonalIcon />
//         </Button>
//         <div className="add-voice">
//         <Image
//           src="/assets/icons/plus-circle.png"
//           alt="ai icon"
//           width={20}
//           height={20}
//         />
//         <Image
//           src="/assets/icons/voice.png"
//           alt="ai icon"
//           width={25}
//           height={25}
//         />
//       </div>
//       </form>
//     </div>
//   );
// }

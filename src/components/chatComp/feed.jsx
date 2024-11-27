"use client";
import React, { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonalIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CopyToClipBoard from "@/components/copy-to-clip-board/copy-to-clip-board";
import Image from 'next/image'

export default function Feed() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
        id: Date.now().toString(),
        role: 'system',
        content: 'You are a car maintenance ai, you give short replies to user'
    });
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <div>
      {/* Response */}
      <ScrollArea ref={ref}>
        {error && <div>{error.message}</div>}

        {messages.map((m) => (
          <div key={m.id}>
            {m.role === "user" ? (
              <div className="image-avatar">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="user-message">
                  <p>You</p>
                  <div>{m.content}</div>
                </div>
              </div>
            ) : (
              m.role === "assistant" && (
                <div className="image-avatar">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="user-message">
                    <p>Docvantage</p>
                    <CopyToClipBoard message={m} />
                    <div>{m.content}</div>
                  </div>
                </div>
              )
            )}
          </div>
        ))}
      </ScrollArea>

      {/* Input */}
      <form className="form" onSubmit={handleSubmit}>
      <Image
          src="/assets/images/Bot-small.png"
          alt="ai icon"
          width={20}
          height={20}
        />
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className='chat-input'
        />
        <Button
          size="icon"
          type="submit"
          variant="secondary"
          disabled={isLoading}
          className="send-btn"
        >
          <SendHorizonalIcon />
        </Button>
        <div className="add-voice">
        <Image
          src="/assets/icons/plus-circle.png"
          alt="ai icon"
          width={20}
          height={20}
        />
        <Image
          src="/assets/icons/voice.png"
          alt="ai icon"
          width={25}
          height={25}
        />
      </div>
      </form>
    </div>
  );
}

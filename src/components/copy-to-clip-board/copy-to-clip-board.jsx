import React from "react";
import { useClipboard } from "@components/hooks/use-clipboard";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react"; 
import cn from "classnames"; 

export default function CopyToClipBoard({ message, className, ...props }) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <div className={cn(className)} {...props}>
      <Button variant="secondary" size="icon" onClick={onCopy}>
        {isCopied ? (
          <CheckIcon />
        ) : (
          <CopyIcon className="copy-icon" /> 
        )}
        <span>Copy message</span>
      </Button>
    </div>
  );
}

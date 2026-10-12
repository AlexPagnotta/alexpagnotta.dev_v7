"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "@/app/features/ui/button";

const COPIED_DURATION = 2000;

type Props = {
  text: string;
  className?: string;
};

export const MarkdownCopyButton = ({ text, className }: Props) => {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy code", error);
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_DURATION);
  };

  const Icon = copied ? Check : Copy;

  return (
    <Button size="xs" aria-label="Copy code" onClick={copy} className={className}>
      <Icon aria-hidden="true" className="size-12" />
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </Button>
  );
};

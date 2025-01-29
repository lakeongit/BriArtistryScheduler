import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: message }
    ];
    setMessages(newMessages);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-[400px] flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Beauty Assistant</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button size="icon" onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

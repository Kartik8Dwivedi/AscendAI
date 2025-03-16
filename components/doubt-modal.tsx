"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Send,
  BookOpen,
} from "lucide-react";

interface DoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  topic: string;
  subtopic: string;
}

export function DoubtModal({
  isOpen,
  onClose,
  subject,
  topic,
  subtopic,
}: DoubtModalProps) {
  const [activeTab, setActiveTab] = useState<"video" | "text">("text");
  const [message, setMessage] = useState("");
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: string; message: string }>
  >([
    {
      sender: "ai",
      message: `Hello! I'm Model A, your AI teacher. How can I help you with ${subtopic.replace(
        /-/g,
        " "
      )}?`,
    },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const studentVideoRef = useRef<HTMLVideoElement>(null);

  // Format the topic and subtopic for display
  const formattedTopic = topic?.replace(/-/g, " ");
  const formattedSubtopic = subtopic?.replace(/-/g, " ");

  // Toggle video
  const toggleVideo = () => {
    if (isVideoOn) {
      // Turn off video
      if (studentVideoRef.current && studentVideoRef.current.srcObject) {
        const tracks = (
          studentVideoRef.current.srcObject as MediaStream
        ).getTracks();
        tracks.forEach((track) => track.stop());
        studentVideoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
    } else {
      // Turn on video
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (studentVideoRef.current) {
              studentVideoRef.current.srcObject = stream;
              studentVideoRef.current.play();
            }
            setIsVideoOn(true);
          })
          .catch((err) => {
            console.error("Error accessing webcam:", err);
          });
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        handleVoiceMessage();
      }, 3000);
    }
  };

  // Handle voice message
  const handleVoiceMessage = () => {
    const voiceMessage =
      "I have a question about " +
      formattedSubtopic +
      ". Can you explain it in simpler terms?";

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", message: voiceMessage }]);

    // Simulate AI thinking
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);

      // Add AI response
      const aiResponse = `Of course! Let me explain ${formattedSubtopic} in simpler terms. The key concept is that objects interact with each other through forces. When one object exerts a force on another, the second object exerts an equal and opposite force back. This is often summarized as "for every action, there is an equal and opposite reaction." Does that help clarify things?`;

      setMessages((prev) => [...prev, { sender: "ai", message: aiResponse }]);
    }, 2000);
  };

  // Handle text message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", message }]);
    setMessage("");

    // Simulate AI thinking
    setIsAiThinking(true);

    // Hardcoded responses based on keywords
    setTimeout(() => {
      setIsAiThinking(false);
      let response = "";

      const lowerMessage = message.toLowerCase();
      if (
        lowerMessage.includes("formula") ||
        lowerMessage.includes("equation")
      ) {
        response = `The key formula for ${formattedSubtopic} is F = ma, which relates force, mass, and acceleration. This is Newton's Second Law of Motion and is fundamental to understanding the topic.`;
      } else if (
        lowerMessage.includes("application") ||
        lowerMessage.includes("real world")
      ) {
        response = `${formattedSubtopic} has many real-world applications, including engineering design, transportation systems, and even sports performance analysis. For example, understanding these principles helps engineers design safer vehicles and more efficient machines.`;
      } else if (
        lowerMessage.includes("difficult") ||
        lowerMessage.includes("confused")
      ) {
        response = `It's common to find ${formattedSubtopic} challenging at first. Let's break it down: the core principle is that for every action, there's an equal and opposite reaction. Think of it like this: when you push against a wall, the wall pushes back with equal force.`;
      } else if (lowerMessage.includes("example")) {
        response = `Here's a simple example of ${formattedSubtopic}: When you throw a ball, you apply force to it, causing it to accelerate in the direction of the force. The ball's acceleration is directly proportional to the force and inversely proportional to its mass.`;
      } else {
        response = `That's an interesting question about ${formattedSubtopic}. The key concept to understand is the relationship between force, mass, and acceleration. When a force acts on an object, it causes the object to accelerate in the direction of the force. The acceleration is directly proportional to the force and inversely proportional to the mass of the object.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", message: response }]);
    }, 1500);
  };

  // Clean up on unmount or when modal closes
  useEffect(() => {
    return () => {
      if (studentVideoRef.current && studentVideoRef.current.srcObject) {
        const tracks = (
          studentVideoRef.current.srcObject as MediaStream
        ).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            Ask a Doubt to Model A
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "video" | "text")}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="video">Video Call</TabsTrigger>
            <TabsTrigger value="text">Text Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* AI Video */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  poster="/placeholder.svg?height=240&width=320"
                  muted={isMuted}
                >
                  <source src="#" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Avatar className="h-24 w-24 bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                    <AvatarFallback className="text-3xl">MA</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
                  Model A (Teacher)
                </div>
              </div>

              {/* Student Video */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                {isVideoOn ? (
                  <video
                    ref={studentVideoRef}
                    className="w-full h-auto"
                    autoPlay
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full aspect-video flex items-center justify-center bg-gray-900">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
                  You
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                className={
                  isMuted
                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    : ""
                }
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={
                  isVideoOn
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : ""
                }
                onClick={toggleVideo}
              >
                {isVideoOn ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b">
                <h3 className="font-medium text-sm">Conversation</h3>
              </div>
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        msg.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        className={
                          msg.sender === "user"
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                        }
                      >
                        <AvatarFallback>
                          {msg.sender === "user" ? "You" : "MA"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-purple-50 dark:bg-purple-900/20"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                        <AvatarFallback>MA</AvatarFallback>
                      </Avatar>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="flex-1 flex flex-col">
            <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b">
                <h3 className="font-medium text-sm">Chat with Model A</h3>
              </div>
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${
                        msg.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        className={
                          msg.sender === "user"
                            ? "bg-gray-200 dark:bg-gray-700"
                            : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                        }
                      >
                        <AvatarFallback>
                          {msg.sender === "user" ? "You" : "MA"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-purple-50 dark:bg-purple-900/20"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                        <AvatarFallback>MA</AvatarFallback>
                      </Avatar>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

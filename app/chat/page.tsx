"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Mic, BookOpen, Brain, Sparkles, PauseCircle, PlayCircle, Volume2, VolumeX } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "model-a" | "model-b"
  timestamp: Date
  type?: "text" | "audio"
}

type ModelType = "model-a" | "model-b"

export default function ChatPage() {
  const [activeModel, setActiveModel] = useState<ModelType>("model-a")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Model A, your AI teacher. What would you like to learn today?",
      sender: "model-a",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "I'm Model B. I'll test your understanding by asking questions about what you've learned.",
      sender: "model-b",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ""

      if (activeModel === "model-a") {
        responseContent = generateModelAResponse(input)
        // Set current topic based on user input
        if (input.toLowerCase().includes("algebra")) {
          setCurrentTopic("algebra")
        } else if (input.toLowerCase().includes("photosynthesis")) {
          setCurrentTopic("photosynthesis")
        } else if (input.toLowerCase().includes("history")) {
          setCurrentTopic("history")
        }
      } else {
        responseContent = generateModelBResponse(input)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: activeModel,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateModelAResponse = (userInput: string) => {
    // Simple response generation for Model A (teaching mode)
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("algebra") || lowerInput.includes("equation")) {
      return "In algebra, we use variables like x and y to represent unknown values. For example, in the equation 2x + 3 = 7, we can solve for x by subtracting 3 from both sides, then dividing by 2. This gives us x = 2. Would you like me to explain more about solving equations?"
    } else if (lowerInput.includes("photosynthesis") || lowerInput.includes("plants")) {
      return "Photosynthesis is the process by which plants convert light energy into chemical energy. Plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Would you like to learn more about the stages of photosynthesis?"
    } else if (lowerInput.includes("history") || lowerInput.includes("ancient")) {
      return "Ancient civilizations like Egypt, Mesopotamia, India, and China developed around river valleys. These rivers provided fertile soil for agriculture, which allowed people to settle and build complex societies. Would you like to explore a specific ancient civilization in more detail?"
    } else {
      return "That's an interesting topic! I can teach you about it step by step. Let's start with the fundamentals. What specific aspect would you like to understand better?"
    }
  }

  const generateModelBResponse = (userInput: string) => {
    // Simple response generation for Model B (testing mode)
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("algebra") || lowerInput.includes("equation")) {
      return "Great explanation! Now, can you solve this equation and explain your steps: 3x - 5 = 10? What is the value of x?"
    } else if (lowerInput.includes("photosynthesis") || lowerInput.includes("plants")) {
      return "You've explained photosynthesis well. Now, what would happen to a plant if it was kept in complete darkness for several days? Why?"
    } else if (lowerInput.includes("history") || lowerInput.includes("ancient")) {
      return "Good overview of ancient civilizations. Can you compare and contrast the achievements of Ancient Egypt and Mesopotamia? What were their major contributions?"
    } else {
      return "I see you're learning about this topic. To test your understanding, can you explain the key concepts in your own words? What are the most important points to remember?"
    }
  }

  const getAvatarForSender = (sender: string) => {
    switch (sender) {
      case "user":
        return {
          fallback: "You",
          image: "/placeholder.svg?height=40&width=40",
          bgColor: "bg-gray-200 dark:bg-gray-700",
        }
      case "model-a":
        return {
          fallback: "MA",
          image: "",
          bgColor: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
        }
      case "model-b":
        return {
          fallback: "MB",
          image: "",
          bgColor: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
        }
      default:
        return {
          fallback: "AI",
          image: "",
          bgColor: "bg-gray-100 dark:bg-gray-800",
        }
    }
  }

  const getSenderName = (sender: string) => {
    switch (sender) {
      case "user":
        return "You"
      case "model-a":
        return "Model A (Teacher)"
      case "model-b":
        return "Model B (Examiner)"
      default:
        return "AI"
    }
  }

  const handleRecordAudio = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        setIsRecording(false)

        // Simulate sending an audio message
        const audioMessage: Message = {
          id: Date.now().toString(),
          content: "Audio message",
          sender: "user",
          timestamp: new Date(),
          type: "audio",
        }

        setMessages((prev) => [...prev, audioMessage])

        // Simulate AI response to audio
        setIsTyping(true)
        setTimeout(() => {
          const aiResponse =
            activeModel === "model-a"
              ? "I've received your audio question. Let me explain this concept further..."
              : "Thanks for your audio response. Let me evaluate your understanding..."

          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: aiResponse,
            sender: activeModel,
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, aiMessage])
          setIsTyping(false)
        }, 2000)
      }, 3000)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const getVideoSource = () => {
    switch (currentTopic) {
      case "algebra":
        return "/placeholder.svg?height=360&width=640"
      case "photosynthesis":
        return "/placeholder.svg?height=360&width=640"
      case "history":
        return "/placeholder.svg?height=360&width=640"
      default:
        return "/placeholder.svg?height=360&width=640"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Models</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="model-a" onValueChange={(value) => setActiveModel(value as ModelType)}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="model-a">Model A</TabsTrigger>
                  <TabsTrigger value="model-b">Model B</TabsTrigger>
                </TabsList>
                <TabsContent value="model-a" className="mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Teacher</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Explains concepts</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="model-b" className="mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Examiner</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tests understanding</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInput("Tell me about algebra equations")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Algebra Equations
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInput("Explain photosynthesis")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Photosynthesis
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => setInput("Tell me about ancient civilizations")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ancient Civilizations
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Model B Assessment Panel */}
          {activeModel === "model-b" && (
            <Card>
              <CardHeader>
                <CardTitle>Student Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Understanding Level</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Beginner</span>
                      <span>Advanced</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Key Concepts Grasped</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Variables
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Equations
                      </span>
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        Functions
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Areas for Improvement</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-4 space-y-1">
                      <li>Complex equation solving</li>
                      <li>Word problem interpretation</li>
                      <li>Application of concepts</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Feedback to Model A
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader>
              <CardTitle>{activeModel === "model-a" ? "Learning with Model A" : "Testing with Model B"}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              {/* Video Player for Model A */}
              {activeModel === "model-a" && currentTopic && (
                <div className="mb-6 relative rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-auto rounded-lg"
                    poster={getVideoSource()}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="#" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex justify-between items-center">
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                        onClick={() => setInput("I have a question about this video")}
                      >
                        Ask a Question
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar
                        className={`${message.sender === "user" ? "ml-2" : "mr-2"} ${getAvatarForSender(message.sender).bgColor}`}
                      >
                        <AvatarImage src={getAvatarForSender(message.sender).image} />
                        <AvatarFallback>{getAvatarForSender(message.sender).fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`text-xs text-gray-500 dark:text-gray-400 mb-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                        >
                          {getSenderName(message.sender)}
                        </div>
                        {message.type === "audio" ? (
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-purple-600 text-white"
                                : message.sender === "model-a"
                                  ? "bg-purple-100 text-gray-800 dark:bg-purple-900/50 dark:text-gray-200"
                                  : "bg-blue-100 text-gray-800 dark:bg-blue-900/50 dark:text-gray-200"
                            }`}
                          >
                            <div className="flex items-center">
                              <Mic className="h-4 w-4 mr-2" />
                              <div className="w-32 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-white dark:bg-gray-300 rounded-full"
                                  style={{ width: "70%" }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">0:12</span>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-purple-600 text-white"
                                : message.sender === "model-a"
                                  ? "bg-purple-100 text-gray-800 dark:bg-purple-900/50 dark:text-gray-200"
                                  : "bg-blue-100 text-gray-800 dark:bg-blue-900/50 dark:text-gray-200"
                            }`}
                          >
                            {message.content}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <Avatar
                        className={`mr-2 ${activeModel === "model-a" ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"}`}
                      >
                        <AvatarFallback>{activeModel === "model-a" ? "MA" : "MB"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {activeModel === "model-a" ? "Model A (Teacher)" : "Model B (Examiner)"}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${activeModel === "model-a" ? "bg-purple-100 dark:bg-purple-900/50" : "bg-blue-100 dark:bg-blue-900/50"}`}
                        >
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${activeModel === "model-a" ? "Model A to teach you" : "Model B to test your knowledge"}...`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={
                    isRecording
                      ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      : ""
                  }
                  onClick={handleRecordAudio}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


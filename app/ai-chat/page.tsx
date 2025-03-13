"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Mic, BookOpen, Brain, PaperclipIcon, Image, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  content: string
  sender: "user" | "model-a" | "model-b"
  timestamp: Date
  type?: "text" | "audio" | "image"
  attachmentUrl?: string
}

export default function AIChatPage() {
  const [activeModel, setActiveModel] = useState<"model-a" | "model-b">("model-a")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Model A, your AI teacher. What would you like to learn about today?",
      sender: "model-a",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [recentTopics, setRecentTopics] = useState([
    "Ray Optics",
    "Algebra",
    "Chemical Reactions",
    "Ancient Civilizations",
  ])

  useEffect(() => {
    // scrollToBottom()
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
      let response = ""

      if (activeModel === "model-a") {
        response = generateModelAResponse(input)
      } else {
        response = generateModelBResponse(input)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
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

    if (lowerInput.includes("optics") || lowerInput.includes("light") || lowerInput.includes("ray")) {
      return "Ray optics, also known as geometrical optics, is a model of optics that describes light propagation in terms of rays. The ray in geometric optics is an abstraction useful for approximating the paths along which light propagates under certain circumstances. Would you like to learn about reflection, refraction, or optical instruments?"
    } else if (lowerInput.includes("algebra") || lowerInput.includes("equation")) {
      return "Algebra is one of the broad areas of mathematics. In its most general form, algebra is the study of mathematical symbols and the rules for manipulating these symbols. It includes everything from solving elementary equations to studying abstractions such as groups, rings, and fields. What specific topic in algebra would you like to explore?"
    } else if (lowerInput.includes("chemical") || lowerInput.includes("reaction")) {
      return "Chemical reactions occur when two or more molecules interact and the molecules change. Bonds between atoms are broken and created to form new molecules. That's the basic definition, but there's so much more to understand about types of reactions, energy changes, and reaction rates. What aspect of chemical reactions interests you most?"
    } else {
      return "That's an interesting topic! I can teach you about it step by step. Let's start with the fundamentals. What specific aspect would you like to understand better?"
    }
  }

  const generateModelBResponse = (userInput: string) => {
    // Simple response generation for Model B (testing mode)
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("optics") || lowerInput.includes("light") || lowerInput.includes("ray")) {
      return "Let's test your understanding of ray optics. Can you explain the difference between real and virtual images? Also, what happens to a light ray when it passes from air into glass at an angle?"
    } else if (lowerInput.includes("algebra") || lowerInput.includes("equation")) {
      return "To assess your algebra knowledge, try solving this equation and explain your steps: 2x² - 5x - 3 = 0. What are the values of x?"
    } else if (lowerInput.includes("chemical") || lowerInput.includes("reaction")) {
      return "To test your understanding of chemical reactions, can you explain the difference between endothermic and exothermic reactions? Give an example of each type."
    } else {
      return "I'd like to assess your understanding of this topic. Can you explain the key concepts in your own words? What are the most important principles to remember?"
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
              ? "I've received your audio question about ray optics. The law of reflection states that the angle of incidence equals the angle of reflection. This is why mirrors reflect light in a predictable way. Would you like me to explain more about how reflection works?"
              : "Thanks for your audio response. Your explanation of reflection was mostly correct, but remember that the angle is measured from the normal to the surface, not from the surface itself. Can you clarify how this affects the path of light?"

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

  const handleAttachFile = (type: string) => {
    // Simulate file attachment
    let attachmentMessage: Message

    if (type === "image") {
      attachmentMessage = {
        id: Date.now().toString(),
        content: "Image attachment",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        attachmentUrl: "/placeholder.svg?height=200&width=300",
      }
    } else {
      attachmentMessage = {
        id: Date.now().toString(),
        content: "Document attachment: Physics_Question.pdf",
        sender: "user",
        timestamp: new Date(),
        type: "text",
      }
    }

    setMessages((prev) => [...prev, attachmentMessage])

    // Simulate AI response to attachment
    setIsTyping(true)
    setTimeout(() => {
      const aiResponse =
        type === "image"
          ? "I can see the diagram you've shared showing light refraction through a prism. This illustrates how white light separates into its component colors because different wavelengths refract at different angles. This phenomenon is called dispersion. Would you like me to explain more about how this works?"
          : "I've reviewed the physics question you shared. It's asking about the relationship between force, mass, and acceleration (Newton's Second Law). Would you like me to walk you through how to solve this step by step?"

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: activeModel,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleTopicSelect = (topic: string) => {
    setInput(`Tell me about ${topic}`)
  }

  const handleSwitchModel = (model: "model-a" | "model-b") => {
    setActiveModel(model)

    // Add a system message about the switch
    const switchMessage: Message = {
      id: Date.now().toString(),
      content: `Switching to ${model === "model-a" ? "Model A (Teacher)" : "Model B (Examiner)"}`,
      sender: model,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, switchMessage])

    // Add a welcome message from the new model
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          model === "model-a"
            ? "I'm Model A, your AI teacher. I'll help you learn new concepts and answer your questions. What would you like to learn about today?"
            : "I'm Model B, your AI examiner. I'll help assess your understanding and provide targeted feedback. What topic would you like me to test you on?",
        sender: model,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, welcomeMessage])
    }, 500)
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
              <Tabs
                defaultValue={activeModel}
                onValueChange={(value) => handleSwitchModel(value as "model-a" | "model-b")}
              >
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
              <CardTitle>Recent Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTopics.map((topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {topic}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chat Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ask specific questions for better answers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Upload images or documents for visual learning</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Use Model A for learning, Model B for testing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Voice recording works for complex questions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Chat area */}
        <div className="flex-1">
          <Card className="h-[80vh] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className={`mr-2 ${getAvatarForSender(activeModel).bgColor}`}>
                    <AvatarFallback>{getAvatarForSender(activeModel).fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{activeModel === "model-a" ? "Model A (Teacher)" : "Model B (Examiner)"}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activeModel === "model-a" ? "Learning Assistant" : "Knowledge Evaluator"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    activeModel === "model-a"
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                      : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  }
                >
                  {activeModel === "model-a" ? "Teaching Mode" : "Testing Mode"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
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
                          className={`text-xs text-gray-500 dark:text-gray-400 mb-1 flex justify-between ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <span>{getSenderName(message.sender)}</span>
                          <span className="mx-2">{formatTime(message.timestamp)}</span>
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
                        ) : message.type === "image" ? (
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-purple-600 text-white"
                                : message.sender === "model-a"
                                  ? "bg-purple-100 text-gray-800 dark:bg-purple-900/50 dark:text-gray-200"
                                  : "bg-blue-100 text-gray-800 dark:bg-blue-900/50 dark:text-gray-200"
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="text-sm">Image attachment:</div>
                              <img
                                src={message.attachmentUrl || "/placeholder.svg"}
                                alt="Attachment"
                                className="rounded-md max-w-full h-auto"
                              />
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
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="icon" className="rounded-full">
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleAttachFile("image")}>
                      <Image className="h-4 w-4 mr-2" />
                      <span>Image</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAttachFile("document")}>
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Document</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${activeModel === "model-a" ? "Model A to teach you" : "Model B to test your knowledge"}...`}
                  className="flex-1 rounded-full"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${
                    isRecording
                      ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      : ""
                  }`}
                  onClick={handleRecordAudio}
                >
                  <Mic className="h-5 w-5" />
                </Button>

                <Button type="submit" size="icon" className="rounded-full">
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


"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Mic,
  MicOff,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Brain,
  Trophy,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  PhoneOff,
  Gamepad2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type Question = {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  type: "mcq" | "voice";
  explanation?: string;
};

type Game = {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
};

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const { subject, topic, subtopic } = params;
  const videoRef = useRef<HTMLVideoElement>(null);
  const studentVideoRef = useRef<HTMLVideoElement>(null);

  // Format the topic and subtopic for display
  const formattedTopic = (topic as string)?.replace(/-/g, " ");
  const formattedSubtopic = (subtopic as string)?.replace(/-/g, " ");

  // Assessment state
  const [assessmentPhase, setAssessmentPhase] = useState<
    "face-to-face" | "questions" | "results" | "games"
  >("face-to-face");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  // Video call state
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallPaused, setIsCallPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  const [faceToFaceComplete, setFaceToFaceComplete] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [studentExplanation, setStudentExplanation] = useState<string | null>(
    null
  );

  // Handle user messages with hardcoded responses
  const [userMessage, setUserMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ sender: string; message: string }>
  >([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to conversation
    const newMessage = { sender: "user", message: userMessage };
    setConversationHistory((prev) => [...prev, newMessage]);
    setUserMessage("");

    // Simulate AI thinking
    setIsAiThinking(true);

    // Hardcoded responses based on keywords
    setTimeout(() => {
      setIsAiThinking(false);
      let response = "";

      const lowerMessage = userMessage.toLowerCase();
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
        response = `That's an interesting point about ${formattedSubtopic}. To expand on this concept, remember that forces always occur in pairs, and understanding the relationship between force, mass, and acceleration is key to mastering this topic.`;
      }

      setConversationHistory((prev) => [
        ...prev,
        { sender: "ai", message: response },
      ]);
    }, 1500);
  };

  // Sample questions based on the topic
const questions: Question[] = [
  {
    id: "1",
    question: `What is the main principle behind hydrocarbons?`,
    options: [
      "Conservation of energy",
      "Bonding of carbon and hydrogen atoms",
      "Formation of ionic bonds",
      "Oxidation-reduction reactions",
    ],
    correctAnswer: "1",
    type: "mcq",
    explanation:
      "Hydrocarbons are organic compounds made up of only carbon and hydrogen atoms, primarily bonded in covalent bonds.",
  },
  {
    id: "2",
    question: `Explain in your own words how hydrocarbons are important in everyday life.`,
    type: "voice",
    explanation:
      "This question tests your ability to connect the importance of hydrocarbons to real-world applications. Strong answers include fuels, plastics, and organic chemicals.",
  },
  {
    id: "3",
    question: `Which of the following is NOT a type of hydrocarbon?`,
    options: ["Alkanes", "Alkenes", "Alkynes", "Proteins"],
    correctAnswer: "3",
    type: "mcq",
    explanation:
      "Proteins are biological macromolecules made of amino acids, while alkanes, alkenes, and alkynes are all types of hydrocarbons.",
  },
  {
    id: "4",
    question: `What is the simplest form of hydrocarbon?`,
    options: ["Methane", "Ethanol", "Propane", "Butane"],
    correctAnswer: "0",
    type: "mcq",
    explanation:
      "Methane (CH₄) is the simplest hydrocarbon, consisting of a single carbon atom bonded to four hydrogen atoms.",
  },
  {
    id: "5",
    question: `Describe how the structure of hydrocarbons affects their physical properties.`,
    type: "voice",
    explanation:
      "This question assesses your understanding of how the structure, like chain length and bonding, impacts melting points, boiling points, and solubility.",
  },
  {
    id: "6",
    question: `Which of the following hydrocarbons is used as a major fuel source?`,
    options: ["Methane", "Ethanol", "Glucose", "Caffeine"],
    correctAnswer: "0",
    type: "mcq",
    explanation:
      "Methane is a primary component of natural gas and is widely used as a fuel for heating and electricity generation.",
  },
  {
    id: "7",
    question: `Explain the difference between saturated and unsaturated hydrocarbons.`,
    type: "voice",
    explanation:
      "This question tests your knowledge of hydrocarbon classifications. A saturated hydrocarbon has only single bonds between carbon atoms, while unsaturated hydrocarbons have one or more double or triple bonds.",
  },
];


  // Sample educational games
  const games: Game[] = [
    {
      id: "1",
      title: "Physics Puzzle Challenge",
      description: `Test your understanding of ${formattedSubtopic} by solving interactive puzzles and challenges.`,
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
      estimatedTime: "15 min",
    },
    {
      id: "2",
      title: "Formula Race",
      description:
        "Race against time by matching the correct formulas to physics problems. Speed and accuracy matter!",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
      estimatedTime: "10 min",
    },
    {
      id: "3",
      title: "Virtual Lab Simulator",
      description: `Conduct virtual experiments related to ${formattedSubtopic} and observe the results in real-time.`,
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Hard",
      estimatedTime: "25 min",
    },
    {
      id: "4",
      title: "Concept Crossword",
      description:
        "Fill in the crossword puzzle with key terms and concepts from your recent lessons.",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Medium",
      estimatedTime: "20 min",
    },
    {
      id: "5",
      title: "Physics Trivia Battle",
      description:
        "Challenge your friends to a trivia battle and see who knows the most about physics!",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "Easy",
      estimatedTime: "15 min",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Format time for call duration
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Start the video call
  const startCall = () => {
    setIsCallActive(true);
    setIsCallPaused(false);

    // Start timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    setCallTimer(timer);

    // Access user's webcam
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
      } else {
        // Fallback for browsers that don't support getUserMedia
        if (studentVideoRef.current) {
          studentVideoRef.current.poster =
            "/placeholder.svg?height=240&width=320";
        }
      }

    // Simulate AI starting to listen
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      setAiResponse(
        "Hello! I'm Model B, your AI Student. I would love to know about  " +
          formattedSubtopic +
          ". Could you please explain the key concepts of this topic in your own words?"
      );
    }, 2000);
  };

  // Pause the video call
  const pauseCall = () => {
    setIsCallPaused(true);
    if (callTimer) {
      clearInterval(callTimer);
    }
  };

  // Resume the video call
  const resumeCall = () => {
    setIsCallPaused(false);
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    setCallTimer(timer);
  };

  // End the video call
  const endCall = () => {
    setIsCallActive(false);
    if (callTimer) {
      clearInterval(callTimer);
    }

    // Simulate student having completed their explanation
    setStudentExplanation(
      "The student provided a comprehensive explanation of " +
        formattedSubtopic +
        ", covering the key principles, mathematical formulations, and real-world applications. " +
        "The explanation demonstrated a good understanding of the fundamental concepts."
    );

    setFaceToFaceComplete(true);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle video
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  // Proceed to questions after face-to-face
  const proceedToQuestions = () => {
    setAssessmentPhase("questions");
  };

  // Handle answer selection for questions
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  // Handle voice recording
  const handleRecordVoice = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Simulate voice recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        // Simulate an answer for demonstration purposes
        setSelectedAnswer("voice-answer-recorded");
      }, 3000);
    } else {
      // If we're stopping recording early, still set an answer
      setSelectedAnswer("voice-answer-recorded");
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Save the answer
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer,
      }));

      // Reset selected answer
      setSelectedAnswer(null);

      // Move to the next question or show results if done
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsSubmitting(true);
        // Simulate submission delay
        setTimeout(() => {
          setIsSubmitting(false);
          calculateResults();
          setAssessmentPhase("results");
        }, 1500);
      }
    }
  };

  // Calculate assessment results
  const calculateResults = () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      if (
        question.type === "mcq" &&
        answers[question.id] === question.correctAnswer
      ) {
        correctAnswers += 1;
      } else if (question.type === "voice" && answers[question.id]) {
        // For voice questions, we assume a partial credit (for demonstration purposes)
        correctAnswers += 0.7;
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / questions.length) * 100
    );
    setScore(calculatedScore);

    // Generate feedback based on score
    if (calculatedScore >= 80) {
      setFeedback(
        "Excellent work! You have a strong understanding of the concepts."
      );
    } else if (calculatedScore >= 60) {
      setFeedback(
        "Good job! You understand the basics, but there's room for improvement in some areas."
      );
    } else {
      setFeedback(
        "You should review this topic again. Focus on the fundamental principles and try to connect them to practical applications."
      );
    }
  };

  // Finish assessment and proceed to games
  const handleFinishAssessment = () => {
    setAssessmentComplete(true);
    setAssessmentPhase("games");
  };

  // Start a game
  const handleStartGame = (gameId: string) => {
    // In a real app, this would navigate to the game
    alert(`Starting game: ${games.find((g) => g.id === gameId)?.title}`);
  };

  // Return to dashboard
  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (callTimer) {
        clearInterval(callTimer);
      }
    };
  }, [callTimer]);

  // Progress calculation for questions phase
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link
          href={`/classroom/${subject}/${topic}/${subtopic}`}
          className="flex items-center text-sm hover:underline mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Classroom
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Assessment: {subject} / {formattedTopic} / {formattedSubtopic}
        </div>
      </div>

      {assessmentPhase === "face-to-face" && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="mr-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">
                  Face-to-Face Interaction with Model B
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explain your understanding of {formattedSubtopic} to Model B
                </p>
              </div>
            </div>
            {isCallActive && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
              >
                {isCallPaused ? "Paused" : "Live"} • {formatTime(callDuration)}
              </Badge>
            )}
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              {!isCallActive && !faceToFaceComplete ? (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Ready for One on One Interaction?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    In this face-to-face session, Model B will assess your
                    understanding of {formattedSubtopic}. You'll explain the
                    concepts in your own words, and Model B will ask follow-up
                    questions.
                  </p>
                  <Button size="lg" onClick={startCall}>
                    <Video className="mr-2 h-5 w-5" />
                    Start Face-to-Face Interaction
                  </Button>
                </div>
              ) : faceToFaceComplete ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Face-to-Face Interaction Complete!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    You've successfully completed the face-to-face portion of
                    your assessment. Now, proceed to the questions section to
                    complete your evaluation.
                  </p>
                  <Button size="lg" onClick={proceedToQuestions}>
                    Proceed to Questions
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Video */}
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-auto"
                      poster="/placeholder.svg?height=360&width=640"
                      muted={isMuted}
                    >
                      <source src="#" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-24 w-24 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <AvatarFallback className="text-3xl">MB</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
                      Model B
                    </div>
                  </div>

                  {/* Student Video */}
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={studentVideoRef}
                      className={`w-full h-auto ${!isVideoOn ? "hidden" : ""}`}
                    >
                      <source src="#" type="video/mp4" />
                    </video>
                    {!isVideoOn && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <VideoOff className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-white text-sm">
                      You
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isCallActive && !faceToFaceComplete && (
              <CardFooter className="flex justify-between items-center border-t p-4">
                <div className="flex space-x-2">
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
                      !isVideoOn
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
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
                </div>
                <div className="flex space-x-2">
                  {isCallPaused ? (
                    <Button variant="outline" onClick={resumeCall}>
                      <Play className="h-5 w-5 mr-2" />
                      Resume
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={pauseCall}>
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button variant="destructive" onClick={endCall}>
                    <PhoneOff className="h-5 w-5 mr-2" />
                    End Call
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>

          {isCallActive && !faceToFaceComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  {aiResponse && (
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm">{aiResponse}</p>
                      </div>
                    </div>
                  )}

                  {conversationHistory.map((msg, index) => (
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
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }
                      >
                        <AvatarFallback>
                          {msg.sender === "user" ? "You" : "MB"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-blue-50 dark:bg-blue-900/20"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <form
                  onSubmit={handleSendMessage}
                  className="w-full flex space-x-2"
                >
                  <Input
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">
                    Send
                  </Button>
                </form>
              </CardFooter>
            </Card>
          )}

          {studentExplanation && faceToFaceComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Your Explanation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {studentExplanation}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {assessmentPhase === "questions" && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="mr-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">Model B Follow-Up Questions</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help me know more about {formattedSubtopic}
                </p>
              </div>
            </div>
            <div className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>

          {isSubmitting ? (
            <Card className="p-8">
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400 animate-pulse mb-4" />
                <h2 className="text-xl font-bold mb-2">
                  Evaluating Your Answers
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Model B is analyzing your responses and preparing your
                  feedback...
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {currentQuestion.type === "mcq" ? (
                    <span className="inline-flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                        Multiple Choice
                      </span>
                      {currentQuestion.question}
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                        Voice Response
                      </span>
                      {currentQuestion.question}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuestion.type === "mcq" ? (
                  <RadioGroup
                    value={selectedAnswer || ""}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      Click the microphone button and explain your answer
                      verbally. Model B will analyze your response.
                    </p>
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      className={`rounded-full p-8 ${
                        isRecording ? "animate-pulse" : ""
                      }`}
                      onClick={handleRecordVoice}
                    >
                      {isRecording ? (
                        <MicOff className="h-8 w-8" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </Button>
                    <p className="text-sm font-medium">
                      {isRecording
                        ? "Recording... Click to stop"
                        : selectedAnswer
                        ? "Recording complete ✓"
                        : "Click to start recording"}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Submit Assessment"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {assessmentPhase === "results" && (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
              <CardTitle className="text-2xl">Interaction Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{score}%</div>
                <p className="text-gray-600 dark:text-gray-400">
                  You answered {Object.keys(answers).length} out of{" "}
                  {questions.length} questions
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                      Model B Feedback
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      {feedback}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Question Review</h3>

                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-4 rounded-lg border dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5">
                          {question.type === "mcq" &&
                          answers[question.id] === question.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : question.type === "voice" ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 opacity-60" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            Question {index + 1}: {question.question}
                          </p>

                          {question.type === "mcq" && (
                            <div className="mt-2 text-sm">
                              <p className="text-gray-700 dark:text-gray-300">
                                Your answer:{" "}
                                {answers[question.id] !== undefined
                                  ? question.options?.[
                                      Number.parseInt(answers[question.id])
                                    ]
                                  : "Not answered"}
                              </p>
                              <p className="text-green-600 dark:text-green-400 mt-1">
                                Correct answer:{" "}
                                {question.correctAnswer !== undefined
                                  ? question.options?.[
                                      Number.parseInt(question.correctAnswer)
                                    ]
                                  : "N/A"}
                              </p>
                            </div>
                          )}

                          {question.type === "voice" && (
                            <div className="mt-2 text-sm">
                              <p className="text-gray-700 dark:text-gray-300">
                                Your answer: Voice response{" "}
                                {answers[question.id]
                                  ? "provided"
                                  : "not provided"}
                              </p>
                              <p className="text-green-600 dark:text-green-400 mt-1">
                                Model B evaluation: Good understanding with some
                                room for improvement
                              </p>
                            </div>
                          )}

                          {question.explanation && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                              <p className="font-medium">Explanation:</p>
                              <p className="text-gray-600 dark:text-gray-400">
                                {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleFinishAssessment} size="lg">
                Continue to Learning Games
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {assessmentPhase === "games" && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Learning Games</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Reinforce your understanding of {formattedSubtopic} through
                interactive games
              </p>
            </div>
            <Button variant="outline" onClick={handleReturnToDashboard}>
              Return to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={
                        game.difficulty === "Easy"
                          ? "bg-green-500"
                          : game.difficulty === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center">
                    <Gamepad2 className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {game.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Estimated time: {game.estimatedTime}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleStartGame(game.id)}
                  >
                    Play Game
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Why Games Help You Learn
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  Educational games enhance learning by making it fun and
                  interactive. They help reinforce concepts, improve retention,
                  and develop problem-solving skills. Playing these games
                  regularly can significantly boost your understanding of{" "}
                  {formattedSubtopic} and help you apply the concepts in
                  real-world scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

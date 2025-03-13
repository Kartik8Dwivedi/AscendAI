"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, CheckCircle, AlertCircle, ChevronLeft, Brain, Trophy } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Question = {
  id: string
  question: string
  options?: string[]
  correctAnswer?: string
  type: "mcq" | "voice"
  explanation?: string
}

export default function AssessmentPage() {
  const router = useRouter()
  const params = useParams()
  const { subject, topic, subtopic } = params

  // Format the topic and subtopic for display
  const formattedTopic = (topic as string)?.replace(/-/g, " ")
  const formattedSubtopic = (subtopic as string)?.replace(/-/g, " ")

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [assessmentComplete, setAssessmentComplete] = useState(false)

  // Sample questions based on the topic
  const questions: Question[] = [
    {
      id: "1",
      question: `What is the main principle behind ${formattedSubtopic}?`,
      options: ["Conservation of energy", "Newton's laws of motion", "Principle of superposition", "Quantum mechanics"],
      correctAnswer: "0",
      type: "mcq",
      explanation:
        "The conservation of energy is a fundamental principle in physics that states that energy cannot be created or destroyed, only transformed from one form to another.",
    },
    {
      id: "2",
      question: `Explain in your own words how ${formattedSubtopic} relates to everyday phenomena.`,
      type: "voice",
      explanation:
        "This question tests your ability to connect theoretical concepts with practical applications. A good answer would include specific examples from daily life.",
    },
    {
      id: "3",
      question: `Which of the following is NOT a characteristic of ${formattedSubtopic}?`,
      options: [
        "It follows mathematical rules",
        "It can be observed experimentally",
        "It violates the laws of thermodynamics",
        "It has practical applications",
      ],
      correctAnswer: "2",
      type: "mcq",
      explanation:
        "The laws of thermodynamics are fundamental principles that govern physical and chemical processes, and they are not violated by any legitimate scientific concept.",
    },
    {
      id: "4",
      question: `What is the mathematical formula most commonly associated with ${formattedSubtopic}?`,
      options: ["E = mc²", "F = ma", "PV = nRT", "a² + b² = c²"],
      correctAnswer: "1",
      type: "mcq",
      explanation:
        "F = ma is Newton's second law of motion, which describes the relationship between force, mass, and acceleration.",
    },
    {
      id: "5",
      question: `Describe a scenario where understanding ${formattedSubtopic} would help solve a problem in real life.`,
      type: "voice",
      explanation:
        "This question assesses your ability to apply the concepts to practical problem-solving. Strong responses include specific problems and detailed solutions.",
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    if (showResult) {
      let correctAnswers = 0

      questions.forEach((question) => {
        if (question.type === "mcq" && answers[question.id] === question.correctAnswer) {
          correctAnswers += 1
        } else if (question.type === "voice" && answers[question.id]) {
          // For voice questions, we assume a partial credit (for demonstration purposes)
          correctAnswers += 0.7
        }
      })

      const calculatedScore = Math.round((correctAnswers / questions.length) * 100)
      setScore(calculatedScore)

      // Generate feedback based on score
      if (calculatedScore >= 80) {
        setFeedback("Excellent work! You have a strong understanding of the concepts.")
      } else if (calculatedScore >= 60) {
        setFeedback("Good job! You understand the basics, but there's room for improvement in some areas.")
      } else {
        setFeedback(
          "You should review this topic again. Focus on the fundamental principles and try to connect them to practical applications.",
        )
      }
    }
  }, [showResult, answers])

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleRecordVoice = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate voice recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        // Simulate an answer for demonstration purposes
        setSelectedAnswer("voice-answer-recorded")
      }, 3000)
    } else {
      // If we're stopping recording early, still set an answer
      setSelectedAnswer("voice-answer-recorded")
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Save the answer
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer,
      }))

      // Reset selected answer
      setSelectedAnswer(null)

      // Move to the next question or show results if done
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setIsSubmitting(true)
        // Simulate submission delay
        setTimeout(() => {
          setIsSubmitting(false)
          setShowResult(true)
        }, 1500)
      }
    }
  }

  const handleFinishAssessment = () => {
    setAssessmentComplete(true)
    // In a real app, we would save the assessment results here

    // Redirect to the dashboard after a brief delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 3000)
  }

  const progress = (currentQuestionIndex / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-6">
      {!showResult ? (
        <div className="max-w-3xl mx-auto">
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

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="mr-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">Model B Assessment</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Testing your understanding of {formattedSubtopic}
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
                <h2 className="text-xl font-bold mb-2">Evaluating Your Answers</h2>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Model B is analyzing your responses and preparing your feedback...
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
                  <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect} className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      Click the microphone button and explain your answer verbally. Model B will analyze your response.
                    </p>
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      className={`rounded-full p-8 ${isRecording ? "animate-pulse" : ""}`}
                      onClick={handleRecordVoice}
                    >
                      {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
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
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Assessment"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {!assessmentComplete ? (
            <Card>
              <CardHeader className="text-center">
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
                <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{score}%</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    You answered {Object.keys(answers).length} out of {questions.length} questions
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start">
                    <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">Model B Feedback</h3>
                      <p className="text-blue-700 dark:text-blue-300 mt-1">{feedback}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Question Review</h3>

                  {questions.map((question, index) => (
                    <div key={question.id} className="p-4 rounded-lg border dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-2 mt-0.5">
                            {question.type === "mcq" && answers[question.id] === question.correctAnswer ? (
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
                                    ? question.options?.[Number.parseInt(answers[question.id])]
                                    : "Not answered"}
                                </p>
                                <p className="text-green-600 dark:text-green-400 mt-1">
                                  Correct answer:{" "}
                                  {question.correctAnswer !== undefined
                                    ? question.options?.[Number.parseInt(question.correctAnswer)]
                                    : "N/A"}
                                </p>
                              </div>
                            )}

                            {question.type === "voice" && (
                              <div className="mt-2 text-sm">
                                <p className="text-gray-700 dark:text-gray-300">
                                  Your answer: Voice response {answers[question.id] ? "provided" : "not provided"}
                                </p>
                                <p className="text-green-600 dark:text-green-400 mt-1">
                                  Model B evaluation: Good understanding with some room for improvement
                                </p>
                              </div>
                            )}

                            {question.explanation && (
                              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                                <p className="font-medium">Explanation:</p>
                                <p className="text-gray-600 dark:text-gray-400">{question.explanation}</p>
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
                  Complete Assessment
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Assessment Saved Successfully!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your progress has been recorded. Redirecting to dashboard...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


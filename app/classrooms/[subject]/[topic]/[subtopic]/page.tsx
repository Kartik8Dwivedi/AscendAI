"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  Mic,
  MessageCircle,
  ThumbsUp,
  Star,
  ChevronLeft,
  Send,
  Info,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ModelBAssessmentPanel } from "@/components/model-b-assessment-panel"
import { useToast } from "@/hooks/use-toast"

export default function ClassroomPage() {
  const router = useRouter()
  const params = useParams()
  const { subject, topic, subtopic } = params
  const { toast } = useToast()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [videoEnded, setVideoEnded] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [mentorRating, setMentorRating] = useState(0)

  // Model B assessment availability
  const [isModelBAvailable, setIsModelBAvailable] = useState(false)
  const [lecturesRemaining, setLecturesRemaining] = useState(2)

  // This would come from the backend in a real app
  const totalLecturesInTopic = 3
  const currentLectureNumber = 1

  // Format the topic and subtopic for display
  const formattedTopic = (topic as string)?.replace(/-/g, " ")
  const formattedSubtopic = (subtopic as string)?.replace(/-/g, " ")

  // Format time display (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    // Show toast notification about Model B availability
    if (lecturesRemaining > 0) {
      toast({
        title: "Model B Assessment",
        description: `Complete ${lecturesRemaining} more ${lecturesRemaining === 1 ? "lecture" : "lectures"} to unlock the Model B assessment for this topic.`,
        variant: "info",
      })
    } else {
      toast({
        title: "Model B Assessment Available",
        description: "You can now take the Model B assessment to test your understanding of this topic.",
        variant: "success",
      })
    }

    // Set Model B availability based on lectures remaining
    setIsModelBAvailable(lecturesRemaining === 0)
  }, [lecturesRemaining, toast])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
    }

    const handleVideoEnd = () => {
      setVideoEnded(true)
      setIsPlaying(false)
      // After 1 second, set lesson completed to trigger Model B
      setTimeout(() => {
        setLessonCompleted(true)

        // Update lectures remaining (in a real app, this would be handled by the backend)
        setLecturesRemaining((prev) => Math.max(0, prev - 1))

        // If this was the last lecture needed, make Model B available
        if (lecturesRemaining === 1) {
          setIsModelBAvailable(true)
        }
      }, 1000)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [lecturesRemaining])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = Number.parseFloat(e.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleAskQuestion = () => {
    // For demo purposes, we'll just switch to the discussion tab
    setActiveTab("discussion")
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would post this comment to the backend
    // For demo purposes, we'll just clear the input
    setComment("")
  }

  const handleGoToAssessment = () => {
    // Navigate to the assessment page for this topic
    router.push(`/assessment/${subject}/${topic}/${subtopic}`)
  }

  // Community doubts (sample data)
  const communityDoubts = [
    {
      id: "1",
      user: "Priya S.",
      content:
        "I'm having trouble understanding the difference between convex and concave lenses. Can someone explain?",
      timestamp: "2 days ago",
      replies: [
        {
          id: "1-1",
          user: "Model A",
          content:
            "Great question! Convex lenses are thicker in the middle and thinner at the edges, causing light rays to converge. They form real images (if the object is beyond the focal point) or virtual images (if the object is within the focal point). Concave lenses are thinner in the middle and thicker at the edges, causing light rays to diverge. They always form virtual, upright, and diminished images. The key difference is in how they bend light rays!",
          timestamp: "2 days ago",
          isPinned: true,
        },
        {
          id: "1-2",
          user: "Rahul P.",
          content: "I found it helpful to remember: Convex Converges, Concave Caves in!",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: "2",
      user: "Amit J.",
      content: "Can someone explain the formula for magnification again? I missed that part.",
      timestamp: "1 day ago",
      replies: [
        {
          id: "2-1",
          user: "Model A",
          content:
            "The magnification (m) is the ratio of image height to object height. It can be calculated using m = -v/u where v is the image distance and u is the object distance. The negative sign indicates that if the image is real, it will be inverted relative to the object. If m is positive, the image is virtual and erect. If |m| > 1, the image is larger than the object, and if |m| < 1, the image is smaller.",
          timestamp: "1 day ago",
          isPinned: true,
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {!lessonCompleted ? (
        // MODEL A VIEW - Learning mode with video content
        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <Link href="/subjects" className="flex items-center text-sm hover:underline mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Subjects
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {subject} / {formattedTopic} / {formattedSubtopic}
            </div>
            <Badge className="ml-auto" variant="outline">
              <Info className="h-3 w-3 mr-1" />
              Lecture {currentLectureNumber} of {totalLecturesInTopic}
            </Badge>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4 space-y-6">
              <div className="relative rounded-xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  poster="/placeholder.svg?height=480&width=640"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/placeholder.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {videoEnded && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Lecture Completed!</h3>
                    <p className="mb-6 text-center max-w-md">
                      Great job! Continue to the next lecture to progress through this topic.
                    </p>
                    <Button
                      onClick={() => router.push(`/classroom/${subject}/${topic}/${subtopic}-2`)}
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Next Lecture
                    </Button>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={togglePlayPause}
                        >
                          {isPlaying ? <PauseCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                        </Button>
                        <div className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" className="text-xs" onClick={handleAskQuestion}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Ask a Question
                      </Button>
                    </div>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold mb-2 capitalize">{formattedSubtopic}</h1>
                <p className="text-gray-600 dark:text-gray-400">Taught by Model A (AI Teacher)</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="rating">Rating</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">About this lesson</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        This lesson covers the fundamental concepts of {formattedSubtopic} in {formattedTopic}. You'll
                        learn the key principles, formulas, and applications that are essential for understanding this
                        topic.
                      </p>

                      <h3 className="font-semibold mt-4 mb-2">What you'll learn</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        <li>Core principles of {formattedSubtopic}</li>
                        <li>Important formulas and their derivations</li>
                        <li>Real-world applications and examples</li>
                        <li>Problem-solving techniques</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Ask a Question</h3>
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <Textarea
                        placeholder="Type your question here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button type="button" variant="outline" size="icon" className="mr-2">
                            <Mic className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-gray-500">or record your question</span>
                        </div>
                        <Button type="submit">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Question
                        </Button>
                      </div>
                    </form>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-semibold">Community Doubts</h3>

                    {communityDoubts.map((doubt) => (
                      <div key={doubt.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{doubt.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{doubt.user}</div>
                              <div className="text-xs text-gray-500">{doubt.timestamp}</div>
                            </div>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{doubt.content}</p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pl-10 space-y-4">
                          {doubt.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {reply.user === "Model A" ? "MA" : reply.user.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="font-medium">{reply.user}</div>
                                    {reply.user === "Model A" && <Badge className="ml-2 bg-purple-600">Teacher</Badge>}
                                    {reply.isPinned && <Badge className="ml-2 bg-green-600">Best Answer</Badge>}
                                  </div>
                                  <div className="text-xs text-gray-500">{reply.timestamp}</div>
                                </div>
                                <p className="mt-1 text-gray-700 dark:text-gray-300">{reply.content}</p>
                                <div className="flex gap-2 mt-2">
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                    Helpful
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Lecture Notes</h3>
                      <Textarea placeholder="Take notes while watching the lecture..." className="min-h-[300px]" />
                      <div className="flex justify-end mt-4">
                        <Button>Save Notes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rating" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Rate this lesson</h3>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="focus:outline-none"
                              onClick={() => setRating(star)}
                            >
                              <Star
                                className={`h-8 w-8 ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Rate Model A (Teacher)</h3>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="focus:outline-none"
                              onClick={() => setMentorRating(star)}
                            >
                              <Star
                                className={`h-8 w-8 ${mentorRating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Feedback (Optional)</h3>
                        <Textarea placeholder="Tell us how we can improve this lesson..." className="min-h-[100px]" />
                      </div>

                      <div className="flex justify-end">
                        <Button>Submit Feedback</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:w-1/4">
              <div className="sticky top-20 space-y-6">
                {/* Model B Assessment Panel */}
                <ModelBAssessmentPanel
                  isAvailable={true}
                  lecturesRemaining={lecturesRemaining}
                  subject={subject as string}
                  topic={topic as string}
                  subtopic={subtopic as string}
                />

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Related Topics</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Introduction to {formattedTopic}
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Advanced {formattedSubtopic}
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Applications of {formattedSubtopic}
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Download Slides
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Practice Problems
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                          Reference Materials
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Redirect message
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Redirecting to Next Lecture</h2>
            <p className="mb-4">You'll be redirected to the next lecture momentarily...</p>
            <Button onClick={() => router.push(`/classroom/${subject}/${topic}/${subtopic}-2`)}>
              Continue Learning
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


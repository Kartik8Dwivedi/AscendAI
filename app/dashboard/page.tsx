"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Clock, Award } from "lucide-react"
import { LearningModule } from "@/components/learning-module"
import { CompetitionCard } from "@/components/competition-card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("learn")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-gray-500">Welcome back, Aaryan! Continue your learning journey.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            Start New Lesson
          </Button>
        </div>
      </div>

      <Tabs defaultValue="learn" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:w-[450px]">
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="compete">Compete</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LearningModule
              title="Algebra Fundamentals"
              description="Learn the basics of algebra with Model A and test your understanding with Model B."
              progress={75}
              lessons={8}
              completedLessons={6}
              subject="Mathematics"
              level="Intermediate"
            />

            <LearningModule
              title="Cell Biology"
              description="Explore the fascinating world of cells and cellular processes."
              progress={60}
              lessons={10}
              completedLessons={6}
              subject="Science"
              level="Advanced"
            />

            <LearningModule
              title="Grammar Essentials"
              description="Master the rules of grammar and improve your writing skills."
              progress={90}
              lessons={12}
              completedLessons={11}
              subject="English"
              level="Beginner"
            />

            <LearningModule
              title="Ancient Civilizations"
              description="Discover the wonders of ancient civilizations and their contributions."
              progress={40}
              lessons={15}
              completedLessons={6}
              subject="History"
              level="Intermediate"
            />

            <LearningModule
              title="Chemical Reactions"
              description="Learn about different types of chemical reactions and their applications."
              progress={20}
              lessons={8}
              completedLessons={2}
              subject="Chemistry"
              level="Advanced"
            />

            <LearningModule
              title="Geometry Basics"
              description="Understand the fundamental concepts of geometry and spatial reasoning."
              progress={0}
              lessons={10}
              completedLessons={0}
              subject="Mathematics"
              level="Beginner"
              isNew={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="compete" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompetitionCard
              title="Math Challenge"
              description="Test your math skills against other students in this timed competition."
              participants={24}
              startTime="10:00 AM"
              duration="30 minutes"
              difficulty="Intermediate"
              rewards="50 Credits"
              status="upcoming"
            />

            <CompetitionCard
              title="Science Quiz"
              description="Answer questions about biology, chemistry, and physics to earn credits."
              participants={18}
              startTime="2:00 PM"
              duration="45 minutes"
              difficulty="Advanced"
              rewards="75 Credits"
              status="upcoming"
            />

            <CompetitionCard
              title="English Vocabulary"
              description="Expand your vocabulary and compete with peers in this word challenge."
              participants={32}
              startTime="11:30 AM"
              duration="20 minutes"
              difficulty="Beginner"
              rewards="30 Credits"
              status="live"
            />

            <CompetitionCard
              title="History Trivia"
              description="Test your knowledge of historical events and figures."
              participants={15}
              startTime="Yesterday"
              duration="40 minutes"
              difficulty="Intermediate"
              rewards="60 Credits"
              status="completed"
              result="1st Place"
            />
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your progress across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Progress chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and rewards earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-purple-100 p-2 mr-3">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Math Master</p>
                      <p className="text-xs text-gray-500">Completed all algebra modules</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-100 p-2 mr-3">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Quiz Champion</p>
                      <p className="text-xs text-gray-500">Won 5 competitions in a row</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Consistent Learner</p>
                      <p className="text-xs text-gray-500">10-day learning streak</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-100 p-2 mr-3">
                      <Star className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Science Expert</p>
                      <p className="text-xs text-gray-500">Complete all science modules (locked)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Subject Mastery</CardTitle>
                <CardDescription>Your proficiency level in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Mathematics</span>
                        <Badge className="bg-purple-500">Advanced</Badge>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Science</span>
                        <Badge className="bg-blue-500">Intermediate</Badge>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">English</span>
                        <Badge className="bg-green-500">Expert</Badge>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">History</span>
                        <Badge className="bg-yellow-500">Beginner</Badge>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Star,
  Award,
  BookOpen,
  Share2,
  Users,
  Flame,
  Medal,
  Zap,
  Brain,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for the heatmap
  const currentYear = new Date().getFullYear()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Generate random activity data for the heatmap
  const generateHeatmapData = () => {
    const data = []
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate()
      const monthData = []

      for (let day = 1; day <= daysInMonth; day++) {
        // Random activity level: 0 (none), 1 (low), 2 (medium), 3 (high), 4 (very high)
        const activityLevel = Math.floor(Math.random() * 5)
        monthData.push({
          day,
          level: activityLevel,
        })
      }

      data.push({
        month: months[month],
        days: monthData,
      })
    }
    return data
  }

  const heatmapData = generateHeatmapData()

  // Get activity level class based on the level
  const getActivityClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-gray-800"
      case 1:
        return "bg-green-100 dark:bg-green-900/30"
      case 2:
        return "bg-green-300 dark:bg-green-800/50"
      case 3:
        return "bg-green-500 dark:bg-green-700"
      case 4:
        return "bg-green-700 dark:bg-green-500"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Aaryan Tripathi" />
                  <AvatarFallback className="text-2xl">AT</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">Aaryan Tripathi</h2>
                <p className="text-gray-500 dark:text-gray-400">Physics Enthusiast</p>

                <div className="flex items-center mt-2 space-x-1">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-bold">12</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">day streak</span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Users className="h-4 w-4 mr-1" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rank</div>
                  <div className="font-medium">
                    <Badge className="bg-purple-600">Top 5%</Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Joined</div>
                  <div className="font-medium">March 2023</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Subjects</div>
                  <div className="font-medium">4</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Competitions</div>
                  <div className="font-medium">12</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Connect</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Physics</span>
                  <span className="text-sm font-medium">Advanced</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm font-medium">Intermediate</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm font-medium">Beginner</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 mb-1">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-center">Quick Learner</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 mb-1">
                    <Medal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-center">Champion</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 mb-1">
                    <Flame className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-center">10-Day Streak</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900/50 p-3 mb-1">
                    <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-xs text-center">Problem Solver</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-3 mb-1">
                    <Sparkles className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-xs text-center">Top Student</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-1">
                    <Award className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <span className="text-xs text-center text-gray-400">Locked</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 lg:w-3/4 space-y-6">
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Lessons Completed</p>
                        <p className="text-3xl font-bold">24</p>
                      </div>
                      <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3">
                        <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Competitions Won</p>
                        <p className="text-3xl font-bold">7</p>
                      </div>
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3">
                        <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Credits Earned</p>
                        <p className="text-3xl font-bold">350</p>
                      </div>
                      <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3">
                        <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Learning Streak</p>
                        <p className="text-3xl font-bold">12 days</p>
                      </div>
                      <div className="rounded-full bg-orange-100 dark:bg-orange-900/50 p-3">
                        <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Learning Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>Your learning journey throughout {currentYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                      <div className="flex mb-2">
                        {months.map((month) => (
                          <div key={month} className="flex-1 text-center text-xs text-gray-500">
                            {month}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-rows-7 grid-flow-col gap-1">
                        {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                          <div key={dayOfWeek} className="flex">
                            {heatmapData.map((month, monthIndex) => (
                              <div key={`${month.month}-${dayOfWeek}`} className="flex-1 flex gap-1 justify-center">
                                {month.days
                                  .filter((_, index) => index % 7 === dayOfWeek)
                                  .map((day, index) => (
                                    <div
                                      key={`${month.month}-${day.day}-${index}`}
                                      className={`w-3 h-3 rounded-sm ${getActivityClass(day.level)}`}
                                      title={`${month.month} ${day.day}: ${day.level} activities`}
                                    />
                                  ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end mt-4 space-x-2">
                        <div className="text-xs text-gray-500">Less</div>
                        <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900/30"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800/50"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-700"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-500"></div>
                        <div className="text-xs text-gray-500">More</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Mastery */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Mastery</CardTitle>
                  <CardDescription>Your proficiency level in each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Physics</span>
                          <Badge className="bg-purple-500">Advanced</Badge>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Mathematics</span>
                          <Badge className="bg-blue-500">Intermediate</Badge>
                        </div>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Chemistry</span>
                          <Badge className="bg-green-500">Beginner</Badge>
                        </div>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Biology</span>
                          <Badge className="bg-yellow-500">Beginner</Badge>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2 mr-4">
                        <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Completed Ray Optics Lesson</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 mr-4">
                        <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Won Physics Quiz Competition</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-2 mr-4">
                        <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Earned 50 Credits</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-orange-100 dark:bg-orange-900/50 p-2 mr-4">
                        <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium">Joined Physics Study Group</p>
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and rewards earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 mr-4">
                        <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Physics Master</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed all optics modules</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Earned 2 weeks ago</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 mr-4">
                        <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Quiz Champion</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Won 5 competitions in a row</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Earned 1 month ago</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 mr-4">
                        <Flame className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Consistent Learner</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">10-day learning streak</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Earned 2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="rounded-full bg-amber-100 dark:bg-amber-900/50 p-3 mr-4">
                        <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium">Problem Solver</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Solved 50 complex problems</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Earned 3 weeks ago</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-3 mr-4">
                        <Sparkles className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium">Top Student</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ranked in the top 5% of all students</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Earned 2 months ago</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="rounded-full bg-gray-200 dark:bg-gray-700 p-3 mr-4">
                        <Award className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-400 dark:text-gray-500">Science Expert</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">Complete all science modules</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Locked</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>Your learning journey throughout {currentYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                      <div className="flex mb-2">
                        {months.map((month) => (
                          <div key={month} className="flex-1 text-center text-xs text-gray-500">
                            {month}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-rows-7 grid-flow-col gap-1">
                        {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                          <div key={dayOfWeek} className="flex">
                            {heatmapData.map((month, monthIndex) => (
                              <div key={`${month.month}-${dayOfWeek}`} className="flex-1 flex gap-1 justify-center">
                                {month.days
                                  .filter((_, index) => index % 7 === dayOfWeek)
                                  .map((day, index) => (
                                    <div
                                      key={`${month.month}-${day.day}-${index}`}
                                      className={`w-3 h-3 rounded-sm ${getActivityClass(day.level)}`}
                                      title={`${month.month} ${day.day}: ${day.level} activities`}
                                    />
                                  ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end mt-4 space-x-2">
                        <div className="text-xs text-gray-500">Less</div>
                        <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900/30"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800/50"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-700"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-500"></div>
                        <div className="text-xs text-gray-500">More</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Your recent learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[25px] rounded-full bg-purple-100 dark:bg-purple-900/50 p-1">
                        <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Completed Ray Optics Lesson</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                        <p className="text-sm mt-1">Finished the lesson with a score of 92% on the assessment.</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] rounded-full bg-blue-100 dark:bg-blue-900/50 p-1">
                        <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Won Physics Quiz Competition</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                        <p className="text-sm mt-1">
                          Ranked 1st among 24 participants in the weekly physics challenge.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] rounded-full bg-green-100 dark:bg-green-900/50 p-1">
                        <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Earned 50 Credits</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                        <p className="text-sm mt-1">Received credits for helping 5 other students with their doubts.</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[25px] rounded-full bg-orange-100 dark:bg-orange-900/50 p-1">
                        <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium">Joined Physics Study Group</p>
                        <p className="text-sm text-gray-500">3 days ago</p>
                        <p className="text-sm mt-1">
                          Joined a group of 12 students focusing on advanced physics concepts.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competition History</CardTitle>
                  <CardDescription>Your performance in academic competitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Physics Weekly Challenge</h3>
                          <p className="text-sm text-gray-500">Yesterday</p>
                        </div>
                        <Badge className="bg-green-500">1st Place</Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Score: 95/100</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">24 Participants</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">+50 Credits</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Mathematics Olympiad</h3>
                          <p className="text-sm text-gray-500">Last week</p>
                        </div>
                        <Badge className="bg-blue-500">3rd Place</Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Score: 88/100</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">42 Participants</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">+30 Credits</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Science Quiz Bowl</h3>
                          <p className="text-sm text-gray-500">2 weeks ago</p>
                        </div>
                        <Badge className="bg-green-500">1st Place</Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Score: 92/100</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">18 Participants</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">+45 Credits</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Chemistry Challenge</h3>
                          <p className="text-sm text-gray-500">1 month ago</p>
                        </div>
                        <Badge className="bg-yellow-500">5th Place</Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Score: 78/100</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">32 Participants</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">+15 Credits</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Competitions</CardTitle>
                  <CardDescription>Competitions you can participate in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Advanced Physics Challenge</h3>
                          <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          Registered
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Duration: 45 minutes</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">30 Participants</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">Prize: 100 Credits</div>
                      </div>
                      <Button size="sm" className="mt-3" variant="outline">
                        View Details
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Mathematics Marathon</h3>
                          <p className="text-sm text-gray-500">Next week, 2:00 PM</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Register
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="text-sm">Duration: 60 minutes</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">15 Participants so far</div>
                        <div className="mx-2 text-gray-300">•</div>
                        <div className="text-sm">Prize: 150 Credits</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


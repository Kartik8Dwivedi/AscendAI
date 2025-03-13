import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ArrowRight } from "lucide-react"

interface LearningModuleProps {
  title: string
  description: string
  progress: number
  lessons: number
  completedLessons: number
  subject: string
  level: "Beginner" | "Intermediate" | "Advanced"
  isNew?: boolean
}

export function LearningModule({
  title,
  description,
  progress,
  lessons,
  completedLessons,
  subject,
  level,
  isNew = false,
}: LearningModuleProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-blue-500"
      case "Advanced":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        return "bg-purple-100 text-purple-600"
      case "Science":
        return "bg-blue-100 text-blue-600"
      case "English":
        return "bg-green-100 text-green-600"
      case "History":
        return "bg-amber-100 text-amber-600"
      case "Chemistry":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`rounded-full p-2 ${getSubjectColor(subject)}`}>
            <BookOpen className="h-4 w-4" />
          </div>
          {isNew && <Badge className="bg-red-500">New</Badge>}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        <div className="flex justify-between mb-1 text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />

        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{subject}</Badge>
            <Badge className={getLevelColor(level)}>{level}</Badge>
          </div>
          <span>
            {completedLessons}/{lessons} lessons
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {progress === 0 ? "Start Learning" : "Continue Learning"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}


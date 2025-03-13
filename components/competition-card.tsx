import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, Award } from "lucide-react"

interface CompetitionCardProps {
  title: string
  description: string
  participants: number
  startTime: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rewards: string
  status: "upcoming" | "live" | "completed"
  result?: string
}

export function CompetitionCard({
  title,
  description,
  participants,
  startTime,
  duration,
  difficulty,
  rewards,
  status,
  result,
}: CompetitionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600"
      case "live":
        return "bg-red-100 text-red-600"
      case "completed":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming"
      case "live":
        return "Live Now"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
            <Trophy className="h-4 w-4" />
          </div>
          <Badge className={getStatusColor(status)}>{getStatusText(status)}</Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            <span>{participants} Participants</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <Award className="h-4 w-4 mr-2 text-gray-500" />
            <span>{rewards}</span>
          </div>
          <div className="flex items-center text-sm">
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
          </div>
        </div>

        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>Starts: {startTime}</span>
        </div>

        {status === "completed" && result && (
          <div className="mt-2 flex items-center">
            <Badge className="bg-green-500 mr-2">Result</Badge>
            <span className="font-medium">{result}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={status === "live" ? "default" : status === "completed" ? "outline" : "secondary"}
          disabled={status === "completed"}
        >
          {status === "upcoming" ? "Register" : status === "live" ? "Join Now" : "View Results"}
        </Button>
      </CardFooter>
    </Card>
  )
}


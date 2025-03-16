import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Lock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ModelBAssessmentPanelProps {
  isAvailable: boolean
  lecturesRemaining?: number
  subject: string
  topic: string
  subtopic: string
}

export function ModelBAssessmentPanel({
  isAvailable,
  lecturesRemaining = 0,
  subject,
  topic,
  subtopic,
}: ModelBAssessmentPanelProps) {
  return (
    <Card className={`${isAvailable ? "" : "opacity-80"}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full p-2 ${isAvailable ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}
            >
              <Brain className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Teach the Model B</CardTitle>
          </div>
          {isAvailable ? (
            <Badge className="bg-green-500">Available</Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <Lock className="h-3 w-3 mr-1" />
              Locked
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAvailable ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You've completed enough lectures to teach the Model B. Test your learnings by teaching Model B and earn rewards!
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 shrink-0" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  This section includes both multiple-choice questions and voice-based explanations to thoroughly evaluate
                  your understanding.
                </div>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href={`/assessment/${subject}/${topic}/${subtopic}`}>
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete {lecturesRemaining} more {lecturesRemaining === 1 ? "lecture" : "lectures"} to complete this subtopic to unlock the Model B
              assessment.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 shrink-0" />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Model B will test your understanding of the entire topic once you've completed the required lectures.
                </div>
              </div>
            </div>
            <Button disabled className="w-full">
              Assessment Locked
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


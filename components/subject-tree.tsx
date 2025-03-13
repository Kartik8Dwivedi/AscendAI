"use client"

import * as React from "react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, ChevronDown, BookOpen } from "lucide-react"

type Topic = {
  id: string
  title: string
  path: string
  subtopics?: Topic[]
}

type SubjectTreeProps = {
  subject: string
  topics: Topic[]
}

export function SubjectTree({ subject, topics }: SubjectTreeProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-2">{subject}</h3>
      <div className="space-y-1">
        {topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} level={0} />
        ))}
      </div>
    </div>
  )
}

type TopicItemProps = {
  topic: Topic
  level: number
}

function TopicItem({ topic, level }: TopicItemProps) {
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="ml-4">
      {hasSubtopics ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
          <div className="flex items-center">
            <CollapsibleTrigger asChild>
              <button className="p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 mr-1">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </CollapsibleTrigger>
            <Link
              href={topic.path}
              className="flex items-center p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
            >
              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
              {topic.title}
            </Link>
          </div>
          <CollapsibleContent>
            <div className="space-y-1 pt-1">
              {topic.subtopics?.map((subtopic) => (
                <TopicItem key={subtopic.id} topic={subtopic} level={level + 1} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex items-center">
          <div className="w-6" />
          <Link
            href={topic.path}
            className="flex items-center p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          >
            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
            {topic.title}
          </Link>
        </div>
      )}
    </div>
  )
}


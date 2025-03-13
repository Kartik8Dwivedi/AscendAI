import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, Download, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access supplementary materials to enhance your learning experience
        </p>
      </div>

      <Tabs defaultValue="videos" className="space-y-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="external">External Links</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mathematics Videos */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2 text-purple-600 dark:text-purple-400">
                    <Video className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">Algebra Fundamentals</CardTitle>
                <CardDescription>Learn the basics of algebraic equations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=180&width=320"
                    alt="Algebra video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Duration: 15 minutes</p>
                  <p>Instructor: Model A</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Watch Video</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2 text-purple-600 dark:text-purple-400">
                    <Video className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">Photosynthesis Explained</CardTitle>
                <CardDescription>Understanding how plants make food</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=180&width=320"
                    alt="Photosynthesis video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Duration: 12 minutes</p>
                  <p>Instructor: Model A</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Watch Video</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-2 text-purple-600 dark:text-purple-400">
                    <Video className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">Ancient Civilizations</CardTitle>
                <CardDescription>Journey through history's greatest empires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden relative">
                  <img
                    src="/placeholder.svg?height=180&width=320"
                    alt="History video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Duration: 18 minutes</p>
                  <p>Instructor: Model A</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Watch Video</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 text-blue-600 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">Algebra Study Guide</CardTitle>
                <CardDescription>Comprehensive notes and practice problems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Format: PDF</p>
                  <p>Pages: 24</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 text-blue-600 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">Biology Workbook</CardTitle>
                <CardDescription>Illustrated guide to plant biology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Format: PDF</p>
                  <p>Pages: 32</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2 text-blue-600 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>
                <CardTitle className="mt-2">History Timeline</CardTitle>
                <CardDescription>Chronological events of ancient civilizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>Format: PDF</p>
                  <p>Pages: 18</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="external" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Khan Academy</CardTitle>
                <CardDescription>Free world-class education for anyone, anywhere</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Khan Academy offers practice exercises, instructional videos, and a personalized learning dashboard
                  that empower learners to study at their own pace.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>National Geographic Education</CardTitle>
                <CardDescription>Resources for teaching and learning science, geography, and history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  National Geographic Education provides free educational resources for students and educators to
                  inspire exploration and discovery.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crash Course</CardTitle>
                <CardDescription>Educational YouTube channel covering various subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Crash Course offers quick, entertaining educational videos on subjects ranging from astronomy to world
                  history.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Channel
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desmos Graphing Calculator</CardTitle>
                <CardDescription>Free online graphing calculator for math</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Desmos offers a powerful and free online graphing calculator that helps students visualize
                  mathematical concepts.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Tool
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


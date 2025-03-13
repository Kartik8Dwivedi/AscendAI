import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Trophy, BarChart3, Users, Video, Mic, Brain, Sparkles, CheckCircle } from "lucide-react"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-950 dark:to-purple-950">
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Learn by Teaching AI
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              An AI-powered virtual classroom that personalizes learning, boosts
              engagement, and makes education accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white bg-[#1f3aa5b1] border-white hover:bg-white hover:text-black"
              >
                Watch Demo
                <Video className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Our Revolutionary Platform Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our dual AI model approach creates a complete learning ecosystem
              that adapts to each student's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Video-based learning with Model A"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                    <video
                      className="h-12 w-12 object-cover"
                      src="/public/videoplayback.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Video className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Video-Based Learning with Model A
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI tutor (Model A) delivers personalized video lessons
                    tailored to your learning style and pace. The content adapts
                    in real-time based on your interactions and progress.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Mic className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Interactive Doubt Resolution
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ask questions anytime during your lesson through voice or
                    text. Model A instantly clarifies concepts, ensuring you
                    never get stuck or fall behind.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 h-12 w-12 flex items-center justify-center shrink-0">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Continuous Assessment with Model B
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Model B silently evaluates your understanding by analyzing
                    your questions and responses. It provides feedback to Model
                    A, which then adjusts teaching methods to address your
                    specific needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI-powered education system offers unique advantages that
              traditional methods can't match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Personalized 1:1 Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every student gets their own AI tutor that adapts to their
                  learning style, pace, and preferences. It's like having a
                  dedicated teacher available 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Gamified Learning Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Compete in MCQ battles with peers, earn credits for correct
                  answers, and unlock achievements. Learning becomes fun,
                  engaging, and motivating.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Detailed Progress Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your learning journey with comprehensive analytics that
                  identify strengths and areas for improvement. Watch your
                  progress grow in real-time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Bridging the Education Gap
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            Our platform addresses the key challenges in the Indian education
            system compared to high-performing countries like Finland.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Current Challenges in India
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Low teacher-student ratio
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      India has only 2.4 teachers per 100 students compared to
                      Finland's 8.7, leading to overcrowded classrooms and
                      limited individual attention.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Lower PISA percentile scores
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      India ranks in the bottom 30% in PISA scores, while
                      Finland consistently ranks in the top 10%, indicating a
                      significant gap in educational outcomes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Limited internet exposure
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Only 43% of India's population has internet access
                      compared to Finland's 96%, creating a digital divide that
                      limits access to online educational resources.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Outdated curriculum and teaching methods
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Many schools still rely on rote learning rather than
                      critical thinking and practical application, failing to
                      prepare students for modern challenges.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Our Solution
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      AI tutors for every student
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Our platform provides a personalized 1:1 teaching
                      experience for every student, effectively solving the
                      teacher shortage problem.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Adaptive curriculum</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Our AI models deliver up-to-date content that adapts to
                      global standards while focusing on critical thinking and
                      practical application.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Low bandwidth optimization
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Our platform is optimized for low-bandwidth connections
                      and basic smartphones, making it accessible even in areas
                      with limited internet connectivity.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">
                      Engaging learning methods
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Our gamified approach with competitions, rewards, and
                      interactive video lessons keeps students motivated and
                      increases retention rates.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform leverages cutting-edge AI and cloud technologies to
              deliver a seamless learning experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-md">
                <Sparkles className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">aiXplain Platform</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simplifies building and deploying AI agents with minimal coding
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-md">
                <svg
                  className="h-10 w-10 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Dual AI Models</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model A teaches while Model B assesses understanding
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-md">
                <svg
                  className="h-10 w-10 text-green-600 dark:text-green-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">GCP Infrastructure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scalable cloud computing for reliable performance
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-md">
                <svg
                  className="h-10 w-10 text-amber-600 dark:text-amber-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Multi-Device Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Works on smartphones, tablets, and computers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how our platform is transforming education for students across
              India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Student portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Priya Sharma</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      10th Grade Student, Rajasthan
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <CheckCircle
                      key={star}
                      className="h-5 w-5 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  "I live in a remote village with limited access to quality
                  teachers. This platform has completely changed my education.
                  I've improved my math scores by 40% in just three months!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Student portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Rahul Patel</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      12th Grade Student, Gujarat
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <CheckCircle
                      key={star}
                      className="h-5 w-5 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  "The competitive aspect of the platform keeps me motivated.
                  I've completed twice as many lessons as I would have with
                  traditional methods. The video lessons are engaging and easy
                  to understand."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Teacher portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Anita Desai</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      School Principal, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <CheckCircle
                      key={star}
                      className="h-5 w-5 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  "We've implemented this platform in our school, and the
                  results are remarkable. Our students are more engaged, and
                  teachers can focus on providing personalized guidance rather
                  than basic instruction."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 dark:from-purple-950 dark:to-indigo-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already benefiting from our
            AI-powered educational platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white bg-[#1f3aa5b1] border-white hover:bg-white hover:text-black"
            >
              Schedule a Demo
              <Video className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


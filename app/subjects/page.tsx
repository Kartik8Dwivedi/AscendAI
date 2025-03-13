import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, BookOpen, FlaskRoundIcon as Flask, Calculator } from "lucide-react"

export default function SubjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Subjects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through various subjects and topics to start your learning journey
        </p>
      </div>

      <Tabs defaultValue="physics" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="physics" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Physics</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex items-center gap-2">
            <Flask className="h-4 w-4" />
            <span>Chemistry</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physics" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Ray Optics</CardTitle>
              <CardDescription>The study of light propagation in terms of rays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Basic understanding of light properties</li>
                    <li>Fundamental principles of reflection and refraction</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/physics/ray-optics/reflection-laws"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Laws of Reflection</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/physics/ray-optics/refraction"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Refraction of Light</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/physics/ray-optics/lenses"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Lenses and Optical Instruments</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waves</CardTitle>
              <CardDescription>Oscillations and wave phenomena in nature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Understanding of simple harmonic motion</li>
                    <li>Basic knowledge of force and energy</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/physics/waves/wave-motion"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Wave Motion and Properties</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/physics/waves/sound-waves"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Sound Waves</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/physics/waves/doppler-effect"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Doppler Effect</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chemistry" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Organic Chemistry</CardTitle>
              <CardDescription>The study of carbon-containing compounds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Basic understanding of atomic structure</li>
                    <li>Knowledge of chemical bonding</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/chemistry/organic/hydrocarbons"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Hydrocarbons</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/chemistry/organic/functional-groups"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Functional Groups</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/chemistry/organic/reaction-mechanisms"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Reaction Mechanisms</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inorganic Chemistry</CardTitle>
              <CardDescription>Chemistry of non-carbon compounds and elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Understanding of the periodic table</li>
                    <li>Knowledge of ionic and covalent bonding</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/chemistry/inorganic/periodic-table"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Periodic Table and Trends</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/chemistry/inorganic/coordination-compounds"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Coordination Compounds</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/chemistry/inorganic/transition-elements"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Transition Elements</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Algebra</CardTitle>
              <CardDescription>The study of mathematical symbols and rules for manipulating them</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Basic arithmetic operations</li>
                    <li>Understanding of number systems</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/mathematics/algebra/linear-equations"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Linear Equations</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/algebra/quadratic-equations"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Quadratic Equations</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/algebra/polynomials"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Polynomials</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trigonometry</CardTitle>
              <CardDescription>The study of relationships between angles and sides of triangles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Basic geometric concepts</li>
                    <li>Understanding of right triangles</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/mathematics/trigonometry/basic-ratios"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Trigonometric Ratios</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/trigonometry/identities"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Trigonometric Identities</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/trigonometry/applications"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Applications of Trigonometry</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculus</CardTitle>
              <CardDescription>The study of continuous change and motion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="font-medium">Prerequisites:</div>
                  <ul className="mt-2 ml-6 list-disc text-sm text-gray-600 dark:text-gray-400">
                    <li>Strong foundation in algebra</li>
                    <li>Understanding of functions and graphs</li>
                    <li>Knowledge of limits</li>
                  </ul>
                </div>

                <div>
                  <div className="font-medium mb-2">Topics:</div>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/classroom/mathematics/calculus/differentiation"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Differentiation</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/calculus/integration"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Integration</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/classroom/mathematics/calculus/applications"
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <span>Applications of Calculus</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


import React from 'react';
import { Link } from 'wouter';
import { BookOpen, Wrench, Calendar, FileText, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-hero-title">
            Welcome to YB Patil Hub
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90" data-testid="text-hero-description">
            Your comprehensive educational platform for MSBTE students. Access previous year papers, 
            explore DTE electronic projects, stay updated with events, and enhance your learning journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/papers" data-testid="button-browse-papers">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Papers
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Link href="/projects" data-testid="button-explore-projects">
                <Wrench className="w-5 h-5 mr-2" />
                Explore Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-features-title">
            Everything You Need for Academic Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive suite of educational resources designed specifically for MSBTE students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
              <CardTitle>Previous Year Papers</CardTitle>
              <CardDescription>
                Access question papers organized by subjects, streams, and examination periods from Summer 2024 to Winter 2021.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/papers" data-testid="button-view-papers">
                  View Papers
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Wrench className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>DTE Projects</CardTitle>
              <CardDescription>
                Explore 19 innovative electronic microprojects with detailed components, pricing, and implementation guides.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/projects" data-testid="button-view-projects">
                  View Projects
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-10 h-10 text-purple-600 mb-2" />
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                Download and submit assignments for all subjects with clear instructions and deadlines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/assignments" data-testid="button-view-assignments">
                  View Assignments
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="w-10 h-10 text-red-600 mb-2" />
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Stay updated with college events, workshops, seminars, and important academic announcements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/events" data-testid="button-view-events">
                  View Events
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <GraduationCap className="w-10 h-10 text-orange-600 mb-2" />
              <CardTitle>Stream-Specific Content</CardTitle>
              <CardDescription>
                Content organized by streams: Computer, Civil, Mechanical, and ENTC for targeted learning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard" data-testid="button-view-dashboard">
                  View Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-10 h-10 text-teal-600 mb-2" />
              <CardTitle>Community Support</CardTitle>
              <CardDescription>
                Connect with fellow students, share resources, and collaborate on projects and studies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/donate" data-testid="button-support-community">
                  Support Community
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-subjects-title">
              Available Subjects
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive resources available for all major subjects in the MSBTE curriculum.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'Data Structure Using C',
              'Database Management System',
              'Digital Techniques',
              'Object Oriented Programming Using C++',
              'Computer Graphics',
              'Essence of Indian Constitution'
            ].map((subject, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border text-center"
                data-testid={`subject-${subject.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h3 className="font-semibold text-sm">{subject}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of MSBTE students who trust YB Patil Hub for their academic success.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/register" data-testid="button-get-started">
              Get Started - It's Free!
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
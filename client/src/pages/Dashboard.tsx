import React from 'react';
import { Link } from 'wouter';
import { FileText, Zap, Calendar, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4" data-testid="hero-title">
            Welcome to YB Patil Hub
          </h1>
          <p className="text-xl mb-6 opacity-90" data-testid="hero-description">
            Your one-stop platform for previous year question papers, DTE projects, events, and more!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/papers">
              <Button 
                variant="secondary" 
                size="lg"
                data-testid="button-browse-papers"
              >
                <FileText className="w-5 h-5 mr-2" />
                Browse Papers
              </Button>
            </Link>
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-view-projects"
              >
                <Zap className="w-5 h-5 mr-2" />
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Papers</p>
                <p className="text-2xl font-bold" data-testid="stat-total-papers">247</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">DTE Projects</p>
                <p className="text-2xl font-bold" data-testid="stat-dte-projects">19</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold" data-testid="stat-upcoming-events">5</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Previous Year Papers</CardTitle>
            <CardDescription>
              Access question papers from Winter 2024, Summer 2024, and previous terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/papers">
              <Button variant="ghost" className="p-0 h-auto text-primary font-medium hover:underline">
                Browse Papers →
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle>DTE Electronic Projects</CardTitle>
            <CardDescription>
              Explore 19 microprojects with detailed specifications and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/projects">
              <Button variant="ghost" className="p-0 h-auto text-secondary font-medium hover:underline">
                View Projects →
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Join meetups, parties, seminars and other college activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/events">
              <Button variant="ghost" className="p-0 h-auto text-accent-foreground font-medium hover:underline">
                View Events →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

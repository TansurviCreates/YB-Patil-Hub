import React, { useState } from 'react';
import { 
  Settings, Upload, Edit, FileText, Wrench, Calendar, 
  Image, Video, Plus, Save, Trash2, Users, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

const subjects = [
  'Data Structure Using C',
  'Database Management System', 
  'Digital Techniques',
  'Object Oriented Programming Using C++',
  'Computer Graphics',
  'Essence of Indian Constitution'
];

const examPeriods = [
  'Summer 2024',
  'Winter 2023',
  'Summer 2023', 
  'Winter 2022',
  'Summer 2022',
  'Winter 2021'
];

const AdminPanel: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedProject, setSelectedProject] = useState('1');
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    components: '',
    price: '',
    teamMembers: ''
  });

  // Check if user is admin
  if (!userProfile?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              You need administrator privileges to access this panel.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-admin-panel-title">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">
            Manage all content, upload files, and edit website information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Administrator Mode</span>
        </div>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects" data-testid="tab-projects">
            <Wrench className="w-4 h-4 mr-2" />
            DTE Projects
          </TabsTrigger>
          <TabsTrigger value="papers" data-testid="tab-papers">
            <FileText className="w-4 h-4 mr-2" />
            Question Papers
          </TabsTrigger>
          <TabsTrigger value="assignments" data-testid="tab-assignments">
            <BookOpen className="w-4 h-4 mr-2" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="content" data-testid="tab-content">
            <Edit className="w-4 h-4 mr-2" />
            Page Content
          </TabsTrigger>
        </TabsList>

        {/* DTE Projects Management */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Manage DTE Projects (1-19)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="project-select">Select Project:</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 19 }, (_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        Project {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      value={projectData.title}
                      onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={projectData.description}
                      onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                      placeholder="Enter project description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-components">Components</Label>
                    <Textarea
                      id="project-components"
                      value={projectData.components}
                      onChange={(e) => setProjectData({...projectData, components: e.target.value})}
                      placeholder="List all components required"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-price">Price (₹)</Label>
                    <Input
                      id="project-price"
                      type="number"
                      value={projectData.price}
                      onChange={(e) => setProjectData({...projectData, price: e.target.value})}
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="project-team">Team Members</Label>
                    <Input
                      id="project-team"
                      value={projectData.teamMembers}
                      onChange={(e) => setProjectData({...projectData, teamMembers: e.target.value})}
                      placeholder="Comma separated names"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Project Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload project image
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Project Video</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload project video
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Video
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full" data-testid="button-save-project">
                    <Save className="w-4 h-4 mr-2" />
                    Save Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Question Papers Management */}
        <TabsContent value="papers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Manage Question Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Exam Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam period" />
                    </SelectTrigger>
                    <SelectContent>
                      {examPeriods.map(period => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Upload PDF</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Upload Question Paper</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose a PDF file to upload for the selected subject and exam period
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose PDF File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Management */}
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Manage Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignment-title">Assignment Title</Label>
                  <Input
                    id="assignment-title"
                    placeholder="Enter assignment title"
                  />
                </div>

                <div>
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="assignment-description">Assignment Description</Label>
                <Textarea
                  id="assignment-description"
                  placeholder="Describe what the assignment is about"
                  rows={4}
                />
              </div>

              <div>
                <Label>Upload Assignment PDF</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload assignment PDF file
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose PDF
                  </Button>
                </div>
              </div>

              <Button className="w-full" data-testid="button-save-assignment">
                <Plus className="w-4 h-4 mr-2" />
                Add Assignment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Management */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Manage Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <Label htmlFor="event-date">Event Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  placeholder="Enter event location"
                />
              </div>

              <div>
                <Label htmlFor="event-description">Event Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe the event details"
                  rows={4}
                />
              </div>

              <Button className="w-full" data-testid="button-save-event">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page Content Management */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Page Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Page to Edit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose page to edit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="about">About Page</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                    <SelectItem value="projects">Projects Page</SelectItem>
                    <SelectItem value="papers">Papers Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="page-title">Page Title</Label>
                <Input
                  id="page-title"
                  placeholder="Enter page title"
                />
              </div>

              <div>
                <Label htmlFor="page-content">Page Content</Label>
                <Textarea
                  id="page-content"
                  placeholder="Edit page content and text"
                  rows={10}
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" data-testid="button-save-content">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="flex-1">
                  Preview Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

const subjects = [
  'Data Structure Using C',
  'Database Management System',
  'Digital Techniques',
  'Object Oriented Programming Using C++',
  'Computer Graphics',
  'Essence of Indian Constitution'
];

// Mock assignments data - will be replaced with real data from API
const mockAssignments = [
  {
    id: '1',
    title: 'Array Implementation in C',
    description: 'Implement various array operations including insertion, deletion, and searching algorithms.',
    subject: 'Data Structure Using C',
    fileUrl: '#',
    uploadedBy: 'admin',
    stream: 'Computer',
    year: '2nd',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'ER Diagram Design',
    description: 'Create Entity-Relationship diagrams for a library management system.',
    subject: 'Database Management System',
    fileUrl: '#',
    uploadedBy: 'admin',
    stream: 'Computer',
    year: '2nd',
    createdAt: new Date('2024-01-10')
  }
];

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const handleDownload = (assignmentId: string, title: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Handle download logic
    console.log('Downloading assignment:', assignmentId, title);
  };

  const handleView = (assignmentId: string, title: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Handle view logic
    console.log('Viewing assignment:', assignmentId, title);
  };

  const filteredAssignments = selectedSubject === 'all' 
    ? mockAssignments 
    : mockAssignments.filter(assignment => assignment.subject === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">Assignments</h1>
            <p className="text-muted-foreground mt-2">
              Download assignments for all subjects with clear instructions and requirements.
            </p>
          </div>
        </div>

        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="all" data-testid="tab-all-subjects">All</TabsTrigger>
            {subjects.map((subject) => (
              <TabsTrigger 
                key={subject} 
                value={subject}
                className="text-xs"
                data-testid={`tab-${subject.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {subject.split(' ').slice(0, 2).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedSubject} className="mt-6">
            {filteredAssignments.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Assignments Available</h3>
                  <p className="text-muted-foreground">
                    {selectedSubject === 'all' 
                      ? 'No assignments have been uploaded yet.' 
                      : `No assignments available for ${selectedSubject}.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2" data-testid={`text-assignment-title-${assignment.id}`}>
                            {assignment.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-2">
                            {assignment.subject}
                          </Badge>
                        </div>
                        <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-assignment-description-${assignment.id}`}>
                        {assignment.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{assignment.stream} - {assignment.year} Year</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{assignment.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleView(assignment.id, assignment.title)}
                          data-testid={`button-view-assignment-${assignment.id}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDownload(assignment.id, assignment.title)}
                          data-testid={`button-download-assignment-${assignment.id}`}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal 
          open={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
};

export default Assignments;
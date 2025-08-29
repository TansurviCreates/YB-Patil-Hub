import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
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

const examPeriods = [
  'Summer 2024',
  'Winter 2023',
  'Summer 2023', 
  'Winter 2022',
  'Summer 2022',
  'Winter 2021'
];

// Mock papers data organized by subjects and terms - admin can upload PDFs
const mockPapers = subjects.flatMap(subject => 
  examPeriods.map(period => ({
    id: `${subject.replace(/\s+/g, '-').toLowerCase()}-${period.replace(/\s+/g, '-').toLowerCase()}`,
    title: `${subject} - ${period}`,
    subject,
    term: period,
    subjectCode: subject.split(' ').map(word => word[0]).join('').toUpperCase(),
    fileUrl: '', // Admin can upload PDF
    downloadCount: 0,
    createdAt: new Date()
  }))
);

const PreviousPapers: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const handleDownload = (paperId: string, title: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Handle download logic
    console.log('Downloading paper:', paperId, title);
  };

  const handleView = (paperId: string, title: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Handle view logic
    console.log('Viewing paper:', paperId, title);
  };

  const filteredPapers = selectedSubject === 'all' 
    ? mockPapers 
    : mockPapers.filter(paper => paper.subject === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">Previous Year Papers</h1>
            <p className="text-muted-foreground mt-2">
              Access question papers organized by subjects and examination periods from Summer 2024 to Winter 2021.
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
            {filteredPapers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Papers Available</h3>
                  <p className="text-muted-foreground">
                    {selectedSubject === 'all' 
                      ? 'No question papers have been uploaded yet.' 
                      : `No papers available for ${selectedSubject}.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {subjects.map(subject => {
                  if (selectedSubject !== 'all' && selectedSubject !== subject) return null;
                  
                  const subjectPapers = filteredPapers.filter(paper => paper.subject === subject);
                  
                  return (
                    <div key={subject} className="space-y-4">
                      <h2 className="text-xl font-semibold border-b pb-2" data-testid={`text-subject-${subject.toLowerCase().replace(/\s+/g, '-')}`}>
                        {subject}
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {examPeriods.map(period => {
                          const paper = subjectPapers.find(p => p.term === period);
                          if (!paper) return null;
                          
                          return (
                            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="text-base" data-testid={`text-paper-title-${paper.id}`}>
                                      {period}
                                    </CardTitle>
                                    <Badge variant="outline" className="mt-2">
                                      {paper.subjectCode}
                                    </Badge>
                                  </div>
                                  <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 ml-2" />
                                </div>
                              </CardHeader>
                              
                              <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>{period}</span>
                                </div>
                                
                                {paper.fileUrl ? (
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      className="flex-1"
                                      onClick={() => handleView(paper.id, paper.title)}
                                      data-testid={`button-view-paper-${paper.id}`}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="flex-1"
                                      onClick={() => handleDownload(paper.id, paper.title)}
                                      data-testid={`button-download-paper-${paper.id}`}
                                    >
                                      <Download className="w-4 h-4 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground italic">
                                      Admin can upload PDF here
                                    </p>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      disabled
                                      className="mt-2"
                                    >
                                      PDF Not Available
                                    </Button>
                                  </div>
                                )}
                                
                                {paper.downloadCount > 0 && (
                                  <p className="text-xs text-muted-foreground">
                                    Downloaded {paper.downloadCount} times
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info card for admin */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">For Administrators</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              As an admin, you can upload PDF files for each subject and examination period. 
              Use the admin panel to manage question papers for all subjects from Summer 2024 to Winter 2021.
            </p>
          </CardContent>
        </Card>
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

export default PreviousPapers;
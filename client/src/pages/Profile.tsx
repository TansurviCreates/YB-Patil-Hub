import React from 'react';
import { Download, Heart, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Profile: React.FC = () => {
  const { userProfile } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Sample user activity data - in a real app, this would come from Firebase
  const recentBookmarks = [
    {
      id: '1',
      title: 'Data Structures & Algorithms',
      subjectCode: '22516',
      term: 'Winter 2024',
    },
    {
      id: '2',
      title: 'Web Programming',
      subjectCode: '22518',
      term: 'Summer 2024',
    },
  ];

  const recentComments = [
    {
      id: '1',
      content: 'Really helpful paper, covered all the important topics for the exam.',
      paperTitle: 'Database Management',
      timeAgo: '2 days ago',
    },
    {
      id: '2',
      content: 'Looking forward to this workshop! Will there be hands-on coding sessions?',
      paperTitle: 'AI Workshop Event',
      timeAgo: '1 week ago',
    },
  ];

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" data-testid="page-title">Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold" data-testid="text-user-name">
                  {userProfile.name}
                </h3>
                <p className="text-muted-foreground" data-testid="text-user-email">
                  {userProfile.email}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stream:</span>
                  <Badge variant="secondary" data-testid="text-user-stream">
                    {userProfile.stream} Engineering
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <Badge variant="outline" data-testid="text-user-year">
                    {userProfile.year} Year
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium" data-testid="text-join-date">
                    {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-6" data-testid="button-edit-profile">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-papers-downloaded">12</div>
                  <div className="text-sm text-muted-foreground">Papers Downloaded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary" data-testid="stat-bookmarks">5</div>
                  <div className="text-sm text-muted-foreground">Bookmarks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-foreground" data-testid="stat-comments">8</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-events-attended">3</div>
                  <div className="text-sm text-muted-foreground">Events Attended</div>
                </div>
              </div>

              {/* Recent Bookmarks */}
              <div className="mb-6">
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Recent Bookmarks
                </h5>
                <div className="space-y-2" data-testid="recent-bookmarks">
                  {recentBookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="flex items-center justify-between p-3 bg-accent rounded-lg"
                    >
                      <div>
                        <div className="font-medium" data-testid={`bookmark-title-${bookmark.id}`}>
                          {bookmark.title}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`bookmark-details-${bookmark.id}`}>
                          {bookmark.subjectCode} • {bookmark.term}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        data-testid={`button-unbookmark-${bookmark.id}`}
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Comments */}
              <div>
                <h5 className="font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Recent Comments
                </h5>
                <div className="space-y-3" data-testid="recent-comments">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-accent rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1" data-testid={`comment-meta-${comment.id}`}>
                        On {comment.paperTitle} • {comment.timeAgo}
                      </div>
                      <div className="text-sm" data-testid={`comment-content-${comment.id}`}>
                        "{comment.content}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

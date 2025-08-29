import React, { useState } from 'react';
import { Calendar, MapPin, Users, Heart, Plus, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample events data - in a real app, this would come from Firebase
  const events = [
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      description: 'Join us for an intensive workshop on AI fundamentals, machine learning algorithms, and hands-on project development.',
      location: 'Main Auditorium, Block A',
      date: new Date('2024-12-15T14:00:00'),
      hostedBy: 'Computer Engineering Dept.',
      isApproved: true,
      interestedCount: 47,
      isInterested: false,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200',
    },
    {
      id: '2',
      title: 'Annual College Fest 2024',
      description: 'Three days of music, dance, competitions, and fun activities. Don\'t miss the biggest event of the year!',
      location: 'College Campus',
      date: new Date('2024-12-20T09:00:00'),
      hostedBy: 'Student Council',
      isApproved: true,
      interestedCount: 189,
      isInterested: true,
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200',
    },
    {
      id: '3',
      title: 'Tech Career Meetup',
      description: 'Connect with alumni working in tech companies. Get career advice, internship tips, and networking opportunities.',
      location: 'Conference Room, Admin Block',
      date: new Date('2024-12-18T16:00:00'),
      hostedBy: 'Alumni Association',
      isApproved: false,
      interestedCount: 23,
      isInterested: false,
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200',
    },
  ];

  const upcomingEvents = events.filter(event => event.date > new Date());
  const pastEvents = events.filter(event => event.date <= new Date());
  const myEvents = events.filter(event => event.isInterested);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderEventCard = (event: any) => (
    <Card key={event.id} className="hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          data-testid={`event-image-${event.id}`}
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg" data-testid={`event-title-${event.id}`}>
              {event.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground" data-testid={`event-host-${event.id}`}>
              by {event.hostedBy}
            </p>
          </div>
          <Badge
            variant={event.isApproved ? 'default' : 'secondary'}
            data-testid={`event-status-${event.id}`}
          >
            {event.isApproved ? 'Approved' : 'Pending'}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground" data-testid={`event-description-${event.id}`}>
          {event.description}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm" data-testid={`event-date-${event.id}`}>
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{formatDate(event.date)} • {formatTime(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" data-testid={`event-location-${event.id}`}>
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" data-testid={`event-interested-${event.id}`}>
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>
              {event.interestedCount} interested
              {event.date > new Date() && (
                <> • {getDaysUntil(event.date)} days to go</>
              )}
            </span>
          </div>
        </div>
        
        <Button
          variant={event.isInterested ? 'secondary' : 'default'}
          className="w-full"
          data-testid={`button-interested-${event.id}`}
        >
          <Heart className="w-4 h-4 mr-2" fill={event.isInterested ? 'currentColor' : 'none'} />
          {event.isInterested ? 'Interested' : "I'm Interested"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" data-testid="page-title">Events</h2>
        <Button data-testid="button-host-event">
          <Plus className="w-4 h-4 mr-2" />
          Host Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming" data-testid="tab-upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past" data-testid="tab-past">
            Past Events ({pastEvents.length})
          </TabsTrigger>
          <TabsTrigger value="my-events" data-testid="tab-my-events">
            My Events ({myEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="upcoming-events-grid">
            {upcomingEvents.map(renderEventCard)}
          </div>
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12" data-testid="no-upcoming-events">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">Check back later for new events</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="past-events-grid">
            {pastEvents.map(renderEventCard)}
          </div>
          {pastEvents.length === 0 && (
            <div className="text-center py-12" data-testid="no-past-events">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No past events</h3>
              <p className="text-muted-foreground">Past events will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-events" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="my-events-grid">
            {myEvents.map(renderEventCard)}
          </div>
          {myEvents.length === 0 && (
            <div className="text-center py-12" data-testid="no-my-events">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No events marked as interested</h3>
              <p className="text-muted-foreground">Mark events as interested to see them here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;

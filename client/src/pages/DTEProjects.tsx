import React, { useState } from 'react';
import { Wrench, ShoppingCart, Eye, Calendar, User, Play, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

// Mock project data for 19 DTE projects - admin can edit these
const mockProjects = Array.from({ length: 19 }, (_, index) => ({
  id: `${index + 1}`,
  title: `DTE Project ${index + 1}`, // Admin can edit
  description: '', // Admin can add description
  components: '', // Admin can add components
  price: 0, // Admin can set price
  imageUrl: '', // Admin can upload image
  videoUrl: '', // Admin can upload video
  tags: [],
  groupNumber: index + 1,
  teamMembers: [], // Admin can add team members
  createdAt: new Date()
}));

const DTEProjects: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToCart = (project: any) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    if (project.price > 0) {
      addToCart({
        id: project.id,
        name: project.title,
        price: project.price,
      });
    }
  };

  const handleViewDetails = (projectId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Handle view details logic
    console.log('Viewing project details:', projectId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-page-title">DTE Electronic Projects</h1>
            <p className="text-muted-foreground mt-2">
              Explore 19 innovative electronic microprojects with detailed components and implementation guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        Group {project.groupNumber}
                      </Badge>
                    </div>
                  </div>
                  <Wrench className="w-8 h-8 text-blue-600 flex-shrink-0 ml-2" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Admin can add image/video */}
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : project.videoUrl ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Play className="w-8 h-8" />
                      <span>Video Available</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Image className="w-8 h-8" />
                      <span className="text-sm">Admin can add media</span>
                    </div>
                  )}
                </div>

                {/* Admin can add description */}
                {project.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-project-description-${project.id}`}>
                    {project.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Admin can add project description here.
                  </p>
                )}

                {/* Admin can add components */}
                {project.components ? (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Components:</h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-project-components-${project.id}`}>
                      {project.components}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Components:</h4>
                    <p className="text-sm text-muted-foreground italic">
                      Admin can add component details here.
                    </p>
                  </div>
                )}

                {/* Team members */}
                {project.teamMembers && project.teamMembers.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{project.teamMembers.join(', ')}</span>
                  </div>
                )}

                {/* Price and actions */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {project.price > 0 ? (
                      <span className="text-lg font-bold text-green-600" data-testid={`text-project-price-${project.id}`}>
                        ₹{project.price.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">
                        Admin can set price
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(project.id)}
                      data-testid={`button-view-project-${project.id}`}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {project.price > 0 && (
                      <Button 
                        size="sm"
                        onClick={() => handleAddToCart(project)}
                        data-testid={`button-add-to-cart-${project.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info card for admin */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">For Administrators</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              As an admin, you can edit each project to add descriptions, component lists, pricing, 
              upload images/videos, and manage team member details. Use the admin panel to customize 
              all project content.
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

export default DTEProjects;
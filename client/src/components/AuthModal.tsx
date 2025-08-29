import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { signIn, signUp } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const streams = ['Computer', 'Civil', 'Mechanical', 'ENTC'];
const years = ['1st', '2nd', '3rd'];

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    stream: '',
    year: '',
  });
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        onClose();
      } else {
        if (!formData.name || !formData.stream || !formData.year) {
          toast({
            title: "Error",
            description: "Please fill in all registration fields.",
            variant: "destructive",
          });
          return;
        }
        
        await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.stream,
          formData.year
        );
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="auth-modal">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl" data-testid="auth-title">
            {isLogin ? 'Welcome Back' : 'Join YB Patil Hub'}
          </CardTitle>
          <CardDescription data-testid="auth-description">
            {isLogin 
              ? 'Sign in to access previous papers, projects, and events'
              : 'Create your account to get started'
            }
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required={!isLogin}
                  data-testid="input-name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@ybpatil.edu.in"
                required
                data-testid="input-email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="stream">Stream</Label>
                  <Select onValueChange={(value) => handleInputChange('stream', value)} required>
                    <SelectTrigger data-testid="select-stream">
                      <SelectValue placeholder="Select your stream" />
                    </SelectTrigger>
                    <SelectContent>
                      {streams.map((stream) => (
                        <SelectItem key={stream} value={stream}>
                          {stream}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select onValueChange={(value) => handleInputChange('year', value)} required>
                    <SelectTrigger data-testid="select-year">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year} Year
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              data-testid="button-submit"
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
                data-testid="button-toggle-auth"
              >
                {isLogin ? 'Register here' : 'Sign in here'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthModal;

import React from 'react';
import { Coffee, ExternalLink, Copy, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Donate: React.FC = () => {
  const { toast } = useToast();

  const copyUPIId = async () => {
    const upiId = 'developer@ybpatil';
    try {
      await navigator.clipboard.writeText(upiId);
      toast({
        title: "Copied!",
        description: "UPI ID copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy UPI ID",
        variant: "destructive",
      });
    }
  };

  const openUPIApp = () => {
    // In a real app, this would open a UPI app with pre-filled details
    const upiUrl = 'upi://pay?pa=developer@ybpatil&pn=YBPatilHub&mc=0000&tid=1234567890&tr=donation&tn=Support%20YB%20Patil%20Hub';
    
    // Try to open UPI app
    const link = document.createElement('a');
    link.href = upiUrl;
    link.click();
    
    toast({
      title: "Opening UPI app...",
      description: "If the app doesn't open, please copy the UPI ID manually",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" data-testid="page-title">Support the Developer</h2>
      
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl" data-testid="donate-title">
              Buy Me a Coffee
            </CardTitle>
            <p className="text-muted-foreground" data-testid="donate-description">
              If you find YB Patil Hub helpful and would like to support the development, 
              consider buying me a coffee! Your support helps keep this platform running and improving.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* QR Code Section */}
            <div className="bg-muted rounded-xl p-6">
              <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border" data-testid="qr-code-placeholder">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Scan QR Code</p>
                  <p className="text-xs text-gray-500" data-testid="upi-id">UPI: developer@ybpatil</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Scan the QR code above with any UPI app to make a donation
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={openUPIApp}
                data-testid="button-open-upi"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open UPI App
              </Button>
              <Button 
                variant="outline"
                onClick={copyUPIId}
                data-testid="button-copy-upi"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy UPI ID
              </Button>
            </div>
            
            {/* Thank You Message */}
            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                <p className="text-sm" data-testid="thank-you-message">
                  Thank you for your support! Every contribution helps improve the platform.
                </p>
              </div>
            </div>
            
            {/* Support Information */}
            <div className="bg-accent rounded-lg p-4 text-left">
              <h4 className="font-medium mb-2">How your support helps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Server hosting and maintenance</li>
                <li>• New features and improvements</li>
                <li>• Better user experience</li>
                <li>• Regular content updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donate;

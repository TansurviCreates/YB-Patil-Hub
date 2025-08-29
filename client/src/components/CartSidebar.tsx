import React from 'react';
import { X, Trash2, Download } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    subtotal, 
    discount, 
    total, 
    applyDiscount, 
    setApplyDiscount 
  } = useCart();

  const generateQuotation = () => {
    // Generate PDF quotation logic would go here
    console.log('Generating quotation for:', cart);
    // For now, just create a simple quotation object
    const quotation = {
      items: cart,
      subtotal,
      discount,
      total,
      date: new Date().toLocaleDateString(),
    };
    
    // In a real implementation, you'd use jsPDF or similar
    const quotationText = `
YB Patil Hub - Project Quotation
Date: ${quotation.date}

Items:
${cart.map(item => `- ${item.name}: ₹${item.price}`).join('\n')}

Subtotal: ₹${subtotal}
${discount > 0 ? `Discount (10%): -₹${discount}` : ''}
Total: ₹${total}
    `;
    
    // Create a blob and download
    const blob = new Blob([quotationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-quotation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}
      data-testid="cart-sidebar"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" data-testid="text-cart-title">
            Shopping Cart
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-cart-close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-6">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-8" data-testid="text-empty-cart">
              <div className="w-12 h-12 mx-auto mb-4 opacity-50 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4" data-testid="cart-items">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg animate-in slide-in-from-top-2 duration-300"
                  data-testid={`cart-item-${item.id}`}
                >
                  <div>
                    <div className="font-medium" data-testid={`text-item-name-${item.id}`}>
                      {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-item-price-${item.id}`}>
                      ₹{item.price}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive/80"
                    data-testid={`button-remove-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between" data-testid="cart-subtotal">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-destructive" data-testid="cart-discount">
                  <span>Discount (10%):</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg" data-testid="cart-total">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                id="discount-toggle"
                checked={applyDiscount}
                onCheckedChange={(checked) => setApplyDiscount(checked as boolean)}
                data-testid="checkbox-discount"
              />
              <label htmlFor="discount-toggle" className="text-sm">
                Apply 10% student discount
              </label>
            </div>
            
            <Button
              onClick={generateQuotation}
              className="w-full"
              data-testid="button-download-quotation"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Quotation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

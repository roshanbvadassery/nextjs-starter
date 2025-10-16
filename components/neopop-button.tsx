import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeoPopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'yellow' | 'green' | 'pink' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const NeoPopButton = forwardRef<HTMLButtonElement, NeoPopButtonProps>(
  ({ className, variant = 'purple', size = 'md', children, ...props }, ref) => {
    const variantClasses = {
      purple: 'bg-neopop-purple hover:bg-[hsl(265,100%,52%)] text-white neopop-shadow-purple',
      yellow: 'bg-neopop-yellow hover:bg-[hsl(48,100%,60%)] text-neopop-dark neopop-shadow-yellow',
      green: 'bg-neopop-green hover:bg-[hsl(151,83%,60%)] text-neopop-dark neopop-shadow-green',
      pink: 'bg-neopop-pink hover:bg-[hsl(340,82%,60%)] text-white neopop-shadow-pink',
      red: 'bg-neopop-red hover:bg-[hsl(0,84%,54%)] text-white shadow-[6px_6px_0_0_hsl(0,84%,40%)]',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'neopop-button rounded-lg font-bold uppercase tracking-wider',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeoPopButton.displayName = 'NeoPopButton'; 
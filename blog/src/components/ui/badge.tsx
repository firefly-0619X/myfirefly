import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'border-border text-foreground': variant === 'default',
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': variant === 'secondary',
          'border-border bg-transparent text-foreground': variant === 'outline'
        },
        className
      )}
      {...props}
    />
  )
}

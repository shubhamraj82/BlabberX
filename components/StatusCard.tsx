import React from 'react'

interface StatusCardProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export function StatusCard({title, description, action, className, children}: StatusCardProps) {
  return (
    <div
    className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className='glass-card mx-4 w-full max-w-md space-y-4 rounded-2xl p-8 text-center'>
            {children}
            <div className='text-xl font-semibold tracking-tight'>{title}</div>
            {description && <div className='text-sm leading-6 text-muted-foreground'>{description}</div>}
            {action && <div className='mt-4'>{action}</div>}
        </div>
    </div>
  )
}


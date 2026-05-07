'use client'

import { SignInButton, UserButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';

 function Header() {
    const pathname=usePathname();
    const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className='sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/70 px-4 backdrop-blur-md sm:px-6'>
        <Link href="/dashboard" 
        className='text-sm font-semibold uppercase tracking-[0.24em] text-foreground/90 transition-colors hover:text-foreground'>
            Beam
            </Link>

            <div className='flex items-center gap-2'>
                <Authenticated>
                    {!isDashboard && (
                        <Link href="/dashboard">
                            <Button variant="outline" className='rounded-full'>Dashboard</Button>
                        </Link>
                    )}
                    <UserButton/>
                </Authenticated>

                <Unauthenticated>
                    <SignInButton 
                    mode='modal'
                    forceRedirectUrl="/dashboard"
                    signUpForceRedirectUrl="/dashboard"
                    >
                        <Button variant='outline' className='rounded-full'>Sign In</Button>
                    </SignInButton>
                </Unauthenticated>
            </div>
    </header>
  )
}

export default Header
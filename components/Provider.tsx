"use client"
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';

interface RootLayoutProps {
  children: ReactNode;
  session: Session | null;
}

const Provider = ({ children, session}: RootLayoutProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
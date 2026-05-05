"use client";

import UserSyncWrapper from "@/components/UserSyncWrapper";
import streamClient from "@/lib/stream";
import type { ReactNode } from "react";
import { Chat } from "stream-chat-react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import "stream-chat-react/dist/css/index.css";

function SignedInClientLayout({ children }: { children: ReactNode }) {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient} theme="messaging light">
      <SidebarProvider
      style={
        {
          "--sidebar-width": "24.87rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Link href="/dashboard">
          <h1 className="text-lg font-bold tracking-wider uppercase">
            Beam
          </h1>
          </Link>
        </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-8">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
      </Chat>
    </UserSyncWrapper>
  );
}

export default SignedInClientLayout;

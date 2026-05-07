"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useUser, UserButton } from "@clerk/nextjs"
import { ChannelList } from "stream-chat-react"
import { ChannelFilters, ChannelSort } from "stream-chat"
import { NewChatDialog } from "./ui/NewChatDialog"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useUser()

  const filters: ChannelFilters ={
    members:{ $in: [user?.id as string]},
    type: { $in: ["messaging","team"]}, // show both 1-1 chat and groups chat
  };

  const options = { presence: true, state:true};
  const sort : ChannelSort ={
    last_message_at: -1,
  }
  return (
    <Sidebar variant="floating" className="border-r bg-sidebar/85 backdrop-blur-md" {...props}>
      <SidebarHeader>
        <SidebarMenu className="rounded-xl border bg-sidebar-accent/40 p-2">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
             <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Welcome back
                </span>
                <span className="text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-9 ring-2 ring-sidebar/80 shadow-md",
                  },
                }}
              />
             </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <NewChatDialog>
           <Button className="w-full rounded-xl" variant="outline">
            Start New Chat
           </Button>
           </NewChatDialog>
           {/* Channels list */}
           <ChannelList
            sort={sort} 
            filters={filters} 
            options={options}
            EmptyStateIndicator={()=>(
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed py-12 px-4">
                <h2 className="text-xl font-medium text-foreground mb-2">
                  Ready to chat?
                </h2>
                <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-[200px]">
                  Your messages and conversations will appear here once you start a new chat.
                </p>
              </div>
            )}
            />

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

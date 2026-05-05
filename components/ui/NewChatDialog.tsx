'use client'

import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UserSearch from "./UserSearch";

export function NewChatDialog({children}:{children:React.ReactNode}){
    const [open,setOpen] = useState(false);
    const [selectedUsers,setSelectedUsers] = useState<Doc<"users">[]>([]);
    const [goupName,setGroupName]=useState("");
    const createNewChat = useCreateNewChat();
    const { user } = useUser();
    const { setActiveChannel } = useChatContext();



    const handleSelectedUser = (user:Doc<"users">)=>{
        // avoid adding the same user twice
        if(!selectedUsers.find((u) => u._id === user._id)){
            setSelectedUsers((prev) => [...prev,user]);
        }
    }

    const removeuser = (userId:string) =>{
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));    
    };

    const handleOpenChange = (newOpen:boolean) =>{
        setOpen(newOpen);
        if(!newOpen){
            // Reset from when dialog clases
            setSelectedUsers([]);
            setGroupName("");
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Start a New Chat</DialogTitle>
                    <DialogDescription>
                        Search for users to start a new chat or create a group chat.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Search Compenents */}
                    <UserSearch onSelectUser={handleSelectedUser} className="w-full"/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
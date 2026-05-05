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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UserSearch from "./UserSearch";
import Image from "next/image";
import { Slice, XIcon } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

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

    const handleCreateChat = async () =>{
        const totalMembers=selectedUsers.length+1; // +1 for current user
        const isGroupchat=totalMembers>2;

        const channel = await createNewChat({
            members: [
                user?.id as string,
                ...selectedUsers.map((user) => user.userId),
            ],
            createdBy: user?.id as string,
            groupName: isGroupchat ? goupName.trim() || undefined : undefined,
        });
        setActiveChannel(channel)

        //Reset form and close dialog
        setSelectedUsers([]);
        setGroupName("");
        setOpen(false);
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

                    {/* Selected Users */}
                    {selectedUsers.length>0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-foreground">
                                Selected Users ({selectedUsers.length})
                            </h4>
                            <div className="space-y-2 max-h-[200px] overflow-auto">
                                {selectedUsers.map((user) => (
                                    <div
                                    key={user._id}
                                    className="flex items-center justify-between p-2 bg-muted/50 border border-border rounded-lg"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Image
                                            src={user.imageUrl}
                                            alt={user.name}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 rounded-full object-cover"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                        onClick={()=> removeuser(user._id)}
                                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                        >
                                            <XIcon className="h-4 w-4"/>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Group Name Input for Group Chats */}
                            {selectedUsers.length>1 && (
                                <div className="space-y-2">
                                    <label 
                                    htmlFor="groupName"
                                    className="text-sm font-medium text-foreground"
                                    >
                                        Group Name (Optional)
                                    </label>
                                    <Input
                                    id="groupName"
                                    type="text"
                                    value={goupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Enter a name for your group chat...."
                                    className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to use default name &quot;Group chat ({selectedUsers.length+1} members)&quot;
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                    variant="outline"
                    onClick={()=> setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                    disabled={selectedUsers.length===0}
                    onClick={handleCreateChat}
                    >
                        {selectedUsers.length>1
                        ? `Create Group Chat (${selectedUsers.length+1}members)`
                    : selectedUsers.length===1
                    ? "Start Chat"
                : "Create Chat"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
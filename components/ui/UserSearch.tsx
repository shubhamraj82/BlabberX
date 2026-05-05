'use client';

import { Doc } from '@/convex/_generated/dataModel';
import { useUserSearch } from '@/hooks/useUserSearch';
import { useUser } from '@clerk/nextjs';
import React from 'react'

function UserSearch({
  onSelectUser,
  placeholder,
  className,
}:{
  onSelectUser : (user:Doc<"users">) => void;
  placeholder?:string;
  className?:string;
}) {
  const { searchTerm, setSearchTerm, searchResults, isLoading } = useUserSearch();
  const {user} =useUser();

  // Filte out the current logged in user from search results
  const filteredResults = searchResults.filter((searchUser)=>searchUser._id !== user?.id);

  const handleSelectedUser = (user: (typeof searchResults)[0]) =>{
    onSelectUser?.(user);
    setSearchTerm("");  // clear search after selection
  }

  const slearSearch = () =>{
    setSearchTerm("");
  };
  

  return (
    
  )
}

export default UserSearch
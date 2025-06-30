"use client"
import Link from 'next/link';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { getCurrentUser, removeUser } from '@/service/actions/auth.services';

import { authKey } from '@/contants/authkey';
import { useRouter } from 'next/navigation';

const AuthButton = () => {
   const router = useRouter()
   const user = getCurrentUser() 
   const handleLogout = () => {
       removeUser(authKey);
       
       router.refresh()
     };
    return (
        <div>
            {user?.userId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-900 hover:bg-green-600/20 flex items-center gap-1"
                  >
                    <User size={18} />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="text-gray-900 hover:bg-green-600/20 px-3 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            )} 
        </div>
    );
};

export default AuthButton;
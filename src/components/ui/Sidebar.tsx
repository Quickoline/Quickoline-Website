'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { 
      href: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="mr-2 h-4 w-4" /> 
    },
    { 
      href: '/admin/users', 
      label: 'Manage Users', 
      icon: <Users className="mr-2 h-4 w-4" /> 
    },
    { 
      href: '/admin/blogs', 
      label: 'Blogs', 
      icon: <FileText className="mr-2 h-4 w-4" /> 
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Admin Menu</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button 
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={onClose}
            >
              <Link href={item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          
          <Button 
            variant="destructive" 
            className="w-full justify-start mt-4"
            asChild
          >
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
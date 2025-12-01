import { Link } from "wouter";
import { User, ShoppingCart, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as UserType } from "@shared/schema";

interface HeaderUserMenuProps {
  user: UserType | null;
  isAdmin: boolean;
}

export function HeaderUserMenu({ user, isAdmin }: HeaderUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profileImageUrl || undefined} className="object-cover" />
            <AvatarFallback>
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user?.firstName || "کاربر"}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full cursor-pointer" data-testid="link-account">
            <User className="ml-2 h-4 w-4" />
            حساب کاربری
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="w-full cursor-pointer" data-testid="link-orders">
            <ShoppingCart className="ml-2 h-4 w-4" />
            سفارشات من
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="w-full cursor-pointer" data-testid="link-admin">
                <ChevronDown className="ml-2 h-4 w-4" />
                پنل مدیریت
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/";
          }}
          className="w-full cursor-pointer text-destructive"
          data-testid="link-logout"
        >
          <LogOut className="ml-2 h-4 w-4" />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

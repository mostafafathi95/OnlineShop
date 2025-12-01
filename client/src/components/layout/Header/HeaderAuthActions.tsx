import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeaderUserMenu } from "./HeaderUserMenu";
import type { User } from "@shared/schema";

interface HeaderAuthActionsProps {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function HeaderAuthActions({
  user,
  isAuthenticated,
  isAdmin,
}: HeaderAuthActionsProps) {
  if (isAuthenticated) {
    return <HeaderUserMenu user={user} isAdmin={isAdmin} />;
  }

  return (
    <Button asChild data-testid="button-login">
      <Link href="/login">ورود</Link>
    </Button>
  );
}

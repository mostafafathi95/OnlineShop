import { Link } from "wouter";

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <span className="text-xl font-bold text-primary-foreground">S</span>
      </div>
      <span className="hidden font-bold text-xl sm:inline-block">Shop</span>
    </Link>
  );
}

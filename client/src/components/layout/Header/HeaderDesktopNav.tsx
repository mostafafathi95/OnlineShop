import { Link } from "wouter";
import { NAVIGATION } from "./constants";

interface HeaderDesktopNavProps {
  location: string;
}

export function HeaderDesktopNav({ location }: HeaderDesktopNavProps) {
  return (
    <nav className="hidden lg:flex lg:items-center lg:gap-1">
      {NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
            location === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
          data-testid={`link-nav-${item.name}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

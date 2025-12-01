import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function HeaderThemeToggle({ theme, toggleTheme }: HeaderThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}

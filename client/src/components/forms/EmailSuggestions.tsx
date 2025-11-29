import React from "react";

interface EmailSuggestionsProps {
  email: string;
  onSelectSuggestion?: (suggestion: string) => void;
}

export function EmailSuggestions({ email, onSelectSuggestion }: EmailSuggestionsProps) {
  const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];
  const [part, domain] = email.split("@");

  if (!domain) return null;

  // Generate suggestions for common typos
  const suggestions = commonDomains
    .filter((d) => d.startsWith(domain.substring(0, 2)) && d !== domain)
    .map((d) => `${part}@${d}`);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 animate-fade-scale">
      <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">آیا منظورتان این است؟</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelectSuggestion?.(suggestion)}
            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { t } from "@/lib/i18n";

interface EmailSuggestionsProps<T extends FieldValues> {
  name: Path<T>;
}

export function EmailSuggestions<T extends FieldValues>({ name }: EmailSuggestionsProps<T>) {
  const { watch, setValue } = useFormContext<T>();
  const email = watch(name);

  const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];

  if (typeof email !== 'string' || !email.includes('@')) {
    return null;
  }

  const [part, domain] = email.split("@");

  if (!domain) return null;

  // Generate suggestions for common typos
  const suggestions = commonDomains
    .filter((d) => d.startsWith(domain.substring(0, 2)) && d !== domain)
    .map((d) => `${part}@${d}`);

  if (suggestions.length === 0) return null;

  const handleSelectSuggestion = (suggestion: string) => {
    setValue(name, suggestion as any, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="mt-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 animate-fade-scale">
      <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">{t('forms.emailSuggestions.suggestion')}</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            key={suggestion}
            onClick={() => handleSelectSuggestion(suggestion)}
            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

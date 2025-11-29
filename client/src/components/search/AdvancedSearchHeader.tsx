import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Search, X, Zap, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

// سادہ Fuzzy search function
function fuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  
  // دقیق match سب سے بہتر
  if (t.includes(q)) return 100;
  
  // حروف کی ترتیب میں match
  let matches = 0;
  let qIdx = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      matches++;
      qIdx++;
    }
  }
  return qIdx === q.length ? 50 : 0;
}

export function AdvancedSearchHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch autocomplete suggestions
  const { data: autocompleteData } = useQuery({
    queryKey: ["/api/search/autocomplete", query],
    enabled: query.length >= 1,
  });

  const suggestions = autocompleteData?.suggestions || [];

  // Fetch popular searches
  const { data: popularData } = useQuery({
    queryKey: ["/api/search/popular"],
    enabled: !query && isOpen,
  });

  const popularSearches = popularData?.queries || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key === "ArrowDown") {
      setIsOpen(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const suggestion = suggestions[selectedIndex];
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        } else if (query.trim()) {
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="w-full">
      <div className="relative w-full">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-1.5 focus-within:ring-2 focus-within:ring-primary shadow-sm">
          <Search className="h-5 w-5 text-slate-400 ml-2 flex-shrink-0" data-testid="icon-search" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="جستجوی محصولات..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (e.target.value.trim()) {
                setIsOpen(true);
              }
            }}
            onFocus={() => {
              if (query.trim() || !query) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 text-right flex-1 bg-transparent placeholder:text-slate-400"
            autoComplete="off"
            data-testid="input-search-header"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="mr-1 hover-elevate rounded p-0.5"
              data-testid="button-clear-search"
              type="button"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg border-slate-200 dark:border-slate-700">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  تجاویز
                </div>
                {suggestions.slice(0, 8).map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    onClick={() => {
                      if (suggestion.type === "product") {
                        window.location.href = `/products/${suggestion.id}`;
                      } else {
                        window.location.href = `/search?q=${encodeURIComponent(suggestion.title)}`;
                      }
                    }}
                    className={`w-full px-4 py-3 text-right hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 justify-end border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors ${
                      index === selectedIndex ? "bg-slate-100 dark:bg-slate-800" : ""
                    }`}
                    data-testid={`suggestion-${suggestion.type}-${suggestion.id}`}
                    type="button"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {suggestion.title}
                    </span>
                    <span className="text-lg">{suggestion.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && popularSearches.length > 0 && (
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3 text-slate-600 dark:text-slate-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-semibold">محبوب‌ترین سرچ‌ها</span>
                </div>
                <div className="space-y-2">
                  {popularSearches.slice(0, 5).map((item: any) => (
                    <button
                      key={item.query}
                      onClick={() => {
                        setQuery(item.query);
                        window.location.href = `/search?q=${encodeURIComponent(item.query)}`;
                      }}
                      className="w-full px-3 py-2 text-right text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300 transition-colors"
                      data-testid={`popular-search-${item.query}`}
                      type="button"
                    >
                      {item.query} <span className="text-xs text-slate-400">({item.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            {query.trim() && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-3">
                <Button
                  onClick={handleSearch}
                  className="w-full"
                  data-testid="button-search-submit"
                  type="button"
                >
                  <Zap className="h-4 w-4 ml-2" />
                  جستجو برای "{query}"
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!query && popularSearches.length === 0 && suggestions.length === 0 && (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">شروع به تایپ کنید تا جستجو شود</p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

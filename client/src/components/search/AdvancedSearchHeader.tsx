import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Search, X, Zap, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

interface Suggestion {
  type: "product" | "category";
  id: number;
  title: string;
  icon: string;
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
    enabled: query.length >= 2,
  });

  const suggestions: Suggestion[] = autocompleteData?.suggestions || [];

  // Fetch popular searches for empty state
  const { data: popularData } = useQuery({
    queryKey: ["/api/search/popular"],
    enabled: !query && isOpen,
  });

  const popularSearches = popularData?.queries || [];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
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
        if (selectedIndex >= 0) {
          const suggestion = suggestions[selectedIndex];
          if (suggestion.type === "product") {
            window.location.href = `/products/${suggestion.id}`;
          } else {
            window.location.href = `/products?category=${suggestion.id}`;
          }
        } else if (query) {
          window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    if (value) setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className="w-full">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-1 focus-within:ring-2 focus-within:ring-primary">
          <Search className="h-5 w-5 text-slate-400 ml-2" data-testid="icon-search" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="جستجو کنید... (نام محصول، دسته‌بندی)"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 text-right"
            autoComplete="off"
            data-testid="input-search"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="mr-2"
              data-testid="button-clear-search"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg">
            {/* Autocomplete Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500">نتایج</div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    onClick={() => {
                      if (suggestion.type === "product") {
                        window.location.href = `/products/${suggestion.id}`;
                      } else {
                        window.location.href = `/products?category=${suggestion.id}`;
                      }
                    }}
                    className={`w-full px-4 py-2 text-right hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 justify-end ${
                      index === selectedIndex ? "bg-slate-100 dark:bg-slate-800" : ""
                    }`}
                    data-testid={`suggestion-${suggestion.type}-${suggestion.id}`}
                  >
                    <span>{suggestion.title}</span>
                    <span>{suggestion.icon}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && popularSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-slate-600 dark:text-slate-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-semibold">محبوب‌ترین جستجوها</span>
                </div>
                <div className="space-y-2">
                  {popularSearches.slice(0, 5).map((item: any) => (
                    <button
                      key={item.query}
                      onClick={() => {
                        window.location.href = `/search?q=${encodeURIComponent(item.query)}`;
                      }}
                      className="w-full px-3 py-2 text-right text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-700 dark:text-slate-300"
                      data-testid={`popular-search-${item.query}`}
                    >
                      {item.query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            {query && (
              <div className="border-t p-3">
                <Link href={`/search?q=${encodeURIComponent(query)}`}>
                  <Button className="w-full" data-testid="button-search-submit">
                    <Zap className="h-4 w-4 ml-2" />
                    جستجو برای "{query}"
                  </Button>
                </Link>
              </div>
            )}

            {/* Empty State */}
            {!query && popularSearches.length === 0 && suggestions.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>شروع به تایپ کنید تا جستجو کنید</p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

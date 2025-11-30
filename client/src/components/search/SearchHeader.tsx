import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export function SearchHeader() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: autocomplete = { suggestions: [] } } = useQuery({
    queryKey: ["/api/search/autocomplete", query],
    enabled: query.length > 1,
    queryFn: async () => {
      const res = await fetch(`/api/search/autocomplete?q=${encodeURIComponent(query)}`);
      return res.json();
    },
    staleTime: 500,
  });

  const { data: trending = [] } = useQuery({
    queryKey: ["/api/search/trending"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/search/trending");
        return res.json();
      } catch {
        return [];
      }
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("search_history");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    // Save to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));
    
    setQuery("");
    setShowDropdown(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === "product") {
      setLocation(`/products/${suggestion.id}`);
    } else if (suggestion.type === "category") {
      setLocation(`/products?category=${suggestion.id}`);
    } else {
      handleSearch(suggestion.title);
    }
  };

  return (
    <div className="w-full" data-testid="search-header">
      <div className="container mx-auto px-4 py-4">
        <div className="relative" ref={inputRef}>
          <div className="flex items-center gap-2 bg-background border rounded-lg px-4 py-2 hover:border-primary transition-colors">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="جستجو کنید..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch(query);
              }}
              className="flex-1 bg-transparent outline-none text-right"
              data-testid="input-search"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setShowDropdown(false);
                }}
                data-testid="button-clear-search"
              >
                <X size={16} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {showDropdown && (query.length > 1 || (!query && recentSearches.length > 0)) && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50"
              data-testid="dropdown-search-suggestions"
            >
              {query.length > 1 && autocomplete.suggestions.length > 0 && (
                <div className="p-2 border-b">
                  {autocomplete.suggestions.map((sugg: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(sugg)}
                      className="w-full text-right px-3 py-2 hover:bg-muted rounded flex items-center justify-between gap-2 text-sm"
                      data-testid={`suggestion-${sugg.type}-${sugg.id}`}
                    >
                      <span>{sugg.title}</span>
                      <span className="text-muted-foreground">{sugg.icon}</span>
                    </button>
                  ))}
                </div>
              )}

              {!query && recentSearches.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1">جستجوهای اخیر</p>
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(search)}
                      className="w-full text-right px-3 py-2 hover:bg-muted rounded text-sm"
                      data-testid={`recent-search-${idx}`}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}

              {trending.length > 0 && !query && (
                <div className="p-2 border-t">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1 flex items-center gap-1">
                    <TrendingUp size={14} /> پر جستجو‌شده‌ها
                  </p>
                  {trending.slice(0, 3).map((item: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(item.query)}
                      className="w-full text-right px-3 py-2 hover:bg-muted rounded text-sm"
                      data-testid={`trending-search-${idx}`}
                    >
                      {item.query}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

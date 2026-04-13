import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { applicationSections, sdkSections, type DocSection, type DocPage } from "@/data/docs";

interface SearchResult {
  page: DocPage;
  sectionTitle: string;
  tab: "application" | "sdk";
  snippet: string;
}

interface DocSearchProps {
  onSelect: (pageId: string, sectionId: string, tab: "application" | "sdk") => void;
}

function extractSnippet(content: string, query: string): string {
  if (!query) return "";
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, 100) + "…";
  const start = Math.max(0, idx - 40);
  const end = Math.min(content.length, idx + query.length + 60);
  let snippet = content.slice(start, end).replace(/[#`*|]/g, "").replace(/\n/g, " ");
  if (start > 0) snippet = "…" + snippet;
  if (end < content.length) snippet += "…";
  return snippet;
}

function getAllPages(sections: DocSection[], tab: "application" | "sdk"): { page: DocPage; sectionId: string; sectionTitle: string; tab: "application" | "sdk" }[] {
  return sections.flatMap((s) =>
    (s.children || []).map((p) => ({ page: p, sectionId: s.id, sectionTitle: s.title, tab }))
  );
}

const DocSearch = ({ onSelect }: DocSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allPages = useMemo(() => [
    ...getAllPages(applicationSections, "application"),
    ...getAllPages(sdkSections, "sdk"),
  ], []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPages
      .filter((item) =>
        item.page.title.toLowerCase().includes(q) ||
        item.page.content.toLowerCase().includes(q)
      )
      .map((item) => ({
        page: item.page,
        sectionTitle: item.sectionTitle,
        sectionId: item.sectionId,
        tab: item.tab,
        snippet: extractSnippet(item.page.content, query),
      }));
  }, [query, allPages]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-border bg-muted text-sm text-foreground/70 hover:text-foreground hover:bg-muted/70 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="flex-1 text-left">Search docs…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border/50">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search documentation…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.length > 0 && (
            <>
              {["application", "sdk"].map((tab) => {
                const tabResults = results.filter((r) => r.tab === tab);
                if (tabResults.length === 0) return null;
                return (
                  <CommandGroup key={tab} heading={tab === "application" ? "Application" : "SDK"}>
                    {tabResults.map((r) => (
                      <CommandItem
                        key={r.page.id}
                        value={`${r.page.title} ${r.snippet}`}
                        onSelect={() => {
                          onSelect(r.page.id, r.sectionId, r.tab);
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-sm">{r.page.title}</span>
                            <span className="text-xs text-muted-foreground">· {r.sectionTitle}</span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">{r.snippet}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default DocSearch;

import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, ChevronLeft, ExternalLink, BookOpen, Code2, Menu, X } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import DocSearch from "@/components/docs/DocSearch";
import CodeBlock from "@/components/docs/CodeBlock";
import TableOfContents from "@/components/docs/TableOfContents";
import { cn } from "@/lib/utils";
import { applicationSections, sdkSections, type DocSection } from "@/data/docs";
import "@/styles/prism-theme.css";

const DocsContent = () => {
  const [activeTab, setActiveTab] = useState<"application" | "sdk">("sdk");
  const [activePageId, setActivePageId] = useState("sdk-overview");
  const [expandedSections, setExpandedSections] = useState<string[]>(["sdk-overview"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = activeTab === "application" ? applicationSections : sdkSections;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectPage = (pageId: string, sectionId: string) => {
    setActivePageId(pageId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections((prev) => [...prev, sectionId]);
    }
    setSidebarOpen(false);
  };

  const switchTab = (tab: "application" | "sdk") => {
    setActiveTab(tab);
    const firstSection = tab === "application" ? applicationSections[0] : sdkSections[0];
    const firstPage = firstSection.children?.[0];
    if (firstPage) {
      setActivePageId(firstPage.id);
      setExpandedSections([firstSection.id]);
    }
  };

  const handleSearchSelect = (pageId: string, sectionId: string, tab: "application" | "sdk") => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
    setActivePageId(pageId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections((prev) => [...prev, sectionId]);
    }
    setSidebarOpen(false);
  };

  const allPages = sections.flatMap((s) =>
    (s.children || []).map((p) => ({ page: p, sectionId: s.id }))
  );
  const activeIndex = allPages.findIndex((p) => p.page.id === activePageId);
  const activePage = activeIndex >= 0 ? allPages[activeIndex].page : undefined;
  const prevPage = activeIndex > 0 ? allPages[activeIndex - 1] : null;
  const nextPage = activeIndex < allPages.length - 1 ? allPages[activeIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-14 flex">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 border-r border-border/40 bg-background overflow-y-auto transition-transform lg:translate-x-0 flex-shrink-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4">
            {/* Search */}
            <div className="mb-4">
              <DocSearch onSelect={handleSearchSelect} />
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-lg bg-muted mb-6">
              <button
                onClick={() => switchTab("application")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all",
                  activeTab === "application"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Application
              </button>
              <button
                onClick={() => switchTab("sdk")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all",
                  activeTab === "sdk"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                SDK
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {sections.map((section) => {
                const hasChildren = section.children && section.children.length > 1;
                const isExpanded = expandedSections.includes(section.id);

                if (!hasChildren && section.children?.[0]) {
                  const page = section.children[0];
                  return (
                    <button
                      key={section.id}
                      onClick={() => selectPage(page.id, section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        activePageId === page.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {section.title}
                    </button>
                  );
                }

                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <span>{section.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {isExpanded && section.children && (
                      <div className="ml-3 pl-3 border-l border-border/40 space-y-0.5 mt-0.5">
                        {section.children.map((page) => (
                          <button
                            key={page.id}
                            onClick={() => selectPage(page.id, section.id)}
                            className={cn(
                              "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                              activePageId === page.id
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {page.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* External links */}
            <div className="mt-8 pt-6 border-t border-border/40 space-y-2">
              <a
                href="https://github.com/leandroBorgesFerreira/Writeopia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://docs.writeopia.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Docusaurus (legacy)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 flex">
          <div className="flex-1 max-w-3xl mx-auto px-6 py-12">
            {activePage ? (
              <>
                <article className="docs-content">
                  <DocRenderer content={activePage.content} />
                </article>

                {/* Prev / Next navigation */}
                <nav className="mt-12 pt-6 border-t border-border/40 flex items-center justify-between gap-4">
                  {prevPage ? (
                    <button
                      onClick={() => selectPage(prevPage.page.id, prevPage.sectionId)}
                      className="group flex flex-col items-start gap-1 px-4 py-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-colors max-w-[45%]"
                    >
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ChevronLeft className="w-3 h-3" /> Previous
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate w-full text-left">
                        {prevPage.page.title}
                      </span>
                    </button>
                  ) : <div />}
                  {nextPage ? (
                    <button
                      onClick={() => selectPage(nextPage.page.id, nextPage.sectionId)}
                      className="group flex flex-col items-end gap-1 px-4 py-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-colors max-w-[45%] ml-auto"
                    >
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        Next <ChevronRight className="w-3 h-3" />
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate w-full text-right">
                        {nextPage.page.title}
                      </span>
                    </button>
                  ) : <div />}
                </nav>
              </>
            ) : (
              <p className="text-muted-foreground">Select a page from the sidebar.</p>
            )}
          </div>

          {/* Table of Contents */}
          {activePage && (
            <aside className="hidden xl:block w-56 flex-shrink-0 py-12 pr-6">
              <div className="sticky top-20">
                <TableOfContents content={activePage.content} />
              </div>
            </aside>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

/* Simple markdown-like renderer */
const DocRenderer = ({ content }: { content: string }) => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;
  let key = 0;

  const toId = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <CodeBlock key={key++} code={codeLines.join("\n")} language={lang || undefined} />
      );
      continue;
    }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headerCells = tableLines[0]
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      const bodyRows = tableLines.slice(2); // skip header + separator
      elements.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-lg border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="px-4 py-2.5 text-left font-medium text-foreground">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => {
                const cells = row
                  .split("|")
                  .filter((c) => c.trim())
                  .map((c) => c.trim());
                return (
                  <tr key={ri} className="border-b border-border/30 last:border-0">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2 text-muted-foreground">
                        <InlineRenderer text={cell} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      const text = line.replace("### ", "");
      elements.push(
        <h3 key={key++} id={toId(text)} className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
          {text}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      elements.push(
        <h2 key={key++} id={toId(text)} className="text-2xl font-bold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-20">
          {text}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      const text = line.replace("# ", "");
      elements.push(
        <h1 key={key++} id={toId(text)} className="text-3xl font-bold text-foreground mt-10 mb-4 first:mt-0 scroll-mt-20">
          {text}
        </h1>
      );
      i++;
      continue;
    }

    // List items
    if (line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-1.5 list-none">
          {listItems.map((item, li) => (
            <li key={li} className="flex gap-2 text-muted-foreground text-sm">
              <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span><InlineRenderer text={item} /></span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 space-y-1.5 list-decimal list-inside">
          {listItems.map((item, li) => (
            <li key={li} className="text-muted-foreground text-sm">
              <InlineRenderer text={item} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="text-muted-foreground text-sm leading-relaxed my-3">
        <InlineRenderer text={line} />
      </p>
    );
    i++;
  }

  return <>{elements}</>;
};

/* Inline markdown: bold, italic, code, links */
const InlineRenderer = ({ text }: { text: string }) => {
  // Process inline markdown
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let inlineKey = 0;

  while (remaining.length > 0) {
    // Links: [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Inline code: `text`
    const codeMatch = remaining.match(/`([^`]+)`/);

    const matches = [
      linkMatch && { type: "link", match: linkMatch, index: linkMatch.index! },
      boldMatch && { type: "bold", match: boldMatch, index: boldMatch.index! },
      codeMatch && { type: "code", match: codeMatch, index: codeMatch.index! },
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "link") {
      const [full, linkText, url] = first.match;
      const isExternal = url.startsWith("http");
      parts.push(
        <a
          key={inlineKey++}
          href={url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary hover:underline underline-offset-2"
        >
          {linkText}
        </a>
      );
      remaining = remaining.slice(first.index + full.length);
    } else if (first.type === "bold") {
      const [full, boldText] = first.match;
      parts.push(
        <strong key={inlineKey++} className="text-foreground font-semibold">
          {boldText}
        </strong>
      );
      remaining = remaining.slice(first.index + full.length);
    } else if (first.type === "code") {
      const [full, codeText] = first.match;
      parts.push(
        <code
          key={inlineKey++}
          className="px-1.5 py-0.5 rounded-md bg-muted text-foreground/80 text-xs font-mono"
        >
          {codeText}
        </code>
      );
      remaining = remaining.slice(first.index + full.length);
    }
  }

  return <>{parts}</>;
};

const Docs = () => (
  <ThemeProvider>
    <LanguageProvider>
      <DocsContent />
    </LanguageProvider>
  </ThemeProvider>
);

export default Docs;

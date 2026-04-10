import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const lang = language || "plaintext";

  return (
    <div className="my-4 rounded-xl border border-border/50 bg-[#1e1e2e] overflow-hidden">
      {language && (
        <div className="px-4 py-2 border-b border-white/5 text-xs text-white/40 font-mono">
          {language}
        </div>
      )}
      <pre className="p-4 text-sm font-mono overflow-x-auto !bg-transparent !m-0">
        <code ref={codeRef} className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;

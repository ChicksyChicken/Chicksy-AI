import React, { forwardRef } from 'react';
import { useApp } from '../context/AppContext';

// Simple syntax highlighting patterns
const patterns = {
  keywords: /\b(public|private|protected|class|interface|enum|extends|implements|return|if|else|for|while|do|switch|case|break|continue|new|try|catch|throw|throws|finally|static|void|int|double|float|long|boolean|String|var|final|abstract|synchronized|volatile|transient|native|package|import|this|super|null|true|false|instanceof|const|goto|strictfp|assert|default|byte|short|char|fun|val|var|when|object|companion|override|lateinit|init|open|inline|suspend|data|sealed|infix|operator|typealias)\b/g,
  strings: /(["'])(\\?.)*?\1/g,
  comments: /\/\/.*|\/\*[\s\S]*?\*\//g,
  annotations: /@[A-Za-z][A-Za-z0-9_.]*/g,
  numbers: /\b\d+\.?\d*\b/g,
  functions: /\b[A-Za-z0-9_]+(?=\s*\()/g,
  braces: /[{}[\]()]/g
};

interface SyntaxHighlighterProps {
  code: string;
}

const SyntaxHighlighter = forwardRef<HTMLPreElement, SyntaxHighlighterProps>(
  ({ code }, ref) => {
    const { theme, language } = useApp();
    
    // Apply syntax highlighting
    const highlightCode = (code: string) => {
      let highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      // Apply patterns with specific colors
      highlighted = highlighted
        .replace(patterns.comments, '<span class="text-gray-500">$&</span>')
        .replace(patterns.strings, '<span class="text-green-600 dark:text-green-400">$&</span>')
        .replace(patterns.keywords, '<span class="text-purple-600 dark:text-purple-400">$&</span>')
        .replace(patterns.annotations, '<span class="text-blue-600 dark:text-blue-400">$&</span>')
        .replace(patterns.numbers, '<span class="text-orange-600 dark:text-orange-400">$&</span>')
        .replace(patterns.functions, '<span class="text-blue-700 dark:text-blue-300">$&</span>')
        .replace(patterns.braces, '<span class="text-gray-600 dark:text-gray-400">$&</span>');
      
      return highlighted;
    };
    
    // Add line numbers
    const addLineNumbers = (code: string) => {
      const lines = code.split('\n');
      return lines.map((line, i) => {
        const lineNumber = i + 1;
        return `<div class="table-row">
          <span class="table-cell pr-4 text-right select-none text-gray-400 dark:text-gray-600">${lineNumber}</span>
          <span class="table-cell">${line || ' '}</span>
        </div>`;
      }).join('');
    };
    
    const highlightedCode = highlightCode(code);
    const codeWithLineNumbers = addLineNumbers(highlightedCode);
    
    return (
      <pre 
        ref={ref}
        className={`p-4 w-full h-full overflow-auto ${
          theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-800'
        }`}
      >
        <code className="table w-full" dangerouslySetInnerHTML={{ __html: codeWithLineNumbers }} />
      </pre>
    );
  }
);

export default SyntaxHighlighter;
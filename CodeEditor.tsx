import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import SyntaxHighlighter from './SyntaxHighlighter';

const CodeEditor: React.FC = () => {
  const { code, setCode, theme, generateSuggestions, suggestions, explaining } = useApp();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Sync scroll position between textarea and highlighted code
    const handleScroll = () => {
      if (editorRef.current && preRef.current) {
        preRef.current.scrollTop = editorRef.current.scrollTop;
        preRef.current.scrollLeft = editorRef.current.scrollLeft;
      }
    };

    const textarea = editorRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Get cursor position
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newCode.substring(0, cursorPos);
    const lastWord = textBeforeCursor.split(/\s/).pop() || '';
    
    // Generate suggestions for last word
    if (lastWord.length > 1) {
      generateSuggestions(lastWord);
    }
  };

  return (
    <div className={`relative h-full font-mono text-sm ${explaining ? 'opacity-80' : ''}`}>
      <div className="absolute inset-0 overflow-hidden">
        <SyntaxHighlighter code={code} ref={preRef} />
      </div>
      
      <textarea
        ref={editorRef}
        value={code}
        onChange={handleCodeChange}
        className={`absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-gray-800 dark:caret-gray-300 resize-none outline-none font-mono`}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      
      {suggestions.length > 0 && !explaining && (
        <div className={`absolute right-4 top-4 max-w-xs overflow-hidden rounded-lg shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="py-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer flex items-center ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                } ${index === 0 ? 'animate-pulse' : ''}`}
                onClick={() => setCode(`${code}\n// Adding: ${suggestion}\n`)}
              >
                <span className="mr-2 text-blue-500">+</span>
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {explaining && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default CodeEditor;
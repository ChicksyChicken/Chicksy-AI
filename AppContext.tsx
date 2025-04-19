import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Language } from '../types';
import { defaultSnippets } from '../data/snippets';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  code: string;
  setCode: (code: string) => void;
  suggestions: string[];
  explaining: boolean;
  setExplaining: (explaining: boolean) => void;
  generateSuggestions: (input: string) => void;
  generateCode: (prompt: string) => string;
  explainCode: (code: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('java');
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [explaining, setExplaining] = useState(false);

  // Initialize with a default example
  useEffect(() => {
    setCode(defaultSnippets[language].code);
  }, [language]);

  // Toggle theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  const generateSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
    
    // Simulated AI suggestion generation
    const newSuggestions = defaultSnippets[language].suggestions.filter(s => 
      s.toLowerCase().includes(input.toLowerCase())
    );
    
    setSuggestions(newSuggestions.slice(0, 3));
  };

  const generateCode = (prompt: string): string => {
    // In a real app, this would call an API
    // For the demo, we use pre-defined snippets
    if (prompt.includes('sort')) {
      return defaultSnippets[language].sort;
    } else if (prompt.includes('api')) {
      return defaultSnippets[language].api;
    } else if (prompt.includes('class')) {
      return defaultSnippets[language].class;
    }
    return defaultSnippets[language].code;
  };

  const explainCode = (codeToExplain: string): string => {
    // Simplified explanation logic
    return defaultSnippets[language].explanation;
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      language,
      setLanguage,
      code,
      setCode,
      suggestions,
      explaining,
      setExplaining,
      generateSuggestions,
      generateCode,
      explainCode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};
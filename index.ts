export type Theme = 'light' | 'dark';
export type Language = 'java' | 'kotlin';

export interface Snippet {
  name: string;
  description: string;
  code: string;
}

export interface CodeSuggestion {
  text: string;
  description: string;
}

export interface SnippetCollection {
  code: string;
  suggestions: string[];
  sort: string;
  api: string;
  class: string;
  explanation: string;
}
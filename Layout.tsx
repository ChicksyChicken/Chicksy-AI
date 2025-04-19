import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import Header from './Header';
import { Code, Sparkles, Lightbulb, Copy } from 'lucide-react';

const Layout: React.FC = () => {
  const { theme, language, code, setCode, generateCode, explainCode, explaining, setExplaining } = useApp();
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation with a delay
    setTimeout(() => {
      const generatedCode = generateCode(prompt);
      setCode(generatedCode);
      setOutput('Code generated successfully!');
      setIsGenerating(false);
    }, 1500);
  };

  const handleExplain = () => {
    setExplaining(true);
    setTimeout(() => {
      setOutput(explainCode(code));
      setExplaining(false);
    }, 1000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what code you need..."
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                <div className={`absolute right-2 top-2 transition-opacity ${prompt ? 'opacity-100' : 'opacity-0'}`}>
                  <Sparkles className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isGenerating ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Code className="h-5 w-5" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language === 'java' 
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                  }`}>
                    {language === 'java' ? 'Java' : 'Kotlin'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleExplain}
                    disabled={explaining}
                    className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-sm">Explain</span>
                  </button>
                  
                  <button
                    onClick={handleCopyCode}
                    className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-sm">{showCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <CodeEditor />
              </div>
            </div>
            
            <OutputPanel output={output} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
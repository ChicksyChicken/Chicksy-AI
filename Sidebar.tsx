import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, BookOpen, Code, PanelLeft, FileCode, ChevronRight } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { theme, language, setCode, setLanguage } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const { defaultSnippets } = require('../data/snippets');
  
  const sidebarItems = [
    { name: 'Examples', icon: <Layers className="h-5 w-5" /> },
    { name: 'Documentation', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Snippets', icon: <Code className="h-5 w-5" /> }
  ];
  
  const examples = [
    { name: 'Hello World', code: defaultSnippets[language].code },
    { name: 'Sorting Example', code: defaultSnippets[language].sort },
    { name: 'API Client', code: defaultSnippets[language].api },
    { name: 'Data Class', code: defaultSnippets[language].class }
  ];
  
  return (
    <aside 
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } border-r transition-all duration-300 flex flex-col ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h2 className={`font-semibold ${collapsed ? 'hidden' : 'block'}`}>
          Code Library
        </h2>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded-lg ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 ${
                  index === 2 
                    ? theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
        
        {!collapsed && (
          <>
            <div className="mt-6 px-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Examples
              </h3>
            </div>
            
            <ul className="mt-2">
              {examples.map((example, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCode(example.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <FileCode className="h-4 w-4 text-gray-500" />
                    <span className="truncate">{example.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
      
      {!collapsed && (
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-blue-800'}`}>
              No API key required!
            </p>
            <div className="mt-2">
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Powered by offline model
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
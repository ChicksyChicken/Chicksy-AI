import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';

interface OutputPanelProps {
  output: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output }) => {
  const { theme, explaining } = useApp();
  
  return (
    <div 
      className={`w-full lg:w-1/3 lg:border-l ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      } flex flex-col overflow-hidden transition-all duration-300 ${
        explaining ? 'lg:w-2/5' : ''
      }`}
    >
      <div className="p-3 border-b flex items-center gap-2 text-sm font-medium">
        <MessageSquare className="h-4 w-4" />
        <span>{explaining ? 'Code Explanation' : 'Output'}</span>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {output ? (
          <div>
            {explaining ? (
              <div className="prose prose-sm dark:prose-invert max-w-none animate-fadeIn">
                {output.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'
              }`}>
                {output}
              </div>
            )}
          </div>
        ) : (
          <div className={`h-full flex flex-col items-center justify-center ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <div className="text-center">
              <p>No output to display</p>
              <p className="text-sm mt-2">Try generating or explaining code</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
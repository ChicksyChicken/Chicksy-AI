import React from 'react';
import CodeEditor from './components/CodeEditor';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}

export default App;
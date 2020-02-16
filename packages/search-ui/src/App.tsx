import { Chrome } from '@zendeskgarden/react-chrome';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import React from 'react';
import './App.scss';
import { Navigation } from './components/navigation/Navigation';
import { PageContent } from './components/page-content/PageContent';

function App() {
  return (
    <ThemeProvider>
      <Chrome>
        <Navigation />
        <PageContent />
      </Chrome>
    </ThemeProvider>
  );
}

export default App;

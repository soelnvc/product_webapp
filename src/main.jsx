// This file is the starting point that runs the website
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This part updates the memory to "true" if the website crashes
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // This part tells the developer exactly what the error was in the console
  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  // This part decides what to draw on the screen: either an error message or the website
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'red', fontFamily: 'monospace', backgroundColor: '#0a0a0a', height: '100vh', width: '100vw', zIndex: 99999, position: 'fixed', top: 0, left: 0 }}>
          <h2 style={{ color: 'white' }}>Runtime Error Extracted:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#222', padding: '20px', color: '#ff5555' }}>{this.state.error?.toString()}</pre>
          <p style={{ color: 'white', marginTop: '20px' }}>Something went wrong. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Mount the application to the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

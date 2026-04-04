import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'red', fontFamily: 'monospace', backgroundColor: '#0a0a0a', height: '100vh', width: '100vw', zIndex: 99999, position: 'fixed', top: 0, left: 0 }}>
          <h2 style={{ color: 'white' }}>Runtime Error Extracted:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#222', padding: '20px', color: '#ff5555' }}>{this.state.error?.toString()}</pre>
          <p style={{ color: 'white', marginTop: '20px' }}>Please copy/paste this exact text back so I can fix the crash instantly!</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

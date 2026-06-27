import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a real app, you would log this to an error reporting service like Sentry
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <div className="max-w-lg p-10 bg-white/40 backdrop-blur-xl border border-red-200 rounded-3xl shadow-2xl text-center">
            <h1 className="text-4xl font-extrabold text-red-500 mb-4">Oops!</h1>
            <p className="text-xl text-gray-800 mb-6">Something went wrong in the application.</p>
            <p className="text-sm text-gray-500 mb-8 bg-white/50 p-4 rounded-lg font-mono">
              {this.state.error?.toString()}
            </p>
            <button 
              onClick={() => window.location.href = '/'} 
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
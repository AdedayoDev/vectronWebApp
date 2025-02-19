'use client';

export default function AuthErrorPage() {
  const error = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('error') 
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-4 text-red-600">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          {error || 'An error occurred during authentication'}
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
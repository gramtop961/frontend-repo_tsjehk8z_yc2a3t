import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Builder from './components/Builder';

export default function App() {
  const [route, setRoute] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <Header
        onGenerateSummary={() => {}}
        onDownload={() => {}}
        onClear={() => {}}
        onNavigate={setRoute}
        active={route}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {route === 'home' && (
          <Home onGetStarted={() => setRoute('builder')} onPickTemplate={() => setRoute('builder')} />
        )}
        {route === 'builder' && <Builder />}
        {route === 'templates' && <Builder />}
      </main>

      <style>
        {`
        .input { @apply w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30; }
        `}
      </style>
    </div>
  );
}

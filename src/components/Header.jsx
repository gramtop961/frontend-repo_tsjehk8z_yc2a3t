import React from 'react';
import { FileText, Sparkles, Download, Eraser } from 'lucide-react';

export default function Header({ onGenerateSummary, onDownload, onClear }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-indigo-600 text-white">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">AI Resume Builder</h1>
            <p className="text-sm text-gray-500">Craft a polished resume in minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onGenerateSummary}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
          >
            <Sparkles size={18} />
            Smart summary
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Download size={18} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50 transition"
          >
            <Eraser size={18} />
            Clear
          </button>
        </div>
      </div>
    </header>
  );
}

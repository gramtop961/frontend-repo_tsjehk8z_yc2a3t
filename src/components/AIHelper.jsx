import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIHelper({ onImprove, loading }) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-indigo-600 text-white mt-0.5">
          <Sparkles size={18} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">AI writing assistant</h3>
          <p className="text-sm text-gray-600">Get concise, keyword-optimized summaries and bullet points tailored to your role.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => onImprove('summary')}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              Enhance summary
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => onImprove('experience')}
              className="px-3 py-1.5 rounded-md bg-white border text-gray-800 hover:bg-gray-50 disabled:opacity-60"
            >
              Improve experience bullets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const templates = [
  { id: 'classic', name: 'Classic', desc: 'Structured, ATS-friendly' },
  { id: 'elegant', name: 'Elegant', desc: 'Refined typographic focus' },
  { id: 'minimal', name: 'Minimal', desc: 'Airy, modern, clean' },
  { id: 'bold', name: 'Bold', desc: 'Striking headings and contrast' },
];

export default function TemplatePicker({ current, onChange }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold">Choose a template</h3>
      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`text-left border rounded-lg p-3 hover:bg-gray-50 flex items-start gap-3 ${current === t.id ? 'ring-2 ring-indigo-500/40' : ''}`}
          >
            <div className={`mt-0.5 ${current === t.id ? 'text-indigo-600' : 'text-gray-400'}`}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="font-medium">{t.name}</p>
              <p className="text-sm text-gray-600">{t.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

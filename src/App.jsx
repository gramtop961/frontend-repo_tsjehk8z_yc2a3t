import React, { useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AIHelper from './components/AIHelper';

// Simple client-side PDF using print dialog of the preview area
function downloadElementAsPDF(element) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  const html = `<!doctype html><html><head><title>Resume</title>
  <style>
    *{box-sizing:border-box} body{font-family:Inter,system-ui,Arial,sans-serif;padding:24px}
    @page { size: A4; margin: 20mm; }
  </style>
  </head><body>${element.outerHTML}</body></html>`;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  // Delay to ensure styles apply
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
}

const defaultData = {
  basic: { name: '', title: '', email: '', phone: '', location: '', website: '' },
  summary: '',
  experience: [
    { company: '', role: '', start: '', end: '', bullets: '' },
  ],
  education: [
    { school: '', degree: '', year: '' },
  ],
  skills: [ { name: '' } ],
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [loadingAI, setLoadingAI] = useState(false);
  const previewRef = useRef(null);

  const handleGenerateSummary = async () => {
    // Local heuristic "AI" if no backend present
    if (!data.summary) {
      const years = data.experience.map(e => e.end || e.start).filter(Boolean).length;
      const role = data.experience.find(e => e.role)?.role || data.basic.title || 'professional';
      const stack = data.skills.map(s => s.name).filter(Boolean).slice(0, 4).join(', ');
      const base = `Results-driven ${role} with ${years || 'proven'} years of experience. Skilled in ${stack || 'modern tools and best practices'}. Passionate about building high-impact solutions and collaborating across teams.`;
      setData({ ...data, summary: base });
    }
  };

  const handleDownload = () => {
    if (previewRef.current) {
      downloadElementAsPDF(previewRef.current);
    }
  };

  const handleClear = () => setData(defaultData);

  const onAIImprove = async (target) => {
    // This is a placeholder local AI behavior for the sandbox; can be swapped to real backend later
    setLoadingAI(true);
    await new Promise((r) => setTimeout(r, 600));

    if (target === 'summary') {
      const name = data.basic.name || 'Candidate';
      const title = data.basic.title || 'Professional';
      const skills = data.skills.map(s => s.name).filter(Boolean).slice(0, 5);
      const bullet = `• ${title} blending ${skills.slice(0,3).join(', ')} to deliver measurable outcomes.`;
      const improved = `${name} — ${title} focused on impact, reliability, and clarity. ${skills.length ? `Core strengths: ${skills.join(', ')}.` : ''}`.trim();
      setData({ ...data, summary: [improved, bullet].join('\n') });
    }

    if (target === 'experience') {
      const updated = data.experience.map((e) => {
        const bullets = e.bullets ? e.bullets.split(/\r?\n/).filter(Boolean) : [];
        const enriched = [
          ...bullets,
          'Increased delivery speed by 20% by optimizing workflows and code reviews.',
          'Collaborated cross-functionally to ship features impacting 50k+ users.',
        ].filter((v, i, a) => a.indexOf(v) === i);
        return { ...e, bullets: enriched.join('\n') };
      });
      setData({ ...data, experience: updated });
    }

    setLoadingAI(false);
  };

  const isEmpty = useMemo(() => JSON.stringify(data) === JSON.stringify(defaultData), [data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <Header onGenerateSummary={handleGenerateSummary} onDownload={handleDownload} onClear={handleClear} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AIHelper onImprove={onAIImprove} loading={loadingAI} />
          <div className="mt-6">
            <ResumeForm data={data} onChange={setData} />
          </div>
        </div>

        <div className="lg:sticky lg:top-20 h-fit">
          <h2 className="text-sm font-medium text-gray-600 mb-2">Live preview</h2>
          <div className="rounded-xl border bg-white p-3">
            <div ref={previewRef} className="max-w-[800px] mx-auto">
              <ResumePreview data={data} />
            </div>
          </div>
          {isEmpty && (
            <p className="text-xs text-gray-500 mt-2">Start by filling out your details on the left. The preview updates in real-time.</p>
          )}
        </div>
      </main>

      <style>
        {`
        .input { @apply w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30; }
        `}
      </style>
    </div>
  );
}

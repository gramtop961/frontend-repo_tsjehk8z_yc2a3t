import React, { useMemo, useRef, useState } from 'react';
import TemplatePicker from './TemplatePicker';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import AIHelper from './AIHelper';

const defaultData = {
  basic: { name: '', title: '', email: '', phone: '', location: '', website: '' },
  summary: '',
  experience: [ { company: '', role: '', start: '', end: '', bullets: '' } ],
  education: [ { school: '', degree: '', year: '' } ],
  skills: [ { name: '' } ],
};

function downloadElementAsPDF(element) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  const html = `<!doctype html><html><head><title>Resume</title>
  <style>*{box-sizing:border-box} body{font-family:Inter,system-ui,Arial,sans-serif;padding:24px} @page { size: A4; margin: 20mm; }</style>
  </head><body>${element.outerHTML}</body></html>`;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
}

export default function Builder() {
  const [data, setData] = useState(defaultData);
  const [template, setTemplate] = useState('elegant');
  const [loadingAI, setLoadingAI] = useState(false);
  const previewRef = useRef(null);

  const isEmpty = useMemo(() => JSON.stringify(data) === JSON.stringify(defaultData), [data]);

  const onAIImprove = async (target) => {
    setLoadingAI(true);
    await new Promise((r) => setTimeout(r, 500));

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
          'Optimized workflows increasing delivery speed by 20%.',
          'Collaborated cross-functionally to ship features impacting 50k+ users.',
        ].filter((v, i, a) => a.indexOf(v) === i);
        return { ...e, bullets: enriched.join('\n') };
      });
      setData({ ...data, experience: updated });
    }

    setLoadingAI(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TemplatePicker current={template} onChange={setTemplate} />
        <AIHelper onImprove={onAIImprove} loading={loadingAI} />
        <ResumeForm data={data} onChange={setData} />
      </div>
      <div className="lg:sticky lg:top-24 h-fit space-y-3">
        <div className="rounded-xl border bg-white p-3">
          <div ref={previewRef} className="max-w-[800px] mx-auto">
            <ResumePreview data={data} template={template} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => downloadElementAsPDF(previewRef.current)} className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Export PDF</button>
          <button onClick={() => setData(defaultData)} className="px-3 py-2 rounded-md border hover:bg-gray-50">Reset</button>
        </div>
        {isEmpty && <p className="text-xs text-gray-500">Fill in your details on the left to see them reflected here.</p>}
      </div>
    </div>
  );
}

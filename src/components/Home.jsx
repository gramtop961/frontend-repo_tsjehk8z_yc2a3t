import React from 'react';
import Spline from '@splinetool/react-spline';
import ResumePreview from './ResumePreview';

function SampleData() {
  return {
    basic: { name: 'Avery Collins', title: 'Product Designer', email: 'avery@design.com', phone: '(555) 555-0123', location: 'San Francisco, CA', website: 'avery.design' },
    summary: 'Human-centered product designer focused on clarity, systems, and delightful interactions. Blending UX research with visual craft to ship meaningful outcomes.',
    experience: [
      { company: 'Wave', role: 'Senior Product Designer', start: '2021', end: 'Present', bullets: 'Redesigned onboarding, improving activation +26%\nLed cross-platform design system refresh' },
      { company: 'Flowbase', role: 'Product Designer', start: '2019', end: '2021', bullets: 'Shipped analytics module used by 40k+ users\nMentored 3 associate designers' }
    ],
    education: [{ school: 'RISD', degree: 'BFA, Industrial Design', year: '2017' }],
    skills: [{ name: 'Figma' }, { name: 'Prototyping' }, { name: 'UX Research' }, { name: 'Design Systems' }],
  };
}

export default function Home({ onGetStarted, onPickTemplate }) {
  const sample = SampleData();
  return (
    <div>
      <section className="relative min-h-[520px] grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative z-10 py-10">
          <p className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">Modern • Minimal • 3D</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">Design an impressive resume with AI</h1>
          <p className="mt-3 text-gray-600 max-w-xl">Build polished, multi-page resumes with premium templates. Write faster with AI assistance, and export pixel-perfect PDFs.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onGetStarted} className="px-4 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Start building</button>
            <button onClick={() => onPickTemplate('elegant')} className="px-4 py-2.5 rounded-md border hover:bg-gray-50">Browse templates</button>
          </div>
        </div>
        <div className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/60 via-white/30 to-transparent" />
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Premium templates</h2>
          <button onClick={onGetStarted} className="text-sm text-indigo-700 hover:underline">Use selected template</button>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-5">
          {['classic','elegant','minimal'].map((tpl) => (
            <button key={tpl} onClick={() => onPickTemplate(tpl)} className="group text-left">
              <div className="aspect-[4/5] bg-white border rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition">
                <div className="scale-[0.68] origin-top-left -m-10">
                  <ResumePreview data={sample} template={tpl} />
                </div>
              </div>
              <p className="mt-2 text-sm font-medium capitalize">{tpl} template</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

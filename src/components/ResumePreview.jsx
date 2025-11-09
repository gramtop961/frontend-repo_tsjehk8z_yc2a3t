import React, { forwardRef, useMemo } from 'react';

const SectionTitle = ({ children, template }) => (
  <h3
    className={
      template === 'bold'
        ? 'text-sm font-semibold tracking-wide text-gray-800 border-b pb-1'
        : 'text-sm font-semibold tracking-wide text-gray-700 border-b pb-1'
    }
  >
    {children}
  </h3>
);

const formatBullets = (text) => {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
};

const ResumePreview = forwardRef(function ResumePreview({ data, template = 'classic' }, ref) {
  const skillsList = useMemo(() => data.skills.map((s) => s.name).filter(Boolean), [data.skills]);

  const headingClass = {
    classic: 'text-2xl font-semibold leading-tight',
    elegant: 'text-[28px] font-medium tracking-tight',
    minimal: 'text-2xl font-semibold',
    bold: 'text-3xl font-bold',
  }[template];

  const accent = {
    classic: 'text-gray-600',
    elegant: 'text-indigo-700',
    minimal: 'text-gray-500',
    bold: 'text-gray-900',
  }[template];

  const chip = {
    classic: 'px-2 py-1 text-xs bg-gray-100 rounded-md border',
    elegant: 'px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100',
    minimal: 'px-2 py-1 text-xs bg-gray-50 rounded-md border',
    bold: 'px-2 py-1 text-xs bg-black text-white rounded-md',
  }[template];

  return (
    <div ref={ref} className="bg-white shadow-sm border rounded-lg p-6 text-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <h1 className={headingClass}>{data.basic.name || 'Your Name'}</h1>
          <p className={accent}>{data.basic.title || 'Your Title'}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          {(data.basic.location || data.basic.email || data.basic.phone) && (
            <p>
              {[data.basic.location, data.basic.email, data.basic.phone].filter(Boolean).join(' · ')}
            </p>
          )}
          {data.basic.website && (
            <p className="truncate max-w-[260px]">{data.basic.website}</p>
          )}
        </div>
      </div>

      {data.summary && (
        <div className="mt-4">
          <SectionTitle template={template}>Summary</SectionTitle>
          <p className="mt-2 text-sm leading-relaxed text-gray-800 whitespace-pre-line">{data.summary}</p>
        </div>
      )}

      {data.experience.filter((e) => e.company || e.role || e.bullets).length > 0 && (
        <div className="mt-5">
          <SectionTitle template={template}>Experience</SectionTitle>
          <div className="mt-2 space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {exp.role || 'Role'} <span className="text-gray-500">•</span> {exp.company || 'Company'}
                  </p>
                  <p className="text-sm text-gray-600">{[exp.start, exp.end].filter(Boolean).join(' – ')}</p>
                </div>
                {exp.bullets && (
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    {formatBullets(exp.bullets).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.filter((e) => e.school || e.degree || e.year).length > 0 && (
        <div className="mt-5">
          <SectionTitle template={template}>Education</SectionTitle>
          <ul className="mt-2 space-y-1 text-sm">
            {data.education.map((ed, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="font-medium">{ed.school || 'School'}</span>
                <span className="text-gray-700">{ed.degree}</span>
                <span className="text-gray-600">{ed.year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {skillsList.length > 0 && (
        <div className="mt-5">
          <SectionTitle template={template}>Skills</SectionTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            {skillsList.map((s, i) => (
              <span key={i} className={chip}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;

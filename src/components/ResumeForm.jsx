import React from 'react';

export default function ResumeForm({ data, onChange }) {
  const inputClass = "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30";

  const handleChange = (section, field, value) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value,
      },
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const arr = [...data[section]];
    arr[index] = { ...arr[index], [field]: value };
    onChange({ ...data, [section]: arr });
  };

  const addArrayItem = (section, template) => {
    onChange({ ...data, [section]: [...data[section], template] });
  };

  const removeArrayItem = (section, index) => {
    const arr = data[section].filter((_, i) => i !== index);
    onChange({ ...data, [section]: arr });
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg border p-4">
        <h2 className="font-semibold text-gray-800 mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Full name"
            value={data.basic.name}
            onChange={(e) => handleChange('basic', 'name', e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Title (e.g., Frontend Developer)"
            value={data.basic.title}
            onChange={(e) => handleChange('basic', 'title', e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Email"
            value={data.basic.email}
            onChange={(e) => handleChange('basic', 'email', e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Phone"
            value={data.basic.phone}
            onChange={(e) => handleChange('basic', 'phone', e.target.value)}
          />
          <input
            className={`${inputClass} md:col-span-2`}
            placeholder="Location"
            value={data.basic.location}
            onChange={(e) => handleChange('basic', 'location', e.target.value)}
          />
          <input
            className={`${inputClass} md:col-span-2`}
            placeholder="Website or LinkedIn"
            value={data.basic.website}
            onChange={(e) => handleChange('basic', 'website', e.target.value)}
          />
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <h2 className="font-semibold text-gray-800 mb-4">Summary</h2>
        <textarea
          className={`${inputClass} min-h-[100px]`}
          placeholder="A concise professional summary"
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
        />
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Experience</h2>
          <button
            onClick={() =>
              addArrayItem('experience', {
                company: '',
                role: '',
                start: '',
                end: '',
                bullets: '',
              })
            }
            className="text-indigo-600 hover:underline"
          >
            + Add role
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 border rounded-md p-3">
              <input
                className={inputClass}
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Start"
                value={exp.start}
                onChange={(e) => handleArrayChange('experience', i, 'start', e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className={`${inputClass} flex-1`}
                  placeholder="End"
                  value={exp.end}
                  onChange={(e) => handleArrayChange('experience', i, 'end', e.target.value)}
                />
                <button
                  className="px-2 text-red-600 hover:underline"
                  onClick={() => removeArrayItem('experience', i)}
                >
                  Remove
                </button>
              </div>
              <textarea
                className={`${inputClass} md:col-span-4 min-h-[80px]`}
                placeholder="Key achievements (one per line)"
                value={exp.bullets}
                onChange={(e) => handleArrayChange('experience', i, 'bullets', e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Education</h2>
          <button
            onClick={() => addArrayItem('education', { school: '', degree: '', year: '' })}
            className="text-indigo-600 hover:underline"
          >
            + Add education
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((ed, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 border rounded-md p-3">
              <input
                className={inputClass}
                placeholder="School"
                value={ed.school}
                onChange={(e) => handleArrayChange('education', i, 'school', e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className={`${inputClass} flex-1`}
                  placeholder="Year"
                  value={ed.year}
                  onChange={(e) => handleArrayChange('education', i, 'year', e.target.value)}
                />
                <button
                  className="px-2 text-red-600 hover:underline"
                  onClick={() => removeArrayItem('education', i)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Skills</h2>
          <button
            onClick={() => addArrayItem('skills', { name: '' })}
            className="text-indigo-600 hover:underline"
          >
            + Add skill
          </button>
        </div>
        <div className="space-y-2">
          {data.skills.map((sk, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={`${inputClass} flex-1`}
                placeholder="e.g., React, TypeScript, SQL"
                value={sk.name}
                onChange={(e) => handleArrayChange('skills', i, 'name', e.target.value)}
              />
              <button
                className="px-2 text-red-600 hover:underline"
                onClick={() => removeArrayItem('skills', i)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

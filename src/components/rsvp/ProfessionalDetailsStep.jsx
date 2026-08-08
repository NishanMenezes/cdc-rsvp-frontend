import { Building2, Briefcase } from 'lucide-react';

export default function ProfessionalDetailsStep({ formData, onChange, onNext, onBack }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Professional Details</h2>
      <p className="text-slate-400 text-sm mb-6">Tell us about your professional background.</p>

      <div className="space-y-4">
        <Field icon={Building2} label="Company" value={formData.company} onChange={onChange('company')} />
        <Field icon={Briefcase} label="Designation" value={formData.designation} onChange={onChange('designation')} />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium py-3 rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-2.5 border border-slate-700 bg-slate-800/80 rounded-lg px-3.5 py-2.5">
        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-slate-100"
        />
      </div>
    </div>
  );
}
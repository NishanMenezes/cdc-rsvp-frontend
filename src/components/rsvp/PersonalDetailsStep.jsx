import { User, Mail, Phone } from 'lucide-react';

export default function PersonalDetailsStep({ formData, onChange, onNext }) {
  return (
    <div>
      <h2 className="text-lg font-seibold mb-1">Personal Details</h2>
      <p className="text-slate-400 text-sm mb-6">Please review and update your information.</p>

      <div className="space-y-4">
        <Field icon={User} label="First Name" value={formData.firstName} onChange={onChange('firstName')} />
        <Field icon={User} label="Last Name" value={formData.lastName} onChange={onChange('lastName')} />
        <Field icon={Mail} label="Email Address" type="email" value={formData.email} onChange={onChange('email')} />
        <Field icon={Phone} label="Mobile Number" value={formData.mobile} readOnly />
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
      >
        Next
      </button>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, readOnly, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
      <div className={`flex items-center gap-2.5 border rounded-lg px-3.5 py-2.5 ${readOnly ? 'border-slate-800 bg-slate-800/40' : 'border-slate-700 bg-slate-800/80'}`}>
        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className="w-full bg-transparent outline-none text-slate-100 disabled:text-slate-500"
        />
      </div>
    </div>
  );
}
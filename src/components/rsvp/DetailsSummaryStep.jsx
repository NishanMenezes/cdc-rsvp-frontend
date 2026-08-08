import { Loader2, User, Mail, Phone, Building2, Briefcase, CheckCircle2 } from 'lucide-react';

export default function DetailsSummaryStep({ formData, onConfirm, loading }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Your Details</h2>
      <p className="text-slate-400 text-sm mb-6">
        Please review your details below. Contact the event team if anything needs correction.
      </p>

      <div className="space-y-3">
        <Row icon={User} label="Name" value={`${formData.firstName} ${formData.lastName}`} />
        <Row icon={Mail} label="Email" value={formData.email} />
        <Row icon={Phone} label="Mobile" value={formData.mobile} />
        <Row icon={Building2} label="Company" value={formData.company} />
        <Row icon={Briefcase} label="Designation" value={formData.designation} />
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
        Confirm & Get My Badge
      </button>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 border border-slate-800 bg-slate-800/40 rounded-lg px-3.5 py-2.5">
      <Icon className="w-4 h-4 text-slate-500 shrink-0" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-200 font-medium">{value}</p>
      </div>
    </div>
  );
}
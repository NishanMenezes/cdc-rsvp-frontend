import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ReviewStep({ formData, onSubmit, onBack, loading }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        <h2 className="text-lg font-semibold">Review Your Information</h2>
      </div>

      <div className="bg-slate-800/50 border border-slate-800 rounded-lg p-4 space-y-3 text-sm">
        <Row label="Name" value={`${formData.firstName} ${formData.lastName}`} />
        <Row label="Mobile" value={formData.mobile} />
        <Row label="Email" value={formData.email} />
        <Row label="Company" value={formData.company} />
        <Row label="Designation" value={formData.designation} />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium py-3 rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-200 font-medium">{value}</span>
    </div>
  );
}
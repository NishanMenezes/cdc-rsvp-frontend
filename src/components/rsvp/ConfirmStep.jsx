import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function ConfirmStep({ attendee, onConfirm, onDecline, loading }) {
  return (
    <div className="text-center py-4">
      <h2 className="text-xl font-semibold mb-2">Hello, {attendee.name}</h2>
      <p className="text-slate-400 mb-6">
        You're invited to Mumbai CDC 2026. Please confirm your attendance to continue.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Yes, I'll Attend
        </button>
        <button
          onClick={onDecline}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 disabled:opacity-60 text-slate-300 font-medium py-3 rounded-lg transition"
        >
          <XCircle className="w-4 h-4" />
          Sorry, Can't Attend
        </button>
      </div>
    </div>
  );
}
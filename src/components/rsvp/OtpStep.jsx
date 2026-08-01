import { useState } from 'react';
import { ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';

export default function OtpStep({ mobile, onVerify, onResend, loading, error }) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <div className="text-center py-4">
      <ShieldCheck className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
      <h2 className="text-lg font-semibold mb-1">Verify Your Number</h2>
      <p className="text-slate-400 text-sm mb-6">
        We've sent a 6-digit code to {mobile} via WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit code"
          className="w-full text-center tracking-[0.5em] text-lg bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 outline-none focus:border-indigo-500"
        />

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-left">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Verify
        </button>

        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Resend code
        </button>
      </form>
    </div>
  );
}
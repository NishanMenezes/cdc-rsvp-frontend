import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertTriangle, Lock, BadgeCheck, Clock } from 'lucide-react';
import ConfirmStep from './rsvp/ConfirmStep';
import OtpStep from './rsvp/OtpStep';
import PersonalDetailsStep from './rsvp/PersonalDetailsStep';
import ProfessionalDetailsStep from './rsvp/ProfessionalDetailsStep';
import ReviewStep from './rsvp/ReviewStep';
import BadgeStep from './rsvp/BadgeStep';

import { API_BASE } from '../config';

export default function RSVPForm() {
  const { inviteId } = useParams();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [attendee, setAttendee] = useState(null);
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const [deadline, setDeadline] = useState(null);

  const [step, setStep] = useState('confirm'); // confirm | otp | personal | professional | review | badge | declined
  const [stepLoading, setStepLoading] = useState(false);
  const [stepError, setStepError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', mobile: '', company: '', designation: '',
  });

  const fetchAttendee = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`${API_BASE}/attendee/${inviteId}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setLoadError(json.message || 'Unable to load your invite details.');
        setLoading(false);
        return;
      }

      setAttendee(json.data);
      setDeadlinePassed(json.deadlinePassed);
      setDeadline(json.deadline);

      const [firstName, ...rest] = json.data.name.split(' ');
      setFormData({
        firstName: firstName || '',
        lastName: rest.join(' ') || '',
        email: json.data.email,
        mobile: json.data.mobile,
        company: json.data.company,
        designation: json.data.designation,
      });

      if (json.data.status === 'Confirmed') setStep('badge');
      if (json.data.status === 'Declined') setStep('declined');
    } catch (err) {
      setLoadError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [inviteId]);

  useEffect(() => { fetchAttendee(); }, [fetchAttendee]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    setStepLoading(true);
    setStepError('');
    try {
      const res = await fetch(`${API_BASE}/send-otp/${inviteId}`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStepError(json.message || 'Failed to send OTP.');
        return;
      }
      setStep('otp');
    } catch (err) {
      setStepError('Network error. Please try again.');
    } finally {
      setStepLoading(false);
    }
  };

  const handleDecline = async () => {
    setStepLoading(true);
    setStepError('');
    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId, mode: 'confirm', status: 'Declined' }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStepError(json.message || 'Something went wrong.');
        return;
      }
      setStep('declined');
    } catch (err) {
      setStepError('Network error. Please try again.');
    } finally {
      setStepLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setStepLoading(true);
    setStepError('');
    try {
      const res = await fetch(`${API_BASE}/verify-otp/${inviteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStepError(json.message || 'Incorrect OTP.');
        return;
      }
      setStep('personal');
    } catch (err) {
      setStepError('Network error. Please try again.');
    } finally {
      setStepLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setStepError('');
    try {
      await fetch(`${API_BASE}/send-otp/${inviteId}`, { method: 'POST' });
    } catch (err) {
      setStepError('Failed to resend OTP.');
    }
  };

  const handleFinalSubmit = async () => {
    setStepLoading(true);
    setStepError('');
    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteId,
          mode: 'confirm',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          mobile: formData.mobile,
          company: formData.company,
          designation: formData.designation,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setStepError(json.message || 'Submission failed.');
        return;
      }
      setStep('badge');
    } catch (err) {
      setStepError('Network error. Please try again.');
    } finally {
      setStepLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          <p className="text-slate-400">Loading your invite...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
        <div className="max-w-md w-full text-center border border-red-500/30 bg-red-500/5 rounded-2xl p-8">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Invite Not Found</h1>
          <p className="text-slate-400">{loadError}</p>
        </div>
      </div>
    );
  }

  if (deadlinePassed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
        <div className="max-w-md w-full text-center border border-slate-700 bg-slate-900 rounded-2xl p-8">
          <Lock className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">RSVP Closed</h1>
          <p className="text-slate-400">
            The RSVP window for Mumbai CDC 2026 closed on{' '}
            {deadline ? new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'August 1, 2026'}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Mumbai CDC 2026</h1>
          <p className="text-slate-400 mt-1">VIP RSVP & Attendee Verification</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
            <BadgeCheck className="w-4 h-4" />
            Invite ID: <span className="text-slate-200 font-medium">{inviteId}</span>
          </div>

          {step === 'declined' && (
            <div className="text-center py-6">
              <Clock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Response Recorded</h2>
              <p className="text-slate-400">We're sorry you can't make it. Thank you for letting us know.</p>
            </div>
          )}

          {step === 'confirm' && (
            <ConfirmStep attendee={attendee} onConfirm={handleConfirm} onDecline={handleDecline} loading={stepLoading} />
          )}

          {step === 'otp' && (
            <OtpStep mobile={attendee.mobile} onVerify={handleVerifyOtp} onResend={handleResendOtp} loading={stepLoading} error={stepError} />
          )}

          {step === 'personal' && (
            <PersonalDetailsStep formData={formData} onChange={handleChange} onNext={() => setStep('professional')} />
          )}

          {step === 'professional' && (
            <ProfessionalDetailsStep formData={formData} onChange={handleChange} onNext={() => setStep('review')} onBack={() => setStep('personal')} />
          )}

          {step === 'review' && (
            <ReviewStep formData={formData} onSubmit={handleFinalSubmit} onBack={() => setStep('professional')} loading={stepLoading} />
          )}

          {step === 'badge' && (
            <BadgeStep formData={formData} inviteId={inviteId} />
          )}

          {stepError && step !== 'otp' && (
            <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-4">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{stepError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
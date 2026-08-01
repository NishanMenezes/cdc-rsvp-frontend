import { Routes, Route } from 'react-router-dom';
import RSVPForm from './components/RSVPForm.jsx';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
        <p className="text-slate-400">Please check the invite link and try again.</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="text-center max-w-md px-6">
        <h1 className="text-3xl font-bold mb-3">Mumbai CDC 2026</h1>
        <p className="text-slate-400">
          Please use the unique RSVP link sent to your registered email address to confirm or update your attendance details.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp/:inviteId" element={<RSVPForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
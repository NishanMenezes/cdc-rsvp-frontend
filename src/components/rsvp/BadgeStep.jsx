import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

export default function BadgeStep({ formData, inviteId }) {
  const qrValue = JSON.stringify({
    inviteId,
    name: `${formData.firstName} ${formData.lastName}`,
    company: formData.company,
  });

  const handleDownload = () => {
    const svg = document.getElementById('badge-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 40, 40, 320, 320);
      const link = document.createElement('a');
      link.download = `${inviteId}-badge.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="text-center py-4">
      <div className="bg-gradient-to-br from-indigo-600 to-slate-900 rounded-2xl p-6 mb-6">
        <p className="text-indigo-200 text-xs font-medium mb-1">MUMBAI CDC 2026</p>
        <h2 className="text-white text-xl font-bold mb-1">{formData.firstName} {formData.lastName}</h2>
        <p className="text-indigo-200 text-sm mb-4">{formData.designation} · {formData.company}</p>
        <div className="bg-white rounded-lg p-4 inline-block">
          <QRCodeSVG id="badge-qr-code" value={qrValue} size={180} />
        </div>
        <p className="text-indigo-300 text-xs mt-3">Invite ID: {inviteId}</p>
      </div>

      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
      >
        <Download className="w-4 h-4" />
        Download Badge
      </button>
      <p className="text-slate-500 text-xs mt-3">Show this QR code at the event entrance.</p>
    </div>
  );
}
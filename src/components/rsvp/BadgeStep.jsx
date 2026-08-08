import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

export default function BadgeStep({ formData, inviteId }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [generating, setGenerating] = useState(false);

  const qrValue = JSON.stringify({
    inviteId,
    name: `${formData.firstName} ${formData.lastName}`,
    company: formData.company,
  });

  const generateImage = () => {
    return new Promise((resolve) => {
      const svg = document.getElementById('badge-qr-code');
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = 500;
        canvas.height = 500;
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(40, 40, 420, 420);
        ctx.drawImage(img, 60, 60, 380, 380);
        resolve(canvas.toDataURL('image/png'));
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    });
  };

  const handleShowSaveImage = async () => {
    setGenerating(true);
    const dataUrl = await generateImage();
    setImageUrl(dataUrl);
    setGenerating(false);
  };

  const handleShare = async () => {
    const dataUrl = imageUrl || (await generateImage());
    if (!imageUrl) setImageUrl(dataUrl);

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${inviteId}-badge.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mumbai CDC 2026 Badge',
        });
      } else {
        setImageUrl(dataUrl);
      }
    } catch (err) {
      setImageUrl(dataUrl);
    }
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

      {imageUrl && (
        <div className="mb-4">
          <img src={imageUrl} alt="Your badge" className="mx-auto rounded-xl border border-slate-700 max-w-[280px]" />
          <p className="text-slate-400 text-xs mt-2">Press and hold the image above, then choose "Save Image"</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleShowSaveImage}
          disabled={generating}
          className="flex-1 flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium py-3 rounded-lg transition disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          {generating ? 'Generating...' : 'Show Image to Save'}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition"
        >
          <Share2 className="w-4 h-4" />
          Share Badge
        </button>
      </div>

      <p className="text-slate-500 text-xs mt-4">Show this QR code at the event entrance.</p>
    </div>
  );
}
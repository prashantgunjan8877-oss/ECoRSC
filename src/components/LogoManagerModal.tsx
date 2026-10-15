import React, { useState, useRef } from 'react';
import { X, Upload, Check, RotateCcw, Image, Sparkles } from 'lucide-react';
import { ECORSCLogo } from './ECORSCLogo';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl: string;
  onSaveLogo: (url: string) => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({
  isOpen,
  onClose,
  currentLogoUrl,
  onSaveLogo,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentLogoUrl || '');
  const [customInputUrl, setCustomInputUrl] = useState<string>(
    currentLogoUrl.startsWith('data:') ? '' : currentLogoUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Logo file size should be less than 8 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPreviewUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApply = () => {
    onSaveLogo(previewUrl);
    onClose();
  };

  const handleResetToDefault = () => {
    setPreviewUrl('');
    setCustomInputUrl('');
    onSaveLogo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4.5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700 rounded-lg text-white">
              <Upload className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                संघ का लोगो बदलें (Change Union Logo)
              </h3>
              <p className="text-xs text-stone-400">
                Upload image from computer/mobile or choose standard emblem
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Live Logo Preview Box */}
          <div className="flex flex-col items-center justify-center bg-stone-50 border-2 border-stone-200 rounded-2xl p-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
              वर्तमान लोगो पूर्वावलोकन (Current Logo Preview)
            </span>
            <div className="w-28 h-28 rounded-2xl bg-white p-3 shadow-md border border-stone-200 flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Union Custom Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <ECORSCLogo size={90} />
              )}
            </div>
            <div className="mt-3 text-xs font-semibold text-stone-700">
              {previewUrl ? 'कस्टम लोगो चयनित (Custom Logo Loaded)' : 'मानक ईकोरएससी आधिकारिक लोगो (Default Official Logo)'}
            </div>
          </div>

          {/* Option 1: Direct File Upload from Device */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-800 block">
              1. मोबाइल या कंप्यूटर से सीधे फोटो/लोगो अपलोड करें:
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Upload className="w-4 h-4 text-amber-300" />
              <span>📁 फोटो चुनें (Choose Logo Image from Device)</span>
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              PNG, JPG, SVG, WEBP प्रारूप समर्थित हैं (अधिकतम 8 MB)
            </p>
          </div>

          {/* Option 2: Image URL */}
          <div className="space-y-1.5 pt-2 border-t border-stone-200">
            <label className="block text-xs font-bold text-stone-800">
              2. या इमेज लिंक (URL) दर्ज करें:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/union-logo.png"
                value={customInputUrl}
                onChange={(e) => {
                  setCustomInputUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
              />
              <button
                type="button"
                onClick={() => setPreviewUrl(customInputUrl)}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 cursor-pointer"
              >
                जांचें (Preview)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full sm:w-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>डिफ़ॉल्ट लोगो बहाल करें (Reset to Default)</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4 text-emerald-200" />
                <span>लोगो सुरक्षित करें (Save & Apply)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

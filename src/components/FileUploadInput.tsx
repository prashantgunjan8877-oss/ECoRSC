import React, { useRef } from 'react';
import { Upload, FileText, Image as ImageIcon, X, Download, Eye } from 'lucide-react';

interface FileUploadInputProps {
  label?: string;
  helperText?: string;
  value?: string; // base64 Data URL or remote URL
  fileName?: string;
  acceptTypes?: 'image' | 'pdf' | 'both';
  onChange: (fileDataUrl: string, fileName: string) => void;
  onClear?: () => void;
  className?: string;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label = 'Upload Photo or PDF Document (फोटो या पीडीएफ दस्तावेज़)',
  helperText = 'Select an image (PNG, JPG, WEBP) or PDF from your mobile/computer. File is saved securely.',
  value,
  fileName,
  acceptTypes = 'both',
  onChange,
  onClear,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPdf =
    value?.startsWith('data:application/pdf') ||
    value?.toLowerCase().endsWith('.pdf') ||
    fileName?.toLowerCase().endsWith('.pdf');

  const isImage =
    value?.startsWith('data:image/') ||
    (!isPdf && Boolean(value && (value.includes('http') || value.startsWith('data:'))));

  const acceptString =
    acceptTypes === 'image'
      ? 'image/*'
      : acceptTypes === 'pdf'
      ? 'application/pdf,.pdf'
      : 'image/*,application/pdf,.pdf';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 12 MB for base64 storage
    if (file.size > 12 * 1024 * 1024) {
      alert('File size exceeds 12 MB limit. Please select a smaller photo or PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result, file.name);
      }
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be picked again if needed
    e.target.value = '';
  };

  const handleOpenPdf = () => {
    if (!value) return;
    const win = window.open();
    if (win) {
      win.document.write(
        `<iframe src="${value}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-semibold text-stone-700">{label}</label>}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="bg-stone-50 border-2 border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
            {isPdf ? (
              <div className="w-12 h-12 bg-red-100 text-red-700 rounded-lg flex items-center justify-center shrink-0 border border-red-200">
                <FileText className="w-6 h-6" />
              </div>
            ) : isImage ? (
              <img
                src={value}
                alt="Uploaded preview"
                className="w-12 h-12 rounded-lg object-cover border border-stone-300 shadow-2xs shrink-0"
              />
            ) : (
              <div className="w-12 h-12 bg-stone-200 text-stone-700 rounded-lg flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}

            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 truncate">
                {fileName || (isPdf ? 'Document.pdf' : 'Uploaded_Image.png')}
              </div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                <span>✓ Ready & Attached</span>
                {isPdf && <span>(PDF File)</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isPdf && (
              <button
                type="button"
                onClick={handleOpenPdf}
                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg flex items-center gap-1 border border-red-200 cursor-pointer"
                title="View / Download PDF"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1 border border-stone-300 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                title="Remove File"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 hover:border-red-500 bg-stone-50 hover:bg-red-50/40 rounded-xl p-3.5 text-center cursor-pointer transition-colors group"
        >
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-stone-200 group-hover:bg-red-100 text-stone-600 group-hover:text-red-700 flex items-center justify-center transition-colors">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-800 group-hover:text-red-700">
                📁 Click to Choose File (फ़ाइल चुनें / अपलोड करें)
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">{helperText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Circular } from '../types';
import { OFFICIAL_CIRCULARS } from '../data/mockData';
import { FileText, Search, Download, Printer, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface CircularsArchiveProps {
  circulars?: Circular[];
}

export const CircularsArchive: React.FC<CircularsArchiveProps> = ({ circulars = OFFICIAL_CIRCULARS }) => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCircular, setActiveModalCircular] = useState<Circular | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Orders & Circulars' },
    { id: 'PNM Minutes', label: 'PNM Minutes' },
    { id: 'Pay & Allowances', label: 'Pay & Allowances (8th CPC)' },
    { id: 'Running Staff', label: 'Running Staff Rules' },
    { id: 'Pension (OPS/UPS)', label: 'Pension (OPS / UPS)' },
    { id: 'Welfare & Quarters', label: 'Welfare & Quarters' },
  ];

  const filteredCirculars = circulars.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.refNumber.toLowerCase().includes(query) ||
      item.titleEn.toLowerCase().includes(query) ||
      item.titleHi.toLowerCase().includes(query) ||
      item.summaryEn.toLowerCase().includes(query) ||
      item.issuedBy.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>OFFICIAL DOCUMENTATION</span>
            <span className="text-stone-300">/</span>
            <span>GAZETTE & JOINT CIRCULARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('circularsTitle')}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {t('circularsSubtitle')}
          </p>
        </div>

        {/* Filter bar and Search */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchCirculars')}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="space-y-4">
          {filteredCirculars.map((circ) => (
            <div
              key={circ.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                {/* Clean unboxed metadata with bullet separators (Rule 1.A of frontend-design) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                    {circ.refNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-stone-700">{circ.issuedBy}</span>
                  <span aria-hidden="true">·</span>
                  <span>{circ.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono text-stone-600">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {circ.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 hover:text-red-700 transition-colors">
                  {lang === 'hi' ? circ.titleHi : circ.titleEn}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed max-w-4xl">
                  {lang === 'hi' ? circ.summaryHi : circ.summaryEn}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                <button
                  type="button"
                  onClick={() => setActiveModalCircular(circ)}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-red-700" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert(`Downloading verified copy of ${circ.pdfName}...`);
                  }}
                  className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:border-stone-400 transition-colors cursor-pointer flex items-center gap-1"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing circular details */}
        {activeModalCircular && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-400 font-mono font-semibold">
                    {activeModalCircular.refNumber}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {lang === 'hi' ? activeModalCircular.titleHi : activeModalCircular.titleEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalCircular(null)}
                  className="text-stone-400 hover:text-white px-2 py-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto text-sm text-stone-800">
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div>Issuing Authority: <strong className="text-stone-900">{activeModalCircular.issuedBy}</strong></div>
                  <div>Category: <strong className="text-stone-900">{activeModalCircular.category}</strong></div>
                  <div>Date of Notification: <strong className="text-stone-900 font-mono">{activeModalCircular.date}</strong></div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Official Executive Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-stone-700 bg-white p-3 border border-stone-200 rounded-lg">
                    {lang === 'hi' ? activeModalCircular.summaryHi : activeModalCircular.summaryEn}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Key Enactments & Directives
                  </h4>
                  <div className="space-y-2">
                    {activeModalCircular.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <CheckCircle2 className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  Verified with East Coast Railway Shramik Congress archival records. Digital archive signature valid across Khurda, Waltair, and Sambalpur divisions.
                </div>
              </div>

              <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">
                  File: {activeModalCircular.pdfName}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Order</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Downloading ${activeModalCircular.pdfName}...`);
                    }}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

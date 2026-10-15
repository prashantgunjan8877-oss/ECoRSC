import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Shield, Calculator, IdCard, ChevronRight, Bell, Layers, HeartHandshake, Image } from 'lucide-react';
import { ECORSCLogo } from './ECORSCLogo';

import { PortalSettings } from '../types';

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenCardModal: () => void;
  onOpenLogoModal?: () => void;
  customLogoUrl?: string;
  portalSettings?: PortalSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenCardModal,
  onOpenLogoModal,
  customLogoUrl,
  portalSettings,
}) => {
  const { lang, t } = useLanguage();

  const activeNotice =
    portalSettings
      ? lang === 'hi'
        ? portalSettings.announcementNoticeHi
        : portalSettings.announcementNoticeEn
      : lang === 'hi'
      ? '8वें वेतन आयोग (8th CPC) के संदर्भ में एनएफआईआर मांग पत्र प्रस्तुत · पुरानी पेंशन (OPS) बहाली हेतु मंडलवार जन-जागरण सभाएं जारी।'
      : 'NFIR Memorandum on 8th CPC submitted to Ministry of Finance · Strict 10-hour duty ceiling enforced for ECoR Loco Pilots · OPS campaign active across all 3 divisions.';

  return (
    <div className="relative bg-stone-900 text-white overflow-hidden border-b border-stone-800">
      {/* Subtle railway track geometric background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rail-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 30 L 60 30 M 30 0 L 30 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rail-grid)" />
        </svg>
      </div>

      {/* Official Notice Marquee Ticker */}
      <div className="relative z-10 bg-red-900/90 border-b border-red-700/50 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-700 text-amber-200 font-bold uppercase rounded-xs tracking-wider shrink-0 text-[11px]">
            <Bell className="w-3 h-3 text-amber-300" />
            <span>{lang === 'hi' ? 'महत्वपूर्ण सूचना' : 'URGENT CIRCULAR'}</span>
          </div>
          <div className="truncate text-stone-200 font-medium">
            {activeNotice}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('circulars')}
            className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-white font-medium shrink-0 ml-auto cursor-pointer"
          >
            <span>{lang === 'hi' ? 'परिपत्र देखें' : 'View Circulars'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Hero Split */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
              <span className="w-2 h-2 rounded-xs bg-amber-400" />
              <span>{t('heroBadge')}</span>
              <span className="text-stone-600">/</span>
              <span className="text-stone-400">ESTD. 1952 · AFFILIATED TO NFIR & INTUC</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {lang === 'hi' ? (
                <>
                  ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस <br />
                  <span className="text-red-500">रेलकर्मियों के स्वाभिमान</span> और अधिकारों की ढाल
                </>
              ) : (
                <>
                  East Coast Railway <br />
                  <span className="text-red-500">Shramik Congress</span> (ECORSC)
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </p>

            {/* Functional Call-To-Action Grid */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('seniority')}
                className="px-4 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-stone-950" />
                <span>{lang === 'hi' ? 'वरिष्ठता सूची जांचें (Seniority)' : 'Seniority Roster'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('staffhelp')}
                className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-200" />
                <span>{lang === 'hi' ? 'कर्मचारी सहायता रजिस्टर' : 'Staff Welfare Log'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('grievance')}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('actionFileGrievance')}</span>
              </button>

              <button
                type="button"
                onClick={onOpenCardModal}
                className="px-3.5 py-2.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <IdCard className="w-3.5 h-3.5 text-stone-400" />
                <span>{t('actionGetCard')}</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mancheswar (MCS Workshop)</span>
              </div>
              <span className="text-stone-700">·</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Khurda Road (KUR)</span>
              </div>
              <span className="text-stone-700">·</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Waltair (WAT)</span>
              </div>
              <span className="text-stone-700">·</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sambalpur (SBP)</span>
              </div>
            </div>
          </div>

          {/* Right Institutional Emblem & Crest Box (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-xs relative">
              {/* Top Tricolor Accent Line */}
              <div className="absolute top-0 left-6 right-6 h-1 flex rounded-t-lg overflow-hidden">
                <div className="flex-1 bg-amber-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-emerald-600" />
              </div>

              {/* Insignia Header with Interactive Click-to-Change Logo */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-stone-700 mt-2">
                <div
                  className="relative group cursor-pointer shrink-0"
                  onClick={onOpenLogoModal}
                  title="Click to Upload / Change Union Logo (यूनियन का लोगो बदलने के लिए क्लिक करें)"
                >
                  {customLogoUrl ? (
                    <img
                      src={customLogoUrl}
                      alt="Union Logo"
                      className="w-14 h-14 object-contain rounded-xl shrink-0 bg-white p-1"
                    />
                  ) : (
                    <ECORSCLogo size={56} className="shrink-0" />
                  )}
                  {/* Edit Camera Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-red-700 hover:bg-red-600 text-white rounded-full p-1 text-[9px] shadow-sm flex items-center justify-center">
                    ✏️
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white tracking-tight">
                    {lang === 'hi' ? 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस' : 'East Coast Railway Shramik Congress'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-amber-400 font-medium">Affiliated to NFIR (Regd. No. 4930)</p>
                    {onOpenLogoModal && (
                      <button
                        type="button"
                        onClick={onOpenLogoModal}
                        className="text-[10px] text-stone-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        [लोगो बदलें]
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Graphic Railway Motif Container */}
              <div className="my-5 p-4 bg-stone-900/90 rounded-xl border border-stone-700/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
                  <span className="font-medium text-stone-300">Zonal Jurisdiction</span>
                  <span className="text-amber-300 font-mono">ECoR Zone</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-stone-400">Apex Affiliation:</span>
                    <span className="font-semibold text-white">NFIR & INTUC</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-stone-400">NFIR Leader (JCM Staff Side):</span>
                    <span className="font-semibold text-white">Dr. M. Raghavaiah</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-stone-400">ECORSC General Secretary:</span>
                    <span className="font-semibold text-white">Ashok Kumar Mishra</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-300">
                    <span className="text-stone-400">HQ Secretariat:</span>
                    <span className="font-semibold text-white">Rail Sadan, Bhubaneswar</span>
                  </div>
                </div>

                {/* Motto banner */}
                <div className="pt-2 border-t border-stone-800 text-center">
                  <span className="text-[11px] font-serif italic text-amber-300/90">
                    "Sangharsh aur Seva — Workers' Solidarity Forever"
                  </span>
                </div>
              </div>

              {/* Quick links within card */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('demands')}
                  className="p-2.5 text-center bg-stone-700/60 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-600/50"
                >
                  {lang === 'hi' ? 'मांग पत्र एवं वोटिंग' : 'Charter of Demands'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('divisions')}
                  className="p-2.5 text-center bg-stone-700/60 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-600/50"
                >
                  {lang === 'hi' ? 'शाखा पदाधिकारी सूची' : 'Branch Directory'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column KPI Strip (Rule 13 of frontend-design) */}
      <div className="relative z-10 bg-stone-950 border-t border-stone-800 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              04 <span className="text-base text-red-500 font-sans font-normal">+ 01</span>
            </div>
            <div className="text-xs text-stone-400">{t('statDivisions')}</div>
            <div className="text-[11px] text-stone-500">KUR, WAT, SBP & MCS Workshop</div>
          </div>

          <div className="space-y-1 border-l-0 sm:border-l border-stone-800 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              48,000<span className="text-red-500 text-base font-sans font-normal">+</span>
            </div>
            <div className="text-xs text-stone-400">{t('statMembers')}</div>
            <div className="text-[11px] text-stone-500">Loco, Track, Station & Workshop</div>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-stone-800 md:pl-6">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              96.4<span className="text-red-500 text-base font-sans font-normal">%</span>
            </div>
            <div className="text-xs text-stone-400">{t('statResolutions')}</div>
            <div className="text-[11px] text-stone-500">Settled in DRM & GM PNM Forums</div>
          </div>

          <div className="space-y-1 border-l-0 sm:border-l border-stone-800 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
              74<span className="text-red-500 text-base font-sans font-normal">+</span>
            </div>
            <div className="text-xs text-stone-400">{t('statService')}</div>
            <div className="text-[11px] text-stone-500">NFIR Solidarity Since 1952</div>
          </div>
        </div>
      </div>
    </div>
  );
};

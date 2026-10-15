import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Train, Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenCardModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCardModal }) => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Purpose (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-lg">
                <Train className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-tight">
                  {lang === 'hi'
                    ? 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस (ECORSC)'
                    : 'East Coast Railway Shramik Congress'}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Affiliated to NFIR (National Federation of Indian Railwaymen) & INTUC
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              {lang === 'hi'
                ? 'ईस्ट कोस्ट रेलवे के प्रत्येक रेलकर्मी के संवैधानिक अधिकारों, सेवा शर्तों, वेतन भत्तों एवं गरिमा की रक्षा हेतु समर्पित सर्वमान्य ट्रेड यूनियन।'
                : 'The premier recognized trade union of East Coast Railway, championing employee rights, OPS restoration, 8th Pay Commission, and running crew dignity across Khurda, Waltair, Sambalpur & Mancheswar Workshop.'}
            </p>

            <div className="text-xs text-stone-400 space-y-1.5 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Central Office: Rail Sadan, Chandrasekharpur, Bhubaneswar, Odisha - 751017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>Control Room: 0674-2303030 / +91 94371 99000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>gs.ecorsc@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Union Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('grievance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shram Samadhan Grievance Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  7th CPC Running & NDA Allowance Estimator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('circulars')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Zonal PNM Minutes & Joint Directives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('demands')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Charter of Demands & Voting
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCardModal}
                  className="hover:text-white transition-colors cursor-pointer text-amber-300"
                >
                  Generate Digital Membership E-Card
                </button>
              </li>
            </ul>
          </div>

          {/* Divisions (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Divisional Secretariats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <div className="p-2.5 bg-stone-800/80 rounded-lg border border-stone-800">
                <div className="font-semibold text-stone-200">Khurda Road (KUR)</div>
                <div className="text-[11px] text-stone-400">DRM Complex, Jatni</div>
              </div>
              <div className="p-2.5 bg-stone-800/80 rounded-lg border border-stone-800">
                <div className="font-semibold text-stone-200">Waltair (WAT)</div>
                <div className="text-[11px] text-stone-400">Dondaparthy, Vizag</div>
              </div>
              <div className="p-2.5 bg-stone-800/80 rounded-lg border border-stone-800">
                <div className="font-semibold text-stone-200">Sambalpur (SBP)</div>
                <div className="text-[11px] text-stone-400">Modipara, Sambalpur</div>
              </div>
              <div className="p-2.5 bg-stone-800/80 rounded-lg border border-stone-800">
                <div className="font-semibold text-stone-200">Mancheswar (MCS)</div>
                <div className="text-[11px] text-stone-400">POH Workshop Complex</div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Affiliated nationally with National Federation of Indian Railwaymen (NFIR), 166/1, P.K. Road, New Delhi.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>{t('copyright')}</div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Registration No: 4930 (Trade Unions Act)</span>
            <span>·</span>
            <span className="text-stone-400">Recognized by Railway Board</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

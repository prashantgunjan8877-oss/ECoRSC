import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneCall, ShieldAlert, X, Globe, Train, CheckCircle2, Edit2, PlusCircle, Wrench } from 'lucide-react';

import { ECORSCLogo } from './ECORSCLogo';
import { EmergencyContact } from '../types';
import { INITIAL_EMERGENCY_CONTACTS } from '../data/mockData';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenCardModal: () => void;
  onOpenLogoModal?: () => void;
  customLogoUrl?: string;
  emergencyContacts?: EmergencyContact[];
  onOpenEmergencyAdmin?: () => void;
  isOfficerLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onOpenCardModal,
  onOpenLogoModal,
  customLogoUrl,
  emergencyContacts = INITIAL_EMERGENCY_CONTACTS,
  onOpenEmergencyAdmin,
  isOfficerLoggedIn = false,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'seniority', label: lang === 'hi' ? 'वरिष्ठता सूची' : 'Seniority Roster' },
    { id: 'staffhelp', label: lang === 'hi' ? 'कर्मचारी सहायता' : 'Staff Welfare' },
    { id: 'employees', label: lang === 'hi' ? 'कर्मचारी डेटाबेस' : 'Staff Directory' },
    { id: 'grievance', label: t('navGrievance') },
    { id: 'calculator', label: t('navCalculators') },
    { id: 'circulars', label: t('navCirculars') },
    { id: 'divisions', label: t('navDivisions') },
    { id: 'admin', label: lang === 'hi' ? 'पदाधिकारी पोर्टल' : 'Officer Desk' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        {/* Top utility sub-strip for affiliation and language */}
        <div className="bg-stone-900 text-stone-300 text-xs py-1 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 tracking-wide font-medium">
              <span className="text-amber-400 font-semibold uppercase">{t('affiliatedWith')}</span>
              <span className="text-stone-600 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-stone-400">East Coast Railway Zone (ECoR)</span>
              {onOpenLogoModal && (
                <button
                  type="button"
                  onClick={onOpenLogoModal}
                  className="hidden md:inline-flex items-center gap-1 text-[11px] bg-red-800 hover:bg-red-700 text-amber-200 px-2 py-0.5 rounded cursor-pointer transition-colors ml-2"
                >
                  <span>📷 लोगो बदलें (Change Logo)</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-stone-400 hidden md:inline">{t('motto')}</span>
              <div className="flex items-center gap-1 border-l border-stone-700 pl-3">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <button
                  type="button"
                  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                  className="font-medium text-amber-300 hover:text-white transition-colors cursor-pointer text-xs"
                  aria-label="Toggle language"
                >
                  {lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Strict 3-Zone Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark with Official Union Logo & Direct Click-to-Change */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Direct Logo Click Container */}
            <div className="relative group cursor-pointer" onClick={onOpenLogoModal} title="Click to Change / Upload Logo (लोगो बदलने के लिए क्लिक करें)">
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="ECORSC Logo"
                  className="w-11 h-11 object-contain rounded-lg shrink-0 border border-amber-400/50 p-0.5 bg-white shadow-2xs"
                />
              ) : (
                <ECORSCLogo size={44} />
              )}
              {/* Hover badge to indicate click-to-change */}
              <div className="absolute -bottom-1 -right-1 bg-red-700 text-white rounded-full p-0.5 text-[9px] shadow-sm group-hover:scale-110 transition-transform">
                ✏️
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSection('home')}
              className="flex flex-col text-left focus:outline-hidden group cursor-pointer"
            >
              <span className="text-base sm:text-lg font-black tracking-tight text-stone-900 whitespace-nowrap leading-tight">
                ECORSC <span className="text-red-700 font-bold text-xs sm:text-sm">· NFIR</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium whitespace-nowrap">
                {lang === 'hi' ? 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस' : 'East Coast Railway Shramik Congress'}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 text-xs font-semibold text-stone-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-red-700 border-red-700 font-bold'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenCardModal}
              className="text-stone-600 hover:text-stone-900 border-b-2 border-transparent hover:border-stone-300 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer font-semibold"
            >
              {t('navMembership')}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowHelplineModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('emergencyHelpline')}</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Menu</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="h-0.5 w-full bg-stone-700 rounded-sm"></span>
                <span className="h-0.5 w-full bg-stone-700 rounded-sm"></span>
                <span className="h-0.5 w-full bg-stone-700 rounded-sm"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === item.id ? 'bg-red-50 text-red-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onOpenCardModal();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
            >
              {t('navMembership')}
            </button>
          </div>
        )}
      </header>

      {/* Emergency Helpline Modal */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-600 rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {lang === 'hi' ? '24x7 रेलकर्मी आपातकालीन सहायता डेस्क' : '24x7 Railwaymen Emergency Helpline'}
                  </h3>
                  <p className="text-xs text-stone-400">ECORSC Central Control Room · Rail Sadan, Bhubaneswar</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHelplineModal(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-stone-800 text-sm">
              <p className="text-xs text-stone-600">
                {lang === 'hi'
                  ? 'अत्यधिक ड्यूटी घंटे (10 घंटे से अधिक), कार्यस्थल दुर्घटना, रनिंग रूम विवाद अथवा अनुशासनात्मक उत्पीड़न की स्थिति में तुरंत संपर्क करें:'
                  : 'For urgent running staff duty ceiling violations (>10 hrs), workplace accidents, running room issues, or severe administrative harassment, contact immediately:'}
              </p>

              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 hover:border-red-300 transition-colors">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span>{contact.departmentOrRole}</span>
                      {contact.divisionOrCity && (
                        <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                          {contact.divisionOrCity}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-stone-900 text-base flex items-center justify-between mt-1">
                      <span>{contact.name}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                          className="text-xs px-2.5 py-1 bg-red-700 text-white rounded-md font-medium hover:bg-red-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{contact.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'hi'
                    ? 'सभी कॉल्स और शिकायतों की गोपनीयता पूर्ण रूप से सुरक्षित रखी जाती है।'
                    : 'Confidentiality of staff identity and statements is strictly protected under trade union privilege.'}
                </span>
              </div>
            </div>

            <div className="bg-stone-100 p-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setShowHelplineModal(false);
                  if (onOpenEmergencyAdmin) {
                    onOpenEmergencyAdmin();
                  } else {
                    setActiveSection('admin');
                  }
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit2 className="w-3.5 h-3.5 text-stone-950" />
                <span>
                  {lang === 'hi' ? '✏️ आपातकालीन नंबर/नाम बदलें (Edit Numbers)' : '✏️ Edit Names & Numbers'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowHelplineModal(false)}
                className="px-4 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

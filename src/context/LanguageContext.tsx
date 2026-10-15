import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar
    unionName: 'East Coast Railway Shramik Congress',
    unionAcronym: 'ECORSC',
    affiliatedWith: 'Affiliated to NFIR & INTUC',
    motto: 'Unity is Strength — Standing Resolute for Railwaymen',
    navGrievance: 'Grievance Portal',
    navCalculators: 'Pay & Allowance Calculator',
    navCirculars: 'Circulars & PNM',
    navDivisions: 'Divisions & Depots',
    navDemands: 'Charter & Voting',
    navMembership: 'Digital E-Card',
    emergencyHelpline: 'Emergency Union Helpdesk',

    // Hero
    heroBadge: 'Premier Recognized Trade Union of East Coast Railway',
    heroTitle: 'Defending the Rights, Dignity & Welfare of Every Railwayman',
    heroSubtitle:
      'East Coast Railway Shramik Congress (ECORSC), in unyielding alliance with the National Federation of Indian Railwaymen (NFIR), spearheads the fight for OPS, 8th Pay Commission, running staff dignity, fair promotions, and safer workplace conditions across Khurda Road, Waltair, Sambalpur, and Mancheswar Workshop.',
    actionFileGrievance: 'File Grievance Online',
    actionTrackGrievance: 'Track Complaint Status',
    actionCalculatePay: 'Calculate Allowances',
    actionGetCard: 'Download Digital ID',

    // Quick Stats
    statDivisions: 'Divisions & Workshop',
    statMembers: 'Dedicated Union Cadres',
    statResolutions: 'Grievance Resolution Rate',
    statService: 'Years of Undefeated Struggle',

    // Grievance Portal
    portalTitle: 'Shram Samadhan Grievance Redressal Portal',
    portalSubtitle:
      'Direct, encrypted submission to ECORSC Divisional Office Bearers and GM PNM committee delegates.',
    tabSubmit: 'File New Representation',
    tabTrack: 'Track Existing Grievance',
    labelEmpName: 'Employee Full Name',
    labelEmpNo: 'PF / UMID / HRMS ID No.',
    labelDesignation: 'Designation / Grade Pay',
    labelDivision: 'Division / Unit',
    labelStation: 'Station / Depot / Shop',
    labelDepartment: 'Railway Department',
    labelPhone: 'WhatsApp / Mobile Number',
    labelCategory: 'Grievance Subject Category',
    labelSubject: 'Specific Subject Line',
    labelDescription: 'Detailed Statement of Grievance',
    labelRelief: 'Concrete Relief / Redressal Demanded',
    btnSubmitGrievance: 'Submit Grievance to Union Secretariat',
    trackInputPlaceholder: 'Enter Tracking ID (e.g. ECORSC-WAT-2026-4891 or PF No.)',
    btnTrack: 'Search Record',

    // Calculator
    calcTitle: 'Railway Staff Allowance & Pay Estimator',
    calcSubtitle:
      'Calculated as per 7th CPC Railway Board establishment rules and latest Dearness Allowance (DA) revisions.',
    calcTabRunning: 'Running Staff (Loco / Guard)',
    calcTabNDA: 'Night Duty Allowance (NDA)',
    calcTabOTA: 'Overtime Allowance (OTA)',
    calcTabHRA: 'HRA & Transport Allowance',

    // Circulars
    circularsTitle: 'Official Union Circulars, PNM Minutes & Joint Directives',
    circularsSubtitle:
      'Authentic notifications issued by NFIR Central Executive, ECORSC Headquarters, and ECoR Administration.',
    searchCirculars: 'Search orders by keyword, reference no., or topic...',

    // Divisions
    divisionsTitle: 'Divisional Secretariats & Key Depots',
    divisionsSubtitle:
      'Dedicated union representatives stationed across East Coast Railway zones to represent employees at every DRM and branch level.',

    // Card
    cardTitle: 'Official ECORSC Digital Identity Card',
    cardSubtitle: 'Generate or verify your official union membership credentials with QR validation.',

    // Footer
    footerAffiliation: 'National Federation of Indian Railwaymen (NFIR) & INTUC',
    centralOffice: 'Central Office: Rail Sadan, Chandrasekharpur, Bhubaneswar, Odisha - 751017',
    unionPress: 'ECORSC Central Information Cell',
    copyright: '© 2026 East Coast Railway Shramik Congress (ECORSC). All rights reserved.',
  },
  hi: {
    // Top Bar
    unionName: 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस',
    unionAcronym: 'ईसीआरएससी',
    affiliatedWith: 'सम्बद्ध: एन.एफ.आई.आर. (NFIR) एवं इंटक (INTUC)',
    motto: 'एकता ही शक्ति है — रेलकर्मियों के हक की बुलंद आवाज',
    navGrievance: 'शिकायत निवारण (श्रम समाधान)',
    navCalculators: 'वेतन व भत्ता कैलकुलेटर',
    navCirculars: 'परिपत्र एवं पीएनएम',
    navDivisions: 'मंडल एवं डिपो',
    navDemands: 'मांग पत्र एवं रायशुमारी',
    navMembership: 'डिजिटल पहचान पत्र',
    emergencyHelpline: 'आपातकालीन यूनियन हेल्पलाइन',

    // Hero
    heroBadge: 'ईस्ट कोस्ट रेलवे का सर्वमान्य एवं मान्यता प्राप्त प्रमुख ट्रेड यूनियन',
    heroTitle: 'प्रत्येक रेलकर्मी के स्वाभिमान, अधिकार एवं सुरक्षा का संबल',
    heroSubtitle:
      'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस (ECORSC), ऑल इंडिया एनएफआईआर (NFIR) के नेतृत्व में पुरानी पेंशन योजना (OPS) की पूर्ण बहाली, 8वें वेतन आयोग के गठन, रनिंग स्टाफ के 10 घंटे ड्यूटी नियम एवं खुर्दा रोड, वाल्टेयर, संबलपुर और मांचेस्वर कारखाने के रेलकर्मियों के कल्याण हेतु सतत संघर्षरत है।',
    actionFileGrievance: 'ऑनलाइन शिकायत दर्ज करें',
    actionTrackGrievance: 'शिकायत की स्थिति जांचें',
    actionCalculatePay: 'भत्ते की गणना करें',
    actionGetCard: 'डिजिटल कार्ड बनाएं',

    // Quick Stats
    statDivisions: 'मंडल एवं वर्कशॉप',
    statMembers: 'समर्पित यूनियन सदस्य',
    statResolutions: 'शिकायत समाधान दर',
    statService: 'वर्षों का अविरल संघर्ष',

    // Grievance Portal
    portalTitle: 'श्रम समाधान: ऑनलाइन शिकायत एवं सहायता पोर्टल',
    portalSubtitle:
      'सीधे ईसीआरएससी मंडल पदाधिकारियों एवं जीएम पीएनएम वार्ता समिति तक अपनी समस्या पहुंचाएं।',
    tabSubmit: 'नई शिकायत / मांग पत्र भेजें',
    tabTrack: 'दर्ज शिकायत की स्थिति देखें',
    labelEmpName: 'कर्मचारी का पूरा नाम',
    labelEmpNo: 'पीएफ / यूएमआईडी / एचआरएमएस आईडी',
    labelDesignation: 'पदनाम / ग्रेड पे',
    labelDivision: 'मंडल / इकाई',
    labelStation: 'स्टेशन / डिपो / शॉप',
    labelDepartment: 'रेलवे विभाग',
    labelPhone: 'व्हाट्सएप / मोबाइल नंबर',
    labelCategory: 'शिकायत की श्रेणी',
    labelSubject: 'शिकायत का मुख्य विषय',
    labelDescription: 'समस्या का विस्तृत विवरण',
    labelRelief: 'वांछित राहत / समाधान',
    btnSubmitGrievance: 'यूनियन सचिवालय को प्रेषित करें',
    trackInputPlaceholder: 'ट्रैकिंग नंबर दर्ज करें (उदा. ECORSC-WAT-2026-4891 या PF No.)',
    btnTrack: 'विवरण खोजें',

    // Calculator
    calcTitle: 'रेलवे भत्ता एवं वेतन कैलकुलेटर',
    calcSubtitle: '7वें वेतन आयोग एवं रेलवे बोर्ड के अद्यतन नियमों के अनुसार सटीक गणना।',
    calcTabRunning: 'रनिंग स्टाफ (लोको / गार्ड)',
    calcTabNDA: 'रात्रि ड्यूटी भत्ता (NDA)',
    calcTabOTA: 'ओवरटाइम भत्ता (OTA)',
    calcTabHRA: 'मकान किराया व यात्रा भत्ता',

    // Circulars
    circularsTitle: 'आधिकारिक परिपत्र, पीएनएम कार्यवृत्त एवं आदेश',
    circularsSubtitle: 'एनएफआईआर केंद्रीय मुख्यालय, ईसीआरएससी एवं रेलवे प्रशासन द्वारा जारी नीतिगत दस्तावेज।',
    searchCirculars: 'शीर्षक, संदर्भ संख्या या कीवर्ड से खोजें...',

    // Divisions
    divisionsTitle: 'मंडल सचिवालय एवं प्रमुख डिपो',
    divisionsSubtitle: 'ईस्ट कोस्ट रेलवे के हर स्टेशन और कार्यस्थल पर आपकी सेवा में तत्पर हमारे पदाधिकारी।',

    // Card
    cardTitle: 'ईसीआरएससी डिजिटल सदस्यता पहचान पत्र',
    cardSubtitle: 'अपना आधिकारिक ई-सदस्यता पहचान पत्र बनाएं अथवा क्यूआर कोड द्वारा सत्यापन करें।',

    // Footer
    footerAffiliation: 'नेशनल फेडरेशन ऑफ इंडियन रेलवेमेन (NFIR) एवं इंटक (INTUC)',
    centralOffice: 'केंद्रीय कार्यालय: रेल सदन, चंद्रशेखरपुर, भुवनेश्वर, ओडिशा - 751017',
    unionPress: 'ईसीआरएससी केंद्रीय सूचना प्रकोष्ठ',
    copyright: '© 2026 ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस (ECORSC). सर्वाधिकार सुरक्षित।',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ecorsc_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ecorsc_lang', lang);
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

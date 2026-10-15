import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DepartmentType, DivisionId, EmployeeRecord } from '../types';
import {
  IdCard,
  Printer,
  CheckCircle,
  Train,
  Shield,
  QrCode,
  X,
  Upload,
  Stamp,
  Award,
  ShieldCheck,
  CheckCheck,
  FileCheck,
} from 'lucide-react';
import { ECORSCLogo } from './ECORSCLogo';

interface MembershipCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmployeeData?: EmployeeRecord | null;
  customLogoUrl?: string;
  isOfficerLoggedIn?: boolean;
}

export const MembershipCardModal: React.FC<MembershipCardModalProps> = ({
  isOpen,
  onClose,
  initialEmployeeData,
  customLogoUrl,
  isOfficerLoggedIn = true,
}) => {
  const { lang } = useLanguage();

  const [fullName, setFullName] = useState('Prashant Gunjan');
  const [employeePfNumber, setEmployeePfNumber] = useState('PF532981109');
  const [hrmsId, setHrmsId] = useState('ECOR7821');
  const [designation, setDesignation] = useState('Senior Assistant Loco Pilot');
  const [division, setDivision] = useState<DivisionId>('MCS');
  const [station, setStation] = useState('Bogie Shop, Mancheswar Workshop');
  const [department, setDepartment] = useState<string>('Store & Workshop');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [phone, setPhone] = useState('+91 94371 88770');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [unionPost, setUnionPost] = useState<string>('शाखा सचिव (Branch Secretary)');
  const [cardNumber4Digit, setCardNumber4Digit] = useState<string>('1024');
  const [cardTheme, setCardTheme] = useState<'tricolor' | 'classic'>('tricolor');

  // Dual Approval & Signatures state:
  // Branch Secretary, ECoRSC MCS
  const [branchSecyApproved, setBranchSecyApproved] = useState(true);
  const [branchSecySignDate, setBranchSecySignDate] = useState('2026-10-15');
  const [branchSecyName, setBranchSecyName] = useState('Comrade Debabrata Behera');

  // General Secretary, ECoRSC (Central)
  const [generalSecyApproved, setGeneralSecyApproved] = useState(true);
  const [generalSecySignDate, setGeneralSecySignDate] = useState('2026-10-15');
  const [generalSecyName, setGeneralSecyName] = useState('Comrade Ashok Kumar Mishra');

  const photoInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialEmployeeData) {
      setFullName(initialEmployeeData.fullName);
      setEmployeePfNumber(initialEmployeeData.pfNumber);
      setHrmsId(initialEmployeeData.hrmsId);
      setDesignation(initialEmployeeData.designation);
      setDivision(initialEmployeeData.division);
      setStation(initialEmployeeData.station);
      setDepartment(initialEmployeeData.department);
      setBloodGroup(initialEmployeeData.bloodGroup);
      setPhone(initialEmployeeData.mobile);
      if (initialEmployeeData.unionPost) {
        setUnionPost(initialEmployeeData.unionPost);
      }
      if (initialEmployeeData.cardNumber4Digit) {
        setCardNumber4Digit(initialEmployeeData.cardNumber4Digit);
      }
      if (initialEmployeeData.photoUrl) {
        setPhotoUrl(initialEmployeeData.photoUrl);
      }
    }
  }, [initialEmployeeData]);

  if (!isOpen) return null;

  const membershipNo = `ECORSC-${division}-${cardNumber4Digit || employeePfNumber.slice(-4) || '7840'}`;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setPhotoUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700 rounded-lg text-white">
              <IdCard className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'hi'
                  ? 'ईकोरएससी डिजिटल सदस्यता पहचान पत्र (दोहरा हस्ताक्षर अधिकृत)'
                  : 'ECORSC Digital Membership Pass (Dual Secretarial Certification)'}
              </h3>
              <p className="text-xs text-stone-400">
                Official Certification by Branch Secretary ECoRSC MCS & General Secretary ECoRSC
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

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls: Particulars & Signature Authority (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-stone-50 p-5 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Member Particulars
              </h4>
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="text-xs text-red-700 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>फोटो अपलोड करें (Photo)</span>
              </button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">PF / PRAN No.</label>
                <input
                  type="text"
                  value={employeePfNumber}
                  onChange={(e) => setEmployeePfNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">HRMS ID</label>
                <input
                  type="text"
                  value={hrmsId}
                  onChange={(e) => setHrmsId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Division</label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value as DivisionId)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-semibold"
                >
                  <option value="MCS">Mancheswar (MCS)</option>
                  <option value="WAT">Waltair (WAT)</option>
                  <option value="KUR">Khurda Road (KUR)</option>
                  <option value="SBP">Sambalpur (SBP)</option>
                  <option value="HQ">Zonal HQ (BBS)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Blood Group</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-bold text-red-600"
                />
              </div>
            </div>

            {/* 4-Digit Card Number & Union Post */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  4-अंकीय कार्ड सं. (Card No.) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={cardNumber4Digit}
                  onChange={(e) => setCardNumber4Digit(e.target.value)}
                  placeholder="e.g. 1024"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  कार्ड बैकग्राउंड थीम (Theme)
                </label>
                <select
                  value={cardTheme}
                  onChange={(e) => setCardTheme(e.target.value as any)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900 font-bold text-amber-800"
                >
                  <option value="tricolor">🇮🇳 तिरंगा (Tricolor)</option>
                  <option value="classic">🚂 रेलवे क्लासिक (Maroon)</option>
                </select>
              </div>
            </div>

            {/* Union Post (यूनियन पद) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-red-700">
                  यूनियन पद (Union Post Designation) *
                </label>
                <span className="text-[10px] text-stone-500">कार्ड पर अंकित होगा</span>
              </div>
              <input
                type="text"
                value={unionPost}
                onChange={(e) => setUnionPost(e.target.value)}
                placeholder="e.g. शाखा सचिव / Branch Secretary, दुकान प्रतिनिधि"
                className="w-full px-3 py-1.5 text-xs bg-white border border-red-300 focus:border-red-600 rounded-md text-stone-900 font-bold"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  'शाखा सचिव',
                  'संयुक्त सचिव',
                  'दुकान प्रतिनिधि',
                  'कार्यकारी सदस्य',
                  'युवा संयोजक',
                  'सक्रिय साथी',
                ].map((postSuggestion) => (
                  <button
                    key={postSuggestion}
                    type="button"
                    onClick={() => setUnionPost(postSuggestion)}
                    className="text-[10px] bg-stone-200 hover:bg-red-100 text-stone-800 hover:text-red-800 px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    +{postSuggestion}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Shop / Station / Depot</label>
              <input
                type="text"
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md text-stone-900"
              />
            </div>

            {/* DUAL SIGNATURE APPROVAL CONTROLS */}
            <div className="pt-3 border-t-2 border-amber-300 space-y-3 bg-amber-50/60 p-3.5 rounded-xl border">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <Stamp className="w-4 h-4 text-amber-700" />
                <span>डिजिटल हस्ताक्षर व अनुमोदन नियंत्रण (Secretarial Signatures)</span>
              </div>
              <p className="text-[11px] text-stone-600">
                कार्ड केवल तभी पूर्णतः मान्य होता है जब दोनों पदाधिकारियों के हस्ताक्षर अंकित हों।
              </p>

              {/* Authority 1: Branch Secretary ECoRSC MCS */}
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">
                    1. Branch Secretary, ECoRSC MCS
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={branchSecyApproved}
                      onChange={(e) => setBranchSecyApproved(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {branchSecyApproved ? 'अनुमोदित (Signed)' : 'लंबित (Pending)'}
                    </span>
                  </label>
                </div>
                <input
                  type="text"
                  value={branchSecyName}
                  onChange={(e) => setBranchSecyName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-stone-300 rounded text-stone-800"
                  placeholder="Officer Name"
                />
              </div>

              {/* Authority 2: General Secretary ECoRSC (Central) */}
              <div className="bg-white p-2.5 rounded-lg border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">
                    2. General Secretary, ECoRSC (HQ)
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={generalSecyApproved}
                      onChange={(e) => setGeneralSecyApproved(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {generalSecyApproved ? 'अनुमोदित (Signed)' : 'लंबित (Pending)'}
                    </span>
                  </label>
                </div>
                <input
                  type="text"
                  value={generalSecyName}
                  onChange={(e) => setGeneralSecyName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border border-stone-300 rounded text-stone-800"
                  placeholder="General Secretary Name"
                />
              </div>

              {/* Master 1-Click Both Signatures */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setBranchSecyApproved(true);
                    setGeneralSecyApproved(true);
                  }}
                  className="flex-1 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>दोनों हस्ताक्षर प्रमाणित करें (Sign Both)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Official Printable Digital E-Pass (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Digital Card Live Preview</span>
              <div className="flex items-center gap-2">
                {branchSecyApproved && generalSecyApproved ? (
                  <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Dual Certified & Approved</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono text-amber-700 flex items-center gap-1 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                    <span>Awaiting Signature Verification</span>
                  </span>
                )}
              </div>
            </div>

            {/* The Physical Card Container with Tricolor Background */}
            <div
              id="ecorsc-id-card-print"
              className={`text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all ${
                cardTheme === 'tricolor'
                  ? 'bg-gradient-to-b from-[#e65100] via-stone-950 to-[#1b5e20] border-3 border-amber-400'
                  : 'bg-gradient-to-br from-stone-900 via-stone-900 to-red-950 border-2 border-amber-500/50'
              }`}
            >
              {/* National Indian Tricolor Header Banner */}
              <div className="absolute top-0 left-0 right-0 h-2 flex shadow-sm">
                <div className="flex-1 bg-[#ff9933]" />
                <div className="flex-1 bg-white relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full border border-blue-900 bg-blue-900" />
                </div>
                <div className="flex-1 bg-[#138808]" />
              </div>

              {/* Watermark in background */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <Train className="w-64 h-64 text-white" />
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/20 relative z-10">
                <div className="flex items-center gap-3">
                  {customLogoUrl ? (
                    <img
                      src={customLogoUrl}
                      alt="Union Logo"
                      className="w-13 h-13 object-contain rounded-lg shrink-0 bg-white p-1 shadow-md"
                    />
                  ) : (
                    <div className="bg-white p-1 rounded-xl shadow-md shrink-0">
                      <ECORSCLogo size={46} className="shrink-0" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded">
                        🇮🇳 OFFICIAL DIGITAL CADRE PASS
                      </span>
                      {cardNumber4Digit && (
                        <span className="text-[10px] font-mono font-extrabold text-white bg-red-700 px-2 py-0.5 rounded border border-amber-300">
                          CARD #{cardNumber4Digit}
                        </span>
                      )}
                    </div>
                    <h5 className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight mt-0.5">
                      EAST COAST RAILWAY SHRAMIK CONGRESS
                    </h5>
                    <p className="text-[11px] text-amber-300 font-semibold">
                      AFFILIATED TO NFIR & INTUC · REGD. NO. 4930
                    </p>
                    <span className="text-[10px] text-stone-200 block">
                      Mancheswar Carriage Workshop & Zonal Cadre Pass
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative z-10">
                {/* Photo / Avatar (4 cols) */}
                <div className="sm:col-span-4 flex flex-col items-center">
                  <div className="w-26 h-30 rounded-xl bg-stone-900 border-2 border-amber-400 flex flex-col items-center justify-center p-1 text-center shadow-lg overflow-hidden relative group">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={fullName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full bg-stone-800">
                        <div className="w-12 h-12 rounded-full bg-red-900 text-amber-300 flex items-center justify-center font-bold text-lg mb-1 shadow-inner">
                          {fullName ? fullName.charAt(0) : 'E'}
                        </div>
                        <span className="text-[10px] text-stone-300 truncate w-full px-1 font-medium">
                          {fullName || 'Railwayman'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 mt-1.5 font-bold bg-black/50 px-2 py-0.5 rounded">
                    No: {membershipNo}
                  </span>
                </div>

                {/* Details (8 cols) */}
                <div className="sm:col-span-8 space-y-2 text-xs">
                  <div>
                    <div className="text-[10px] text-amber-200 uppercase font-semibold">Cardholder Name & Union Post</div>
                    <div className="text-base font-extrabold text-white tracking-wide">{fullName}</div>
                    {/* Union Post Golden Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-stone-950 font-extrabold text-xs shadow-md mt-1 border border-amber-200">
                      <Award className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                      <span>यूनियन पद: {unionPost || 'सक्रिय सदस्य'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">Railway Designation</div>
                      <div className="font-semibold text-white">{designation}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">Shop / Unit / Station</div>
                      <div className="font-bold text-amber-300">{station}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">PF Number</div>
                      <div className="font-mono text-white font-semibold">{employeePfNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">HRMS ID</div>
                      <div className="font-mono text-white font-semibold">{hrmsId}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">Blood Grp</div>
                      <div className="font-extrabold text-red-300 bg-red-950/60 px-1.5 py-0.5 rounded inline-block">
                        {bloodGroup}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-300 uppercase">Division & Department</div>
                    <div className="font-medium text-stone-100">
                      {department} · <span className="text-amber-300 font-bold">{division} Division</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DUAL OFFICIAL SIGNATURE BAR (Branch Secy MCS & General Secy ECoRSC) */}
              <div className="pt-3 border-t border-white/20 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center relative z-10">
                {/* QR Code (3 cols) */}
                <div className="sm:col-span-3 flex items-center gap-2">
                  <div className="p-1 bg-white rounded-md text-stone-900 shrink-0">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-[9px] text-stone-300">Dual Verified</div>
                    <span className="text-amber-300 font-mono text-[8px] block font-bold">
                      ecorsc.org/v/{cardNumber4Digit || 'PASS'}
                    </span>
                  </div>
                </div>

                {/* Signature 1: Branch Secretary ECoRSC MCS (4 cols) */}
                <div className={`sm:col-span-4 p-2 rounded-lg border text-center ${
                  branchSecyApproved ? 'bg-black/40 border-amber-400/60' : 'bg-red-950/60 border-red-500'
                }`}>
                  {branchSecyApproved ? (
                    <div>
                      <div className="font-serif italic text-amber-300 text-xs font-semibold leading-tight">
                        {branchSecyName}
                      </div>
                      <div className="text-[8px] text-stone-200 font-bold uppercase mt-0.5">
                        Branch Secretary, ECoRSC MCS
                      </div>
                      <div className="text-[8px] font-mono text-emerald-400 flex items-center justify-center gap-1 mt-0.5 font-bold">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>MCS SEAL: VALID & SIGNED</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[9px] text-red-300 italic py-1 font-semibold">
                      [हस्ताक्षर लंबित - Branch Secy MCS]
                    </div>
                  )}
                </div>

                {/* Signature 2: General Secretary ECoRSC Central (5 cols) */}
                <div className={`sm:col-span-5 p-2 rounded-lg border text-center ${
                  generalSecyApproved ? 'bg-black/40 border-amber-400/60' : 'bg-red-950/60 border-red-500'
                }`}>
                  {generalSecyApproved ? (
                    <div>
                      <div className="font-serif italic text-amber-300 text-xs font-semibold leading-tight">
                        {generalSecyName}
                      </div>
                      <div className="text-[8px] text-stone-200 font-bold uppercase mt-0.5">
                        General Secretary, ECoRSC (NFIR)
                      </div>
                      <div className="text-[8px] font-mono text-emerald-400 flex items-center justify-center gap-1 mt-0.5 font-bold">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>HQ APEX SEAL: CERTIFIED</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[9px] text-red-300 italic py-1 font-semibold">
                      [हस्ताक्षर लंबित - General Secy ECoRSC]
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Verification Status Warning when not approved */}
            {(!branchSecyApproved || !generalSecyApproved) && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-semibold flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>सत्यापन आवश्यक:</strong> डिजिटल कार्ड केवल तभी बनेगा व डाउनलोड होगा जब <strong>Branch Secretary ECoRSC MCS</strong> एवं <strong>General Secretary ECoRSC</strong> दोनों अधिकृत अधिकारियों द्वारा हस्ताक्षरित व अनुमोदित हो।
                </span>
              </div>
            )}

            {/* Print / Download Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500">
                Official E-Card recognized under Railway Board Establishment Code
              </span>
              <button
                type="button"
                disabled={!branchSecyApproved || !generalSecyApproved}
                onClick={() => {
                  if (!branchSecyApproved || !generalSecyApproved) {
                    alert('कृपया पहले दोनों अधिकारियों (Branch Secretary MCS व General Secretary) द्वारा सत्यापन व हस्ताक्षर करें!');
                    return;
                  }
                  window.print();
                }}
                className={`w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-md transition-all ${
                  branchSecyApproved && generalSecyApproved
                    ? 'bg-red-700 hover:bg-red-800 cursor-pointer'
                    : 'bg-stone-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>
                  {branchSecyApproved && generalSecyApproved
                    ? 'कार्ड प्रिंट / डाउनलोड करें (Print Certified Card)'
                    : 'अनुमोदन लंबित (Approval Pending)'}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

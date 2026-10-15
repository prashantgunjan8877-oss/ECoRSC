import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  DepartmentType,
  DivisionId,
  GrievanceCategory,
  GrievanceRecord,
} from '../types';
import {
  CheckCircle2,
  Clock,
  Search,
  Send,
  FileCheck2,
  AlertCircle,
  Copy,
  Printer,
  ChevronRight,
} from 'lucide-react';

interface GrievancePortalProps {
  grievances: GrievanceRecord[];
  onAddGrievance: (record: GrievanceRecord) => void;
}

export const GrievancePortal: React.FC<GrievancePortalProps> = ({
  grievances,
  onAddGrievance,
}) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [division, setDivision] = useState<DivisionId>('WAT');
  const [station, setStation] = useState('');
  const [department, setDepartment] = useState<DepartmentType>('Operating');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<GrievanceCategory>('Running Staff & Loco Pilots');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [reliefSought, setReliefSought] = useState('');

  // Submission result modal
  const [newlyCreatedTicket, setNewlyCreatedTicket] = useState<GrievanceRecord | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<'ALL' | DivisionId>('ALL');
  const [activeDetailTicket, setActiveDetailTicket] = useState<GrievanceRecord | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !employeeNo || !subject || !description) {
      alert('Please fill all mandatory fields (Name, PF/HRMS ID, Subject, Description).');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `ECORSC-${division}-2026-${randomSuffix}`;

    const newRecord: GrievanceRecord = {
      id: `gr-${Date.now()}`,
      trackingNumber,
      submittedAt: new Date().toISOString().split('T')[0],
      applicantName,
      employeeNo,
      designation: designation || 'Railway Employee',
      division,
      station: station || 'Division Depot',
      department,
      phone: phone || '+91 Mobile',
      category,
      subject,
      description,
      reliefSought: reliefSought || 'Expeditious redressal through ECORSC Divisional Office.',
      status: 'Submitted',
      assignedOfficer:
        division === 'WAT'
          ? 'Comrade K. S. Murthy (Divisional Secy, WAT)'
          : division === 'KUR'
          ? 'Comrade Ashok K. Pattnaik (Divisional Secy, KUR)'
          : division === 'SBP'
          ? 'Comrade R. K. Patra (Divisional Secy, SBP)'
          : division === 'MCS'
          ? 'Comrade Debabrata Behera (Workshop Secy, MCS)'
          : 'Comrade Ashok Kumar Mishra (General Secy, HQ)',
      remarks: [
        `Grievance registered digitally on ${new Date().toLocaleDateString('en-IN')}. Assigned to divisional committee for immediate scrutiny.`,
      ],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    onAddGrievance(newRecord);
    setNewlyCreatedTicket(newRecord);

    // Reset Form
    setApplicantName('');
    setEmployeeNo('');
    setDesignation('');
    setStation('');
    setPhone('');
    setSubject('');
    setDescription('');
    setReliefSought('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredGrievances = grievances.filter((g) => {
    const matchesDiv = selectedDivisionFilter === 'ALL' || g.division === selectedDivisionFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      g.trackingNumber.toLowerCase().includes(query) ||
      g.employeeNo.toLowerCase().includes(query) ||
      g.applicantName.toLowerCase().includes(query) ||
      g.subject.toLowerCase().includes(query) ||
      g.station.toLowerCase().includes(query);
    return matchesDiv && matchesQuery;
  });

  return (
    <div className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
            <span>{lang === 'hi' ? 'श्रमिक समाधान मंच' : 'EMPLOYEE WELFARE CELL'}</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500">PNM & JCM FORUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {t('portalTitle')}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-stone-600">
            {t('portalSubtitle')}
          </p>
        </div>

        {/* Tab Switcher - Segmented Control */}
        <div className="inline-flex p-1 bg-stone-200 rounded-lg mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'submit'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t('tabSubmit')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'track'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t('tabTrack')} ({grievances.length})
          </button>
        </div>

        {/* TAB 1: SUBMISSION FORM */}
        {activeTab === 'submit' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelEmpName')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Das"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelEmpNo')} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeNo}
                    onChange={(e) => setEmployeeNo(e.target.value)}
                    placeholder="e.g. PF532109845 / HRMS ID"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelDesignation')}
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Loco Pilot (Goods) / Tech-II / SSE"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelDivision')} <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as DivisionId)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  >
                    <option value="WAT">Waltair Division (WAT)</option>
                    <option value="KUR">Khurda Road Division (KUR)</option>
                    <option value="SBP">Sambalpur Division (SBP)</option>
                    <option value="MCS">Mancheswar Workshop (MCS)</option>
                    <option value="HQ">Zonal Headquarters (Rail Sadan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelStation')}
                  </label>
                  <input
                    type="text"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    placeholder="e.g. Visakhapatnam / Cuttack / Rayagada"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelDepartment')}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as DepartmentType)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  >
                    <option value="Operating">Operating (Traffic/Running)</option>
                    <option value="Mechanical">Mechanical (C&W / Diesel)</option>
                    <option value="Electrical (TRD/TRS)">Electrical (TRD / TRS / General)</option>
                    <option value="Civil Engineering (Track)">Civil Engineering (Track / Works)</option>
                    <option value="Signal & Telecom (S&T)">Signal & Telecom (S&T)</option>
                    <option value="Commercial">Commercial (Ticket / Goods)</option>
                    <option value="Store & Workshop">Store & Workshop</option>
                    <option value="Medical & Health">Medical & Health</option>
                    <option value="Accounts & Personnel">Accounts & Personnel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelPhone')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 94370 00000"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('labelCategory')} <span className="text-red-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GrievanceCategory)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900 font-medium"
                >
                  <option value="Running Staff & Loco Pilots">Running Staff & Loco Pilots (Duty hours, Running Room, AC Cabs, Rest)</option>
                  <option value="Transfer & Mutual Relocation">Transfer & Mutual Relocation (NOC release, Inter-divisional, Spousal)</option>
                  <option value="MACP, Seniority & Promotion">MACP, Seniority, LDCE & Promotion Fixation</option>
                  <option value="Railway Quarters & Maintenance">Railway Quarters Allotment & Civil/Electrical Maintenance</option>
                  <option value="Overtime (OTA) & Night Duty (NDA)">Overtime Allowance (OTA) & Night Duty Allowance (NDA) Arrears</option>
                  <option value="Medical Claims & Railway Hospitals">Medical Claims, UMID Card & Divisional Hospital Referral</option>
                  <option value="Safety, Harsh Conditions & Tools">Safety Equipment, Protective Boots, Trackman Safety, Tools</option>
                  <option value="Disciplinary, DAR & Rule 9/11">Disciplinary Proceedings (DAR), Major/Minor Penalty Representation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('labelSubject')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Arbitrary denial of 10-hour duty relief at Rayagada outer signal / Pending 3rd MACP fixation"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelDescription')} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide specific facts, dates, train numbers, depot location, or previous representations made to administration..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('labelRelief')}
                  </label>
                  <textarea
                    rows={4}
                    value={reliefSought}
                    onChange={(e) => setReliefSought(e.target.value)}
                    placeholder="State exactly what decision, order, refund, or intervention you request the union to take up in the DRM/GM PNM..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
                <div className="text-xs text-stone-500">
                  <span>Guaranteed review under NFIR & ECORSC Trade Union Charter.</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{t('btnSubmitGrievance')}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: TRACK & SEARCH GRIEVANCES */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('trackInputPlaceholder')}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:bg-white"
                />
              </div>

              {/* Division Filter Segmented Control */}
              <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-100 rounded-lg shrink-0">
                {(['ALL', 'KUR', 'WAT', 'SBP', 'MCS', 'HQ'] as const).map((div) => (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setSelectedDivisionFilter(div)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      selectedDivisionFilter === div
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {div === 'ALL' ? 'All Divisions' : div}
                  </button>
                ))}
              </div>
            </div>

            {/* Grievances List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredGrievances.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-stone-200 text-stone-500">
                  <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm font-medium">No grievances matching your query.</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching by PF Number or Tracking ID.</p>
                </div>
              ) : (
                filteredGrievances.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                          {item.trackingNumber}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-600 font-medium">{item.division} Division</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500">{item.station}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500">{item.submittedAt}</span>
                      </div>

                      {/* Clean Unboxed Status Label as per frontend-design */}
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'Resolved'
                              ? 'bg-emerald-600'
                              : item.status === 'Taken up in PNM / Administration'
                              ? 'bg-blue-600'
                              : item.status === 'Action Initiated'
                              ? 'bg-amber-600'
                              : 'bg-stone-500'
                          }`}
                        />
                        <span
                          className={
                            item.status === 'Resolved'
                              ? 'text-emerald-700'
                              : item.status === 'Taken up in PNM / Administration'
                              ? 'text-blue-700'
                              : item.status === 'Action Initiated'
                              ? 'text-amber-700'
                              : 'text-stone-700'
                          }
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 space-y-2">
                      <h4 className="text-base font-semibold text-stone-900">{item.subject}</h4>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <span>Applicant: <strong className="text-stone-800">{item.applicantName}</strong> ({item.designation})</span>
                          <span className="text-stone-300">·</span>
                          <span className="font-mono">{item.employeeNo}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveDetailTicket(item)}
                          className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 font-semibold cursor-pointer"
                        >
                          <span>View Full Record & Minutes</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Detailed Modal View of Grievance */}
        {activeDetailTicket && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-400 font-mono font-semibold">
                    {activeDetailTicket.trackingNumber}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {activeDetailTicket.subject}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDetailTicket(null)}
                  className="text-stone-400 hover:text-white px-2 py-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto text-sm text-stone-800">
                {/* Meta details definition list */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 block">Applicant</span>
                    <strong className="text-stone-900 font-medium">{activeDetailTicket.applicantName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">PF / HRMS ID</span>
                    <strong className="font-mono text-stone-900 font-medium">{activeDetailTicket.employeeNo}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Division & Station</span>
                    <strong className="text-stone-900 font-medium">{activeDetailTicket.division} / {activeDetailTicket.station}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Current Status</span>
                    <span className="font-semibold text-red-700">{activeDetailTicket.status}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Statement of Facts
                  </h5>
                  <p className="text-xs leading-relaxed text-stone-700 bg-white p-3 border border-stone-200 rounded-lg">
                    {activeDetailTicket.description}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Relief Demanded from Administration
                  </h5>
                  <p className="text-xs leading-relaxed text-stone-700 bg-white p-3 border border-stone-200 rounded-lg">
                    {activeDetailTicket.reliefSought}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Union Intervention & PNM Action Log
                  </h5>
                  <div className="space-y-2">
                    <div className="text-xs text-stone-600">
                      Officer-in-Charge: <strong className="text-stone-900">{activeDetailTicket.assignedOfficer}</strong>
                    </div>
                    {activeDetailTicket.remarks.map((remark, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                        <Clock className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                        <span>{remark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Last updated: {activeDetailTicket.lastUpdated}
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal when new ticket is created */}
        {newlyCreatedTicket && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-stone-200 p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck2 className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Grievance Successfully Registered
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Your petition has been securely routed to the ECORSC Secretariat. Save your tracking ID for tracking and PNM meetings.
              </p>

              <div className="my-5 p-3.5 bg-stone-100 rounded-lg border border-stone-300 flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-stone-900">
                  {newlyCreatedTicket.trackingNumber}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(newlyCreatedTicket.trackingNumber)}
                  className="text-xs px-2.5 py-1 bg-white border border-stone-300 rounded-md text-stone-700 hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                  )}
                  <span>{copiedId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-left text-xs space-y-1.5 text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200 mb-5">
                <div><strong>Assigned Representative:</strong> {newlyCreatedTicket.assignedOfficer}</div>
                <div><strong>Subject:</strong> {newlyCreatedTicket.subject}</div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewlyCreatedTicket(null);
                    setActiveTab('track');
                  }}
                  className="flex-1 px-4 py-2 bg-red-700 text-white text-xs font-semibold rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
                >
                  Go to Tracker
                </button>
                <button
                  type="button"
                  onClick={() => setNewlyCreatedTicket(null)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

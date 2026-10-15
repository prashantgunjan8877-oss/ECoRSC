import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DivisionId, SeniorityRecord } from '../types';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Award,
  Calendar,
  Building2,
  Users,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Printer,
  Sparkles,
  Layers,
} from 'lucide-react';

interface SeniorityPortalProps {
  seniorityList: SeniorityRecord[];
  onOpenAddModal?: () => void;
  isOfficerLoggedIn?: boolean;
}

export const SeniorityPortal: React.FC<SeniorityPortalProps> = ({
  seniorityList,
  onOpenAddModal,
  isOfficerLoggedIn,
}) => {
  const { lang } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeEmployeeRecord, setActiveEmployeeRecord] = useState<SeniorityRecord | null>(null);

  // Extract distinct shops
  const availableShops = useMemo(() => {
    const set = new Set<string>();
    seniorityList.forEach((s) => {
      if (s.shopOrUnit) set.add(s.shopOrUnit);
    });
    return Array.from(set).sort();
  }, [seniorityList]);

  // Filtered seniority records
  const filteredList = useMemo(() => {
    return seniorityList
      .filter((rec) => {
        const matchesQuery =
          !searchQuery.trim() ||
          rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.pfNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.hrmsId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.designation.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesShop = selectedShop === 'All' || rec.shopOrUnit === selectedShop;
        const matchesDivision = selectedDivision === 'All' || rec.division === selectedDivision;
        const matchesCategory = selectedCategory === 'All' || rec.category === selectedCategory;

        return matchesQuery && matchesShop && matchesDivision && matchesCategory;
      })
      .sort((a, b) => a.seniorityRank - b.seniorityRank);
  }, [seniorityList, searchQuery, selectedShop, selectedDivision, selectedCategory]);

  const handleDownloadPdf = (rec: SeniorityRecord) => {
    if (rec.documentUrl) {
      if (rec.documentUrl.startsWith('data:')) {
        const win = window.open();
        if (win) {
          win.document.write(
            `<iframe src="${rec.documentUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
          );
        }
      } else {
        window.open(rec.documentUrl, '_blank');
      }
    } else {
      // Generate clean printable representation
      const printWindow = window.open('', '', 'width=800,height=900');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Official Seniority Certificate - ${rec.employeeName}</title>
              <style>
                body { font-family: sans-serif; padding: 30px; line-height: 1.6; }
                .header { text-align: center; border-bottom: 2px solid #b91c1c; padding-bottom: 15px; margin-bottom: 20px; }
                .title { font-size: 20px; font-weight: bold; color: #1c1917; }
                .sub { font-size: 14px; color: #b91c1c; font-weight: bold; }
                .badge { display: inline-block; padding: 4px 10px; background: #fee2e2; color: #991b1b; font-weight: bold; border-radius: 4px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #d6d3d1; padding: 10px; text-align: left; }
                th { background: #f5f5f4; }
                .footer { margin-top: 40px; display: flex; justify-content: space-between; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="title">EAST COAST RAILWAY SHRAMIK CONGRESS (ECORSC)</div>
                <div class="sub">OFFICIAL SENIORITY VERIFICATION MEMO</div>
                <p>Mancheswar Carriage Workshop & Division Cadre Roster</p>
              </div>
              <div style="text-align: right; margin-bottom: 10px;">
                <span class="badge">Official Seniority Rank: #${rec.seniorityRank}</span>
              </div>
              <table>
                <tr><th>Employee Full Name</th><td><strong>${rec.employeeName}</strong></td></tr>
                <tr><th>Designation</th><td>${rec.designation}</td></tr>
                <tr><th>PF / PRAN Number</th><td>${rec.pfNumber}</td></tr>
                <tr><th>HRMS Employee ID</th><td>${rec.hrmsId}</td></tr>
                <tr><th>Shop / Unit</th><td>${rec.shopOrUnit}</td></tr>
                <tr><th>Division</th><td>${rec.division}</td></tr>
                <tr><th>Department</th><td>${rec.department}</td></tr>
                <tr><th>Social Category</th><td>${rec.category}</td></tr>
                <tr><th>Date of Initial Appointment</th><td>${rec.dateOfAppointment}</td></tr>
                <tr><th>Date of Present Grade Fixation</th><td>${rec.dateOfPresentGrade}</td></tr>
                <tr><th>Pay Level / Grade Pay</th><td>${rec.gradePayOrLevel}</td></tr>
                <tr><th>Remarks & Cadre Status</th><td>${rec.remarks || 'Confirmed in Cadre Roster'}</td></tr>
              </table>
              <div class="footer" style="margin-top: 60px; display: flex; justify-content: space-between;">
                <div>
                  <br><br>
                  ____________________________<br>
                  <strong>Comrade Debabrata Behera</strong><br>
                  Branch Secretary, ECoRSC MCS Workshop
                </div>
                <div style="text-align: right;">
                  <br><br>
                  ____________________________<br>
                  <strong>Comrade Ashok Kumar Mishra</strong><br>
                  General Secretary, ECoRSC (NFIR)
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  };

  return (
    <div className="py-12 bg-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-red-700 text-white rounded-xl shadow-xs">
                <FileText className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {lang === 'hi'
                      ? 'कर्मचारी वरिष्ठता सूची एवं दस्तावेज़ डाउनलोड'
                      : 'Employee Seniority List & Document Archive'}
                  </h2>
                  <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                    Official Roster
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'hi'
                    ? 'कर्मचारी अपना नाम या शॉप दर्ज करके अपनी वरिष्ठता जांच सकते हैं तथा अधिकृत पीडीएफ डाउनलोड कर सकते हैं।'
                    : 'Search by employee name or shop/unit to check seniority rank and download official cadre PDF.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-stone-300 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>प्रिंट सूची (Print List)</span>
              </button>

              {isOfficerLoggedIn && onOpenAddModal && (
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>+ वरिष्ठता जोड़ें (Add Seniority)</span>
                </button>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={
                  lang === 'hi'
                    ? 'कर्मचारी का नाम, पीएफ नंबर या पदनाम खोजें...'
                    : 'Search by Name, PF Number, HRMS ID or Designation...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
              />
            </div>

            {/* Shop Filter */}
            <div>
              <select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="All">All Shops / Units (सभी शॉप)</option>
                {availableShops.map((shop) => (
                  <option key={shop} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Filter */}
            <div>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="All">All Divisions (सभी मंडल)</option>
                <option value="MCS">Mancheswar Workshop (MCS)</option>
                <option value="WAT">Waltair (WAT)</option>
                <option value="KUR">Khurda Road (KUR)</option>
                <option value="SBP">Sambalpur (SBP)</option>
                <option value="HQ">Zonal HQ (BBS)</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Counts */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-stone-600 pt-3 border-t border-stone-100">
            <span className="font-medium">
              कुल वरिष्ठता रिकॉर्ड उपलब्ध:{' '}
              <strong className="text-red-700 font-bold">{filteredList.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-500">त्वरित श्रेणी फ़िल्टर:</span>
              {['All', 'UR', 'OBC', 'SC', 'ST'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 text-[11px] rounded font-semibold cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-red-700 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Highlighted Result Card if searching specific employee */}
        {searchQuery.trim() && filteredList.length > 0 && (
          <div className="bg-gradient-to-r from-red-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-red-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  सत्यापित वरिष्ठता परिणाम (Verified Seniority Result)
                </span>
              </div>
              <span className="text-xs font-mono bg-red-800 text-amber-200 px-3 py-1 rounded-full font-bold">
                Rank #{filteredList[0].seniorityRank} in {filteredList[0].shopOrUnit}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-2">
                <h3 className="text-xl font-black text-white">{filteredList[0].employeeName}</h3>
                <div className="text-sm text-stone-200 mt-0.5">{filteredList[0].designation}</div>
                <div className="text-xs text-amber-300 font-mono mt-1">
                  PF: {filteredList[0].pfNumber} · HRMS: {filteredList[0].hrmsId}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-stone-400 uppercase">शॉप / मंडल (Shop & Division)</div>
                <div className="text-xs font-bold text-white">{filteredList[0].shopOrUnit}</div>
                <div className="text-xs text-stone-300">
                  {filteredList[0].division} · {filteredList[0].gradePayOrLevel}
                </div>
              </div>

              <div className="flex justify-start md:justify-end">
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(filteredList[0])}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>📄 पीडीएफ डाउनलोड करें (Download Seniority PDF)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Seniority Records Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-700" />
              <h3 className="text-sm font-bold text-stone-900">
                मंडल एवं वर्कशॉप वरिष्ठता रोस्टर (Workshop & Division Seniority Roster)
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredList.length} of {seniorityList.length} railwaymen
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-100 text-stone-900 uppercase font-bold text-[11px] border-b border-stone-200">
                <tr>
                  <th className="py-3 px-3 text-center">Rank</th>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-3">PF / HRMS ID</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-3">Shop / Unit</th>
                  <th className="py-3 px-2 text-center">Cat</th>
                  <th className="py-3 px-3">Appointment</th>
                  <th className="py-3 px-3">Present Grade</th>
                  <th className="py-3 px-3">Level / GP</th>
                  <th className="py-3 px-3 text-center">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-stone-500 text-xs">
                      कोई वरिष्ठता रिकॉर्ड नहीं मिला। कृपया नाम या शॉप बदल कर पुनः खोजें।
                    </td>
                  </tr>
                ) : (
                  filteredList.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-amber-50/50 transition-colors cursor-pointer group"
                      onClick={() => setActiveEmployeeRecord(rec)}
                    >
                      <td className="py-3 px-3 text-center">
                        <span className="w-7 h-7 inline-flex items-center justify-center rounded-full bg-red-100 text-red-800 font-bold font-mono text-xs group-hover:bg-red-700 group-hover:text-white transition-colors">
                          #{rec.seniorityRank}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900 text-xs">{rec.employeeName}</div>
                        <div className="text-[10px] text-stone-500">{rec.department}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px]">
                        <div className="font-semibold text-stone-800">{rec.pfNumber}</div>
                        <div className="text-stone-500">{rec.hrmsId}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800">{rec.designation}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-stone-900">{rec.shopOrUnit}</span>
                        <span className="block text-[10px] text-amber-700 font-bold">
                          {rec.division} Division
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-800">
                          {rec.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-600 font-mono text-[11px]">
                        {rec.dateOfAppointment}
                      </td>
                      <td className="py-3 px-3 text-stone-600 font-mono text-[11px]">
                        {rec.dateOfPresentGrade}
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-700">
                        {rec.gradePayOrLevel}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPdf(rec);
                          }}
                          className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1 mx-auto cursor-pointer border border-red-200 shadow-2xs"
                          title="Download Official Seniority PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DivisionId, EmployeeRecord } from '../types';
import { Users, Search, Filter, Download, IdCard, CheckCircle2, Building, Wrench, Layers } from 'lucide-react';

interface EmployeeDirectoryProps {
  employees: EmployeeRecord[];
  onSelectEmployeeForCard: (emp: EmployeeRecord) => void;
  onSelectEmployeeForProfile?: (emp: EmployeeRecord) => void;
  onAddNewStaff?: () => void;
  isOfficerLoggedIn?: boolean;
}

export const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({
  employees,
  onSelectEmployeeForCard,
  onSelectEmployeeForProfile,
  onAddNewStaff,
  isOfficerLoggedIn = true,
}) => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<'ALL' | DivisionId>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');
  const [shopFilter, setShopFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Dynamically extract unique departments and unique shops from employees
  const distinctDepartments = Array.from(new Set(employees.map((e) => e.department).filter(Boolean))).sort();
  const distinctShops = Array.from(new Set(employees.map((e) => e.shopOrUnit).filter(Boolean))).sort();

  const filteredEmployees = employees.filter((emp) => {
    const matchesDiv = divisionFilter === 'ALL' || emp.division === divisionFilter;
    const matchesDept = departmentFilter === 'ALL' || emp.department === departmentFilter;
    const matchesShop = shopFilter === 'ALL' || emp.shopOrUnit === shopFilter;
    const matchesCat = categoryFilter === 'ALL' || emp.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      emp.fullName.toLowerCase().includes(q) ||
      emp.pfNumber.toLowerCase().includes(q) ||
      emp.hrmsId.toLowerCase().includes(q) ||
      emp.station.toLowerCase().includes(q) ||
      emp.shopOrUnit?.toLowerCase().includes(q) ||
      emp.unionPost?.toLowerCase().includes(q) ||
      emp.cardNumber4Digit?.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q);
    return matchesDiv && matchesDept && matchesShop && matchesCat && matchesQuery;
  });


  const exportToCSV = () => {
    const headers = [
      'Full Name',
      'PF Number',
      'HRMS ID',
      'Designation',
      'Department',
      'Shop or Unit',
      'Division',
      'Station',
      'Blood Group',
      'Mobile',
      'Membership Role',
      'Status',
    ];

    const rows = filteredEmployees.map((e) => [
      `"${e.fullName}"`,
      `"${e.pfNumber}"`,
      `"${e.hrmsId}"`,
      `"${e.designation}"`,
      `"${e.department}"`,
      `"${e.shopOrUnit || ''}"`,
      `"${e.division}"`,
      `"${e.station}"`,
      `"${e.bloodGroup}"`,
      `"${e.mobile}"`,
      `"${e.membershipType}"`,
      `"${e.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `ECORSC_Staff_Roster_${divisionFilter}_${shopFilter !== 'ALL' ? shopFilter.replace(/\s+/g, '_') : 'AllShops'}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="employees" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
              <span>ECORSC REGISTERED RAILWAYMEN DATABASE</span>
              <span className="text-stone-300">/</span>
              <span>SHOP & DEPARTMENT ROSTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              {lang === 'hi'
                ? 'ईस्ट कोस्ट रेलवे कर्मचारी, शॉप एवं डिपो निर्देशिका'
                : 'Railway Staff Roster by Shop & Department'}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-600">
              {lang === 'hi'
                ? 'कारखाना शॉप्स (बोगी शॉप, व्हील शॉप, शेल रिपेयर, एसी शॉप) एवं ऑपरेटिंग, सिग्नल, ट्रैक विभागों के अनुसार अलग-अलग कर्मचारियों का पूर्ण विवरण।'
                : 'Filter and segregate staff by specific Workshop Shops (Bogie, Wheel, Shell, Electrical/AC), Running Depots, and Departments.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            {onAddNewStaff && isOfficerLoggedIn && (
              <button
                type="button"
                onClick={onAddNewStaff}
                className="px-4 py-2 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <span>+ नया कर्मचारी जोड़ें (Add Staff)</span>
              </button>
            )}
            <button
              type="button"
              onClick={exportToCSV}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* Multi-Level Shop & Department Filter Panel */}
        <div className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200 mb-6 space-y-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search */}
            <div className="sm:col-span-3 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, PF, 4-digit card, post..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Division Filter */}
            <div className="sm:col-span-2">
              <select
                value={divisionFilter}
                onChange={(e) => setDivisionFilter(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-medium"
              >
                <option value="ALL">All Divisions</option>
                <option value="WAT">Waltair (WAT)</option>
                <option value="KUR">Khurda Road (KUR)</option>
                <option value="SBP">Sambalpur (SBP)</option>
                <option value="MCS">Mancheswar (MCS)</option>
                <option value="HQ">Zonal HQ (BBS)</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="sm:col-span-2">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-medium"
              >
                <option value="ALL">All Departments ({distinctDepartments.length})</option>
                {distinctDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Shop / Unit Filter */}
            <div className="sm:col-span-3">
              <select
                value={shopFilter}
                onChange={(e) => setShopFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold text-red-900"
              >
                <option value="ALL">All Shops & Depots ({distinctShops.length})</option>
                {distinctShops.map((shop) => (
                  <option key={shop} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="UR">UR / General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          {/* Quick Shop Filter Chips */}
          <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-stone-500 font-semibold text-[11px] mr-1 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-stone-400" />
              <span>Quick Shop Filter:</span>
            </span>
            <button
              type="button"
              onClick={() => setShopFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                shopFilter === 'ALL' ? 'bg-red-700 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              All Shops ({employees.length})
            </button>
            {distinctShops.slice(0, 7).map((shop) => (
              <button
                key={shop}
                type="button"
                onClick={() => setShopFilter(shop)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  shopFilter === shop ? 'bg-red-700 text-white shadow-xs font-semibold' : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {shop}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <span>
              Showing <strong className="text-stone-900 font-mono">{filteredEmployees.length}</strong> of{' '}
              <strong className="text-stone-900 font-mono">{employees.length}</strong> registered staff ·{' '}
              <span className="text-red-700 font-medium">नाम पर क्लिक करके पूरा विवरण व सहायता इतिहास देखें</span>
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ECORSC Trade Union Verified</span>
            </span>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-900 text-stone-300 uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="py-3 px-4">Employee Details (Click name to open)</th>
                  <th className="py-3 px-4">PF & HRMS ID</th>
                  <th className="py-3 px-4">Shop / Unit Allocation</th>
                  <th className="py-3 px-4">Department & Cadre</th>
                  <th className="py-3 px-4">Union Post & Category</th>
                  <th className="py-3 px-4">Division & Station</th>
                  <th className="py-3 px-4 text-right">Digital Credential</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500">
                      No railway staff records found for selected shop/department filter.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-amber-50/40 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {emp.photoUrl ? (
                            <img
                              src={emp.photoUrl}
                              alt={emp.fullName}
                              className="w-9 h-9 rounded-full object-cover border border-stone-300 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 border border-red-200">
                              {emp.fullName ? emp.fullName.charAt(0) : 'R'}
                            </div>
                          )}
                          <div>
                            <button
                              type="button"
                              onClick={() => onSelectEmployeeForProfile && onSelectEmployeeForProfile(emp)}
                              className="font-bold text-stone-900 text-sm hover:text-red-700 hover:underline cursor-pointer text-left block flex items-center gap-1.5"
                            >
                              <span>{emp.fullName}</span>
                              {emp.cardNumber4Digit && (
                                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono px-1.5 py-0.2 rounded font-bold">
                                  #{emp.cardNumber4Digit}
                                </span>
                              )}
                            </button>
                            <div className="text-[11px] text-stone-500">{emp.designation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <div className="text-stone-900 font-semibold">{emp.pfNumber}</div>
                        <div className="text-[11px] text-stone-500">HRMS: {emp.hrmsId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 rounded-md">
                          {emp.shopOrUnit || 'General Pool'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-900 font-medium">{emp.department}</div>
                        <div className="text-[11px] text-stone-500">
                          Blood: <strong className="text-red-700">{emp.bloodGroup}</strong> · {emp.membershipType}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-red-700">
                          {emp.unionPost || 'सक्रिय सदस्य (Member)'}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Cat: <span className="font-bold text-stone-800">{emp.category || 'UR'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{emp.station}</div>
                        <div className="text-[11px] text-red-700 font-medium">{emp.division} Division</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onSelectEmployeeForProfile && (
                            <button
                              type="button"
                              onClick={() => onSelectEmployeeForProfile(emp)}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-xs font-medium cursor-pointer"
                              title="पूरा डेटा देखें"
                            >
                              विवरण
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSelectEmployeeForCard(emp)}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white rounded-md text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-red-200 hover:border-red-700"
                          >
                            <IdCard className="w-3.5 h-3.5" />
                            <span>E-Card</span>
                          </button>
                        </div>
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


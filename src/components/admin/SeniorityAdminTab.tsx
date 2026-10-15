import React, { useState } from 'react';
import { DivisionId, SeniorityRecord } from '../../types';
import { FileUploadInput } from '../FileUploadInput';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  X,
  Award,
  Calendar,
  Layers,
} from 'lucide-react';

interface SeniorityAdminTabProps {
  seniorityList: SeniorityRecord[];
  onAddSeniority: (s: SeniorityRecord) => void;
  onUpdateSeniority: (s: SeniorityRecord) => void;
  onDeleteSeniority: (id: string) => void;
}

export const SeniorityAdminTab: React.FC<SeniorityAdminTabProps> = ({
  seniorityList,
  onAddSeniority,
  onUpdateSeniority,
  onDeleteSeniority,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [rank, setRank] = useState<number>(1);
  const [name, setName] = useState('');
  const [pfNumber, setPfNumber] = useState('');
  const [hrmsId, setHrmsId] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('Store & Workshop');
  const [shopOrUnit, setShopOrUnit] = useState('Bogie Shop');
  const [division, setDivision] = useState<DivisionId>('MCS');
  const [category, setCategory] = useState<'UR' | 'OBC' | 'SC' | 'ST'>('UR');
  const [dob, setDob] = useState('1985-05-15');
  const [dateOfAppointment, setDateOfAppointment] = useState('2010-08-12');
  const [dateOfPresentGrade, setDateOfPresentGrade] = useState('2020-01-01');
  const [gradePayOrLevel, setGradePayOrLevel] = useState('Level-6 (Grade Pay 4200)');
  const [documentUrl, setDocumentUrl] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [remarks, setRemarks] = useState('');

  const distinctShops = Array.from(new Set(seniorityList.map((s) => s.shopOrUnit).filter(Boolean))).sort();

  const handleOpenAdd = () => {
    setEditingId(null);
    setRank(seniorityList.length + 1);
    setName('');
    setPfNumber(`PF${Math.floor(534000000 + Math.random() * 900000)}`);
    setHrmsId(`ECOR${Math.floor(2000 + Math.random() * 7000)}`);
    setDesignation('Senior Technician');
    setDepartment('Store & Workshop');
    setShopOrUnit('Bogie Shop');
    setDivision('MCS');
    setCategory('UR');
    setDob('1985-06-20');
    setDateOfAppointment('2010-09-15');
    setDateOfPresentGrade('2020-03-01');
    setGradePayOrLevel('Level-6 (Grade Pay 4200)');
    setDocumentUrl('');
    setDocumentName('');
    setRemarks('');
    setShowModal(true);
  };

  const handleOpenEdit = (rec: SeniorityRecord) => {
    setEditingId(rec.id);
    setRank(rec.seniorityRank);
    setName(rec.employeeName);
    setPfNumber(rec.pfNumber);
    setHrmsId(rec.hrmsId);
    setDesignation(rec.designation);
    setDepartment(rec.department);
    setShopOrUnit(rec.shopOrUnit);
    setDivision(rec.division);
    setCategory(rec.category);
    setDob(rec.dob);
    setDateOfAppointment(rec.dateOfAppointment);
    setDateOfPresentGrade(rec.dateOfPresentGrade);
    setGradePayOrLevel(rec.gradePayOrLevel);
    setDocumentUrl(rec.documentUrl || '');
    setDocumentName(rec.documentName || '');
    setRemarks(rec.remarks || '');
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pfNumber.trim()) {
      alert('कृपया कर्मचारी का नाम और पीएफ नंबर दर्ज करें।');
      return;
    }

    const payload: SeniorityRecord = {
      id: editingId || `sen-${Date.now()}`,
      seniorityRank: Number(rank) || 1,
      employeeName: name.trim(),
      pfNumber: pfNumber.trim(),
      hrmsId: hrmsId.trim() || 'ECOR0000',
      designation: designation.trim() || 'Railway Employee',
      department: department.trim(),
      shopOrUnit: shopOrUnit.trim(),
      division,
      category,
      dob,
      dateOfAppointment,
      dateOfPresentGrade,
      gradePayOrLevel,
      documentUrl,
      documentName: documentName || (documentUrl ? 'Seniority_Order.pdf' : undefined),
      remarks,
    };

    if (editingId) {
      onUpdateSeniority(payload);
      alert('वरिष्ठता रिकॉर्ड सफलतापूर्वक अपडेट किया गया!');
    } else {
      onAddSeniority(payload);
      alert('नई वरिष्ठता प्रविष्टि सफलतापूर्वक जोड़ी गई!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, empName: string) => {
    if (window.confirm(`क्या आप ${empName} का वरिष्ठता रिकॉर्ड हटाना चाहते हैं?`)) {
      onDeleteSeniority(id);
    }
  };

  const filtered = seniorityList
    .filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        s.employeeName.toLowerCase().includes(q) ||
        s.pfNumber.toLowerCase().includes(q) ||
        s.hrmsId.toLowerCase().includes(q) ||
        s.designation.toLowerCase().includes(q) ||
        s.shopOrUnit.toLowerCase().includes(q);

      const matchesShop = selectedShop === 'All' || s.shopOrUnit === selectedShop;
      const matchesDiv = selectedDivision === 'All' || s.division === selectedDivision;

      return matchesQ && matchesShop && matchesDiv;
    })
    .sort((a, b) => a.seniorityRank - b.seniorityRank);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-700" />
            <span>वरिष्ठता सूची एवं पीडीएफ प्रबंधन (Seniority List & Cadre PDF Manager)</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            शॉपवार व संवर्गवार वरिष्ठता सूची जोड़ें, पीडीएफ/फोटो दस्तावेज अपलोड करें और कर्मचारियों को जांच की सुविधा दें।
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>+ नई वरिष्ठता प्रविष्टि जोड़ें (+ Add Seniority)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="नाम, पीएफ नंबर या शॉप खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
          />
        </div>

        <div>
          <select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
          >
            <option value="All">All Shops / Units (सभी शॉप)</option>
            {distinctShops.map((sh) => (
              <option key={sh} value={sh}>
                {sh}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
          >
            <option value="All">All Divisions (सभी मंडल)</option>
            <option value="MCS">Mancheswar (MCS)</option>
            <option value="WAT">Waltair (WAT)</option>
            <option value="KUR">Khurda Road (KUR)</option>
            <option value="SBP">Sambalpur (SBP)</option>
            <option value="HQ">Zonal HQ (BBS)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-stone-200 rounded-xl">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-100 text-stone-900 uppercase font-bold text-[11px] border-b border-stone-200">
            <tr>
              <th className="py-2.5 px-3 text-center">Rank</th>
              <th className="py-2.5 px-3">Employee Name</th>
              <th className="py-2.5 px-3">PF / HRMS ID</th>
              <th className="py-2.5 px-3">Designation</th>
              <th className="py-2.5 px-3">Shop / Unit</th>
              <th className="py-2.5 px-2 text-center">Cat</th>
              <th className="py-2.5 px-3">Appointment</th>
              <th className="py-2.5 px-3">Present Grade</th>
              <th className="py-2.5 px-3">Level / GP</th>
              <th className="py-2.5 px-3 text-center">PDF Doc</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-6 text-center text-stone-500 text-xs">
                  कोई वरिष्ठता रिकॉर्ड नहीं मिला।
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50">
                  <td className="py-2.5 px-3 text-center">
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-red-100 text-red-800 font-bold font-mono text-xs">
                      #{s.seniorityRank}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-stone-900">{s.employeeName}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div>{s.pfNumber}</div>
                    <div className="text-stone-500">{s.hrmsId}</div>
                  </td>
                  <td className="py-2.5 px-3">{s.designation}</td>
                  <td className="py-2.5 px-3 font-medium text-amber-900">
                    {s.shopOrUnit} ({s.division})
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-800 font-bold text-[10px]">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-stone-600">
                    {s.dateOfAppointment}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-stone-600">
                    {s.dateOfPresentGrade}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">
                    {s.gradePayOrLevel}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {s.documentUrl ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                        Attached
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-400">Auto Generated</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id, s.employeeName)}
                        className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Add / Edit Seniority */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden my-6">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-bold text-white">
                  {editingId ? 'वरिष्ठता रिकॉर्ड बदलें (Edit Seniority)' : 'नई वरिष्ठता प्रविष्टि जोड़ें (Add Seniority Record)'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    वरिष्ठता क्रम (Seniority Rank #) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={rank}
                    onChange={(e) => setRank(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-bold font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">
                    कर्मचारी का नाम (Employee Full Name) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Debabrata Behera / Ramesh Mohanty"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    PF / PRAN Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pfNumber}
                    onChange={(e) => setPfNumber(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">HRMS Employee ID</label>
                  <input
                    type="text"
                    value={hrmsId}
                    onChange={(e) => setHrmsId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    पदनाम (Designation) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Section Engineer, Senior Technician, ALP"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    शॉप या डिपो (Shop / Unit Name) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shopOrUnit}
                    onChange={(e) => setShopOrUnit(e.target.value)}
                    placeholder="e.g. Bogie Shop, LHB Wheel Shop, Shell Shop"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">मंडल (Division)</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as DivisionId)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  >
                    <option value="MCS">Mancheswar (MCS)</option>
                    <option value="WAT">Waltair (WAT)</option>
                    <option value="KUR">Khurda Road (KUR)</option>
                    <option value="SBP">Sambalpur (SBP)</option>
                    <option value="HQ">Zonal HQ (BBS)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">वर्ग (Category)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  >
                    <option value="UR">UR (General)</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    वेतन स्तर (Grade Pay / Level)
                  </label>
                  <input
                    type="text"
                    value={gradePayOrLevel}
                    onChange={(e) => setGradePayOrLevel(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">जन्म तिथि (DOB)</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">नियुक्ति तिथि (Appointment)</label>
                  <input
                    type="date"
                    value={dateOfAppointment}
                    onChange={(e) => setDateOfAppointment(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">वर्तमान ग्रेड तिथि</label>
                  <input
                    type="date"
                    value={dateOfPresentGrade}
                    onChange={(e) => setDateOfPresentGrade(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              {/* PDF or Document File Upload Component */}
              <div className="pt-2">
                <FileUploadInput
                  label="वरिष्ठता सूची अधिकृत पीडीएफ या फोटो दस्तावेज़ (Upload Seniority PDF / Document)"
                  helperText="Upload official shop seniority notice PDF or scanned order. Employee can view & download this."
                  value={documentUrl}
                  fileName={documentName}
                  acceptTypes="both"
                  onChange={(dataUrl, fName) => {
                    setDocumentUrl(dataUrl);
                    setDocumentName(fName);
                  }}
                  onClear={() => {
                    setDocumentUrl('');
                    setDocumentName('');
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">टिप्पणी (Remarks)</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Confirmed in 2026 cadre review, MACP granted"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  {editingId ? 'परिवर्तन सुरक्षित करें (Update Record)' : 'वरिष्ठता सुरक्षित करें (Save Record)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

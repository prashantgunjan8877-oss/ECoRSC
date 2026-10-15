import React, { useState } from 'react';
import { DivisionId, OfficialUserAccount, StaffHelpRecord } from '../../types';
import { FileUploadInput } from '../FileUploadInput';
import {
  HeartHandshake,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  User,
  Calendar,
  Building,
} from 'lucide-react';

interface StaffHelpAdminTabProps {
  records: StaffHelpRecord[];
  onAddRecord: (r: StaffHelpRecord) => void;
  onUpdateRecord: (r: StaffHelpRecord) => void;
  onDeleteRecord: (id: string) => void;
  officialAccounts?: OfficialUserAccount[];
  activeOfficerId?: string;
}

export const StaffHelpAdminTab: React.FC<StaffHelpAdminTabProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
  officialAccounts = [],
  activeOfficerId = 'OFFICIAL-MCS-01',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [empName, setEmpName] = useState('');
  const [pfNumber, setPfNumber] = useState('');
  const [shopOrUnit, setShopOrUnit] = useState('Bogie Shop');
  const [department, setDepartment] = useState('Store & Workshop');
  const [division, setDivision] = useState<DivisionId>('MCS');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [helpCategory, setHelpCategory] = useState<StaffHelpRecord['helpCategory']>('Medical Relief');
  const [description, setDescription] = useState('');
  const [reliefGiven, setReliefGiven] = useState('');
  const [attachedDoc, setAttachedDoc] = useState('');
  const [attachedDocName, setAttachedDocName] = useState('');
  const [assistedOfficerId, setAssistedOfficerId] = useState(activeOfficerId);
  const [assistedOfficerName, setAssistedOfficerName] = useState('Comrade Officer');
  const [status, setStatus] = useState<'Resolved & Aided' | 'Under Followup'>('Resolved & Aided');

  const handleOpenAdd = () => {
    setEditingId(null);
    setEmpName('');
    setPfNumber(`PF${Math.floor(534000000 + Math.random() * 900000)}`);
    setShopOrUnit('Bogie Shop');
    setDepartment('Store & Workshop');
    setDivision('MCS');
    setDate(new Date().toISOString().split('T')[0]);
    setHelpCategory('Medical Relief');
    setDescription('');
    setReliefGiven('');
    setAttachedDoc('');
    setAttachedDocName('');
    setAssistedOfficerId(activeOfficerId);
    const matched = officialAccounts.find((a) => a.id === activeOfficerId);
    setAssistedOfficerName(matched ? matched.name : 'Comrade Debabrata Behera');
    setStatus('Resolved & Aided');
    setShowModal(true);
  };

  const handleOpenEdit = (rec: StaffHelpRecord) => {
    setEditingId(rec.id);
    setEmpName(rec.employeeName);
    setPfNumber(rec.pfNumber);
    setShopOrUnit(rec.shopOrUnit);
    setDepartment(rec.department);
    setDivision(rec.division);
    setDate(rec.date);
    setHelpCategory(rec.helpCategory);
    setDescription(rec.description);
    setReliefGiven(rec.reliefGivenOrActionTaken);
    setAttachedDoc(rec.attachedPhotoOrDoc || '');
    setAttachedDocName(rec.attachedDocName || '');
    setAssistedOfficerId(rec.assistedByOfficialId);
    setAssistedOfficerName(rec.assistedByOfficialName);
    setStatus(rec.status);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !description.trim() || !reliefGiven.trim()) {
      alert('कृपया कर्मचारी का नाम, समस्या और यूनियन सहायता विवरण दर्ज करें।');
      return;
    }

    const payload: StaffHelpRecord = {
      id: editingId || `help-${Date.now()}`,
      employeeName: empName.trim(),
      pfNumber: pfNumber.trim(),
      shopOrUnit: shopOrUnit.trim(),
      department: department.trim(),
      division,
      date,
      helpCategory,
      description: description.trim(),
      reliefGivenOrActionTaken: reliefGiven.trim(),
      attachedPhotoOrDoc: attachedDoc,
      attachedDocName: attachedDocName || (attachedDoc ? 'Help_Record_Proof.pdf' : undefined),
      assistedByOfficialId: assistedOfficerId,
      assistedByOfficialName: assistedOfficerName,
      status,
    };

    if (editingId) {
      onUpdateRecord(payload);
      alert('कर्मचारी सहायता रिकॉर्ड सफलतापूर्वक अपडेट हुआ!');
    } else {
      onAddRecord(payload);
      alert('नया सहायता व कल्याण रिकॉर्ड सफलतापूर्वक जोड़ा गया!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`क्या आप ${name} का सहायता रिकॉर्ड हटाना चाहते हैं?`)) {
      onDeleteRecord(id);
    }
  };

  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQ =
      !q ||
      r.employeeName.toLowerCase().includes(q) ||
      r.pfNumber.toLowerCase().includes(q) ||
      r.assistedByOfficialName.toLowerCase().includes(q) ||
      r.shopOrUnit.toLowerCase().includes(q);

    const matchesCat = selectedCat === 'All' || r.helpCategory === selectedCat;
    return matchesQ && matchesCat;
  });

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-700" />
            <span>कर्मचारी सहायता एवं कल्याण कार्य रजिस्टर (Staff Welfare & Assistance Log)</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            30 अधिकृत अधिकारी रेलकर्मियों को दी गई चिकित्सा राहत, पीएफ अग्रिम, आवास व ट्रांसफर सहायता फोटो व रसीद सहित दर्ज करें।
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-emerald-200" />
          <span>+ सहायता रिकॉर्ड जोड़ें (+ Add Help Record)</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="कर्मचारी का नाम, पीएफ नंबर या सहायताकर्ता खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
          />
        </div>

        <div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
          >
            <option value="All">All Categories (सभी प्रकार)</option>
            <option value="Medical Relief">Medical Relief</option>
            <option value="PF / Financial Assistance">PF / Financial Assistance</option>
            <option value="Mutual Transfer Support">Mutual Transfer Support</option>
            <option value="Quarters Issue">Quarters Issue</option>
            <option value="Grievance / DAR Defense">Grievance / DAR Defense</option>
            <option value="Bereavement Relief">Bereavement Relief</option>
            <option value="Safety & Tool Support">Safety & Tool Support</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto border border-stone-200 rounded-xl">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-100 text-stone-900 uppercase font-bold text-[11px] border-b border-stone-200">
            <tr>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Employee Name</th>
              <th className="py-2.5 px-3">Shop / Unit</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-4">Action Taken / Relief Provided</th>
              <th className="py-2.5 px-3">Assisted By</th>
              <th className="py-2.5 px-2 text-center">Proof/Photo</th>
              <th className="py-2.5 px-2 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-6 text-center text-stone-500 text-xs">
                  कोई सहायता रिकॉर्ड नहीं मिला।
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-stone-600">{r.date}</td>
                  <td className="py-2.5 px-3 font-bold text-stone-900">
                    <div>{r.employeeName}</div>
                    <div className="font-mono text-[10px] text-stone-500">{r.pfNumber}</div>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-amber-900">
                    {r.shopOrUnit} ({r.division})
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {r.helpCategory}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-stone-800 max-w-xs truncate">
                    {r.reliefGivenOrActionTaken}
                  </td>
                  <td className="py-2.5 px-3 text-stone-700 font-medium">
                    <div>{r.assistedByOfficialName}</div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {r.assistedByOfficialId}
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    {r.attachedPhotoOrDoc ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300">
                        Attached
                      </span>
                    ) : (
                      <span className="text-stone-300 text-[10px]">None</span>
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-[10px] font-bold text-emerald-800">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(r)}
                        className="p-1.5 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id, r.employeeName)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden my-6">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {editingId ? 'सहायता रिकॉर्ड बदलें (Edit Help Record)' : 'नया सहायता कार्य दर्ज करें (Add Staff Help Record)'}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    कर्मचारी का नाम (Employee Name) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    placeholder="e.g. Ramesh Sahu"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    PF / HRMS ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pfNumber}
                    onChange={(e) => setPfNumber(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    शॉप या शाखा (Shop / Unit) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shopOrUnit}
                    onChange={(e) => setShopOrUnit(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">मंडल (Division)</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as DivisionId)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option value="MCS">Mancheswar (MCS)</option>
                    <option value="WAT">Waltair (WAT)</option>
                    <option value="KUR">Khurda Road (KUR)</option>
                    <option value="SBP">Sambalpur (SBP)</option>
                    <option value="HQ">Zonal HQ (BBS)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">सहायता श्रेणी (Category)</label>
                  <select
                    value={helpCategory}
                    onChange={(e) => setHelpCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  >
                    <option value="Medical Relief">Medical Relief (चिकित्सा सहायता)</option>
                    <option value="PF / Financial Assistance">PF / Financial Assistance</option>
                    <option value="Mutual Transfer Support">Mutual Transfer Support</option>
                    <option value="Quarters Issue">Quarters Issue</option>
                    <option value="Grievance / DAR Defense">Grievance / DAR Defense</option>
                    <option value="Bereavement Relief">Bereavement Relief</option>
                    <option value="Safety & Tool Support">Safety & Tool Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">दिनांक (Date)</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  कर्मचारी समस्या / आवश्यकता का विवरण (Employee Matter) <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="उदा. आपातकालीन अस्पताल अग्रिम स्वीकृति में रुकावट, म्यूचुअल ट्रांसफर एनओसी..."
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  यूनियन द्वारा की गई सहायता व समाधान (Action Taken / Relief Provided) <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={reliefGiven}
                  onChange={(e) => setReliefGiven(e.target.value)}
                  placeholder="उदा. सीएमएस से मिलकर ₹1,50,000 अग्रिम जारी कराया गया, ट्रांसफर रिलीविंग आदेश..."
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium text-emerald-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">सहायताकर्ता अधिकारी आईडी</label>
                  <select
                    value={assistedOfficerId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setAssistedOfficerId(id);
                      const matched = officialAccounts.find((a) => a.id === id);
                      if (matched) setAssistedOfficerName(matched.name);
                    }}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  >
                    {officialAccounts.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.id} ({a.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">सहायताकर्ता पदाधिकारी नाम</label>
                  <input
                    type="text"
                    value={assistedOfficerName}
                    onChange={(e) => setAssistedOfficerName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              {/* Photo or Receipt Upload */}
              <div className="pt-1">
                <FileUploadInput
                  label="सहायता फोटो, मेडिकल रसीद या अधिकृत पत्र (Attach Photo or Document Receipt)"
                  helperText="Upload photo of relief distribution, hospital sanction letter or relieving memo."
                  value={attachedDoc}
                  fileName={attachedDocName}
                  acceptTypes="both"
                  onChange={(dataUrl, fName) => {
                    setAttachedDoc(dataUrl);
                    setAttachedDocName(fName);
                  }}
                  onClear={() => {
                    setAttachedDoc('');
                    setAttachedDocName('');
                  }}
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  {editingId ? 'परिवर्तन सुरक्षित करें' : 'सहायता कार्य सुरक्षित करें'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

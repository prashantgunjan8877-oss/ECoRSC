import React, { useState } from 'react';
import { OfficialUserAccount, PortalSettings } from '../../types';
import {
  Users,
  Shield,
  Key,
  Edit,
  Copy,
  Check,
  RotateCcw,
  Printer,
  Search,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  X,
  Plus,
  Trash2,
} from 'lucide-react';

interface OfficialsAdminTabProps {
  officialAccounts: OfficialUserAccount[];
  onUpdateOfficialAccount: (acc: OfficialUserAccount) => void;
  onAddOfficialAccount?: (acc: OfficialUserAccount) => void;
  onDeleteOfficialAccount?: (id: string) => void;
  onResetOfficialAccounts: () => void;
  portalSettings: PortalSettings;
  onUpdatePortalSettings: (s: PortalSettings) => void;
}

export const OfficialsAdminTab: React.FC<OfficialsAdminTabProps> = ({
  officialAccounts,
  onUpdateOfficialAccount,
  onAddOfficialAccount,
  onDeleteOfficialAccount,
  onResetOfficialAccounts,
  portalSettings,
  onUpdatePortalSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState('All');
  const [showPasswords, setShowPasswords] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Create New Account Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Shop Representative');
  const [newShop, setNewShop] = useState('Bogie Shop (MCS)');
  const [newDivision, setNewDivision] = useState<'MCS' | 'KUR' | 'WAT' | 'SBP' | 'HQ'>('MCS');
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Edit Modal State
  const [editingAccount, setEditingAccount] = useState<OfficialUserAccount | null>(null);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editShop, setEditShop] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Granular Permissions
  const [canAddStaff, setCanAddStaff] = useState(true);
  const [canAddHelpRecord, setCanAddHelpRecord] = useState(true);
  const [canViewSeniority, setCanViewSeniority] = useState(true);
  const [canEditSeniority, setCanEditSeniority] = useState(false);
  const [canManageGrievance, setCanManageGrievance] = useState(true);
  const [canApproveIdCards, setCanApproveIdCards] = useState(false);
  const [canDeleteData, setCanDeleteData] = useState(false);


  // Master Admin ID/Password change state
  const [masterAdminId, setMasterAdminId] = useState(portalSettings.adminOfficerId || 'SUPERADMIN-ECORSC');
  const [masterAdminPass, setMasterAdminPass] = useState(portalSettings.adminPassword || 'superadmin@ecorsc2026');
  const [masterSaved, setMasterSaved] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenEdit = (acc: OfficialUserAccount) => {
    setEditingAccount(acc);
    setEditId(acc.id);
    setEditName(acc.name);
    setEditRole(acc.role);
    setEditShop(acc.shopOrUnit);
    setEditPassword(acc.password);
    setEditPhone(acc.phone || '');
    setCanAddStaff(acc.permissions?.canAddStaff ?? true);
    setCanAddHelpRecord(acc.permissions?.canAddHelpRecord ?? true);
    setCanViewSeniority(acc.permissions?.canViewSeniority ?? true);
    setCanEditSeniority(acc.permissions?.canEditSeniority ?? false);
    setCanManageGrievance(acc.permissions?.canManageGrievance ?? true);
    setCanApproveIdCards(acc.permissions?.canApproveIdCards ?? false);
    setCanDeleteData(acc.permissions?.canDeleteData ?? false);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;

    const updated: OfficialUserAccount = {
      ...editingAccount,
      id: editId.trim() || editingAccount.id,
      name: editName.trim() || editingAccount.name,
      role: editRole.trim() || editingAccount.role,
      shopOrUnit: editShop.trim() || editingAccount.shopOrUnit,
      password: editPassword.trim() || editingAccount.password,
      phone: editPhone.trim(),
      permissions: {
        canAddStaff,
        canAddHelpRecord,
        canViewSeniority,
        canEditSeniority,
        canManageGrievance,
        canApproveIdCards,
        canDeleteData,
      },
    };

    onUpdateOfficialAccount(updated);
    setEditingAccount(null);
    alert(`अधिकारी खाता "${updated.id}" (${updated.name}) का पासवर्ड एवं अनुमतियां अपडेट हो गईं!`);
  };

  const handleOpenCreateModal = () => {
    const nextNum = officialAccounts.length + 1;
    setNewId(`OFFICIAL-MCS-${nextNum < 10 ? '0' + nextNum : nextNum}`);
    setNewName('');
    setNewRole('Shop Representative');
    setNewShop('Bogie Shop (MCS)');
    setNewDivision('MCS');
    setNewPassword(`mcs@${Math.floor(1000 + Math.random() * 9000)}`);
    setNewPhone('');
    setCanAddStaff(true);
    setCanAddHelpRecord(true);
    setCanViewSeniority(true);
    setCanEditSeniority(false);
    setCanManageGrievance(true);
    setCanApproveIdCards(false);
    setCanDeleteData(false);
    setShowCreateModal(true);
  };

  const handleSaveNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId.trim() || !newPassword.trim() || !newName.trim()) {
      alert('कृपया आईडी, नाम एवं पासवर्ड भरें!');
      return;
    }

    const created: OfficialUserAccount = {
      id: newId.trim(),
      name: newName.trim(),
      role: newRole.trim() || 'Official Representative',
      shopOrUnit: newShop.trim() || 'General Shop',
      division: newDivision,
      password: newPassword.trim(),
      phone: newPhone.trim(),
      accessLevel: 'semi',
      permissions: {
        canAddStaff,
        canAddHelpRecord,
        canViewSeniority,
        canEditSeniority,
        canManageGrievance,
        canApproveIdCards,
        canDeleteData,
      },
    };

    if (onAddOfficialAccount) {
      onAddOfficialAccount(created);
    }
    setShowCreateModal(false);
    alert(`नया ऑफिशियल खाता "${created.id}" (${created.name}) सफलतापूर्वक बना दिया गया!`);
  };


  const handleSaveMasterAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePortalSettings({
      ...portalSettings,
      adminOfficerId: masterAdminId.trim(),
      adminPassword: masterAdminPass.trim(),
    });
    setMasterSaved(true);
    setTimeout(() => setMasterSaved(false), 3000);
    alert('सर्वोच्च मुख्य एडमिन की लॉगिन आईडी व पासवर्ड सफलतापूर्वक अपडेट हो गए!');
  };

  const handlePrintCredentials = () => {
    const win = window.open('', '', 'width=900,height=800');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>ECORSC 30 Official Login Credentials Sheet</title>
            <style>
              body { font-family: sans-serif; padding: 25px; line-height: 1.4; color: #1c1917; }
              h2 { color: #b91c1c; border-bottom: 2px solid #b91c1c; padding-bottom: 8px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
              th, td { border: 1px solid #d6d3d1; padding: 6px 10px; text-align: left; }
              th { background: #f5f5f4; }
              .master { background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h2>EAST COAST RAILWAY SHRAMIK CONGRESS (ECORSC)</h2>
            <p><strong>Official Cadre Authentication Sheet (30 अधिकृत पदाधिकारी लॉगिन विवरण)</strong></p>
            <div class="master">
              Chief Master Super Admin Login: <u>${portalSettings.adminOfficerId}</u> | Password: <u>${portalSettings.adminPassword}</u>
            </div>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Official ID</th>
                  <th>Officer Name</th>
                  <th>Assigned Shop / Unit</th>
                  <th>Password</th>
                  <th>Access Scope</th>
                </tr>
              </thead>
              <tbody>
                ${officialAccounts
                  .map(
                    (a, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${a.id}</strong></td>
                    <td>${a.name}</td>
                    <td>${a.shopOrUnit} (${a.division})</td>
                    <td><code>${a.password}</code></td>
                    <td>Staff & Help Records Entry (Semi-Access)</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  const filtered = officialAccounts.filter((acc) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQ =
      !q ||
      acc.id.toLowerCase().includes(q) ||
      acc.name.toLowerCase().includes(q) ||
      acc.shopOrUnit.toLowerCase().includes(q) ||
      acc.role.toLowerCase().includes(q);

    const matchesShop = selectedShop === 'All' || acc.shopOrUnit === selectedShop;
    return matchesQ && matchesShop;
  });

  return (
    <div className="space-y-6">
      {/* 1. MASTER SUPER ADMIN CREDENTIALS CARD */}
      <div className="bg-gradient-to-r from-red-950 via-stone-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border-2 border-amber-500/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-red-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-stone-950 rounded-xl font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  सर्वोच्च मुख्य एडमिन (Super Admin Master Credentials)
                </h3>
                <span className="bg-red-700 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Chief Unrestricted Access
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                यह आपकी अपनी निजी मुख्य आईडी और पासवर्ड है जिससे आप 30 अधिकारियों के क्रेडेंशियल सहित पूरा ऐप नियंत्रित करते हैं।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintCredentials}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-stone-600 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>प्रिंट सभी 30 लॉगिन (Print 30 IDs)</span>
            </button>
          </div>
        </div>

        {/* Change Master Credentials Form */}
        <form onSubmit={handleSaveMasterAdmin} className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-amber-300 mb-1">
              आपकी मास्टर एडमिन आईडी (Super Admin User ID):
            </label>
            <input
              type="text"
              required
              value={masterAdminId}
              onChange={(e) => setMasterAdminId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono font-bold bg-stone-950 border border-stone-700 rounded-lg text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-amber-300 mb-1">
              मास्टर पासवर्ड (Super Admin Password):
            </label>
            <input
              type="text"
              required
              value={masterAdminPass}
              onChange={(e) => setMasterAdminPass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono font-bold bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg cursor-pointer shadow-md transition-colors"
            >
              {masterSaved ? '✓ सुरक्षित हुआ!' : 'पासवर्ड बदलें'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. 30 OFFICIALS LIST & ACCESS CONTROL */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-700" />
              <h3 className="text-base font-bold text-stone-900">
                30 अधिकृत अधिकारी आईडी, पासवर्ड एवं अनुमति प्रबंधन (Official 30 Sub-Admins)
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                30 Accounts Active
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              वर्कशॉप एवं शाखाओं के 30 अधिकृत प्रतिनिधियों को अर्ध-पहुंच (Semi-Access) दी गई है। आप किसी भी अधिकारी का पासवर्ड बदल सकते हैं तथा अनुमति निर्धारित कर सकते हैं।
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onAddOfficialAccount && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>+ नया ऑफिशियल लॉगिन जोड़ें (New ID)</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1 border border-stone-300 cursor-pointer"
            >
              {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPasswords ? 'पासवर्ड छुपाएं' : 'सभी पासवर्ड दिखाएं'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('क्या आप सभी 30 खातों के पासवर्ड डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
                  onResetOfficialAccounts();
                }
              }}
              className="px-3 py-1.5 text-stone-600 hover:text-red-700 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-red-50 cursor-pointer"
              title="Reset all 30 accounts to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="अधिकारी का नाम, आईडी (e.g. OFFICIAL-MCS-01) या शॉप खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-stone-600 px-2">
            <span>
              प्रदर्शित अधिकारी: <strong>{filtered.length}</strong> of {officialAccounts.length}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              अर्ध-पहुंच (Semi-Access Mode)
            </span>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-100 text-stone-900 uppercase font-bold text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">Official User ID</th>
                <th className="py-2.5 px-3">Officer Name</th>
                <th className="py-2.5 px-3">Assigned Shop / Unit</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Login Password</th>
                <th className="py-2.5 px-3 text-center">Staff Add</th>
                <th className="py-2.5 px-3 text-center">Help Add</th>
                <th className="py-2.5 px-3 text-center">Seniority</th>
                <th className="py-2.5 px-3 text-center">ID Card Sign</th>
                <th className="py-2.5 px-3 text-right">Edit ID & Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filtered.map((acc) => (
                <tr key={acc.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-red-700 flex items-center gap-1.5">
                    <span>{acc.id}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.id, acc.id)}
                      className="text-stone-400 hover:text-stone-700 cursor-pointer"
                      title="Copy ID"
                    >
                      {copiedId === acc.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-stone-900">{acc.name}</td>
                  <td className="py-2.5 px-3 font-medium text-stone-700">
                    {acc.shopOrUnit} <span className="text-amber-800">({acc.division})</span>
                  </td>
                  <td className="py-2.5 px-3 text-stone-500">{acc.role}</td>
                  <td className="py-2.5 px-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                        {showPasswords ? acc.password : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.password, `${acc.id}-pass`)}
                        className="text-stone-400 hover:text-stone-700 cursor-pointer"
                        title="Copy Password"
                      >
                        {copiedId === `${acc.id}-pass` ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {acc.permissions?.canAddStaff !== false ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-stone-300">✗</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {acc.permissions?.canAddHelpRecord !== false ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-stone-300">✗</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {acc.permissions?.canEditSeniority ? (
                      <span className="text-red-700 font-bold text-[10px] bg-red-50 px-1 rounded">
                        Full Edit
                      </span>
                    ) : acc.permissions?.canViewSeniority !== false ? (
                      <span className="text-emerald-600 font-bold text-[10px]">View</span>
                    ) : (
                      <span className="text-stone-300">✗</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {acc.permissions?.canApproveIdCards ? (
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1 rounded">
                        Authorized
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">Restricted</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(acc)}
                        className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>आईडी व पासवर्ड बदलें</span>
                      </button>
                      {onDeleteOfficialAccount && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`क्या आप अधिकारी आईडी "${acc.id}" (${acc.name}) को हमेशा के लिए हटाना चाहते हैं?`)) {
                              onDeleteOfficialAccount(acc.id);
                            }
                          }}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                          title="अधिकारी खाता हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT OFFICIAL ACCOUNT MODAL */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-bold text-white">
                  अधिकारी आईडी, पासवर्ड व अनुमति बदलें ({editingAccount.id})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingAccount(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Official Login ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editId}
                    onChange={(e) => setEditId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Security Password (पासवर्ड) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold text-red-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  पदाधिकारी का नाम (Comrade Name) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    आवंटित शॉप या डिपो (Assigned Shop)
                  </label>
                  <input
                    type="text"
                    value={editShop}
                    onChange={(e) => setEditShop(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    पद / ज़िम्मेदारी (Role)
                  </label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              {/* Granular Permission Toggles: "me jitna chahu utna hi access milega" */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <span className="text-xs font-bold text-stone-900 block">
                  अनुमति नियंत्रण (Access Permissions for this Officer):
                </span>
                <p className="text-[11px] text-stone-500 mb-2">
                  सुपर एडमिन के रूप में आप तय कर सकते हैं कि इस अधिकारी को कौन-कौन सी सुविधाएं मिलेंगी।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canAddStaff}
                      onChange={(e) => setCanAddStaff(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      कर्मचारी नाम व डेटा जोड़ना (Add Staff)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canAddHelpRecord}
                      onChange={(e) => setCanAddHelpRecord(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      सहायता रिकॉर्ड व फोटो जोड़ना (Add Help)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canViewSeniority}
                      onChange={(e) => setCanViewSeniority(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      वरिष्ठता सूची देखना (View Seniority)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canEditSeniority}
                      onChange={(e) => setCanEditSeniority(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      वरिष्ठता सूची बदलना (Edit Seniority)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canApproveIdCards}
                      onChange={(e) => setCanApproveIdCards(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      डिजिटल कार्ड साइन / अप्रूव करना
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canDeleteData}
                      onChange={(e) => setCanDeleteData(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-red-700">
                      डेटा हटाना (Delete Data Access)
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  परिवर्तन सुरक्षित करें (Save Credentials)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW OFFICIAL ACCOUNT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-bold text-white">
                  नया अधिकृत अधिकारी खाता बनाएं (Create New Official ID)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewAccount} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Official Login ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    placeholder="e.g. OFFICIAL-MCS-31"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Password (पासवर्ड) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold text-red-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  पदाधिकारी का नाम (Officer Comrade Name) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Comrade Rajesh Kumar"
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    आवंटित शॉप / डिपो (Assigned Shop)
                  </label>
                  <input
                    type="text"
                    value={newShop}
                    onChange={(e) => setNewShop(e.target.value)}
                    placeholder="e.g. Bogie Shop, Wheel Shop"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    डिवीजन (Division)
                  </label>
                  <select
                    value={newDivision}
                    onChange={(e) => setNewDivision(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option value="MCS">Mancheswar (MCS)</option>
                    <option value="KUR">Khurda Road (KUR)</option>
                    <option value="WAT">Waltair (WAT)</option>
                    <option value="SBP">Sambalpur (SBP)</option>
                    <option value="HQ">Zonal HQ (BBS)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    पदनाम (Union Role)
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Shop Representative / Joint Secy"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    मोबाइल नंबर (Phone)
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 94370 00000"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>
              </div>

              {/* Granular Permissions for New Account */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block font-bold text-stone-800 mb-2">
                  इस खाते को अनुमतियां (Permissions Assignment)
                </label>
                <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canAddStaff}
                      onChange={(e) => setCanAddStaff(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      नया कर्मचारी जोड़ना (Add Staff)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canAddHelpRecord}
                      onChange={(e) => setCanAddHelpRecord(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      सहायता रिकॉर्ड दर्ज करना (Add Help)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canViewSeniority}
                      onChange={(e) => setCanViewSeniority(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      वरिष्ठता सूची देखना (View Seniority)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canEditSeniority}
                      onChange={(e) => setCanEditSeniority(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      वरिष्ठता सूची संपादन (Edit Seniority)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canManageGrievance}
                      onChange={(e) => setCanManageGrievance(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      शिकायत देखना व टिप्पणी (Grievance Review)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={canDeleteData}
                      onChange={(e) => setCanDeleteData(e.target.checked)}
                      className="rounded text-red-600"
                    />
                    <span className="text-xs font-medium text-red-700">
                      डेटा हटाना (Delete Data Access)
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  नया खाता सक्रिय करें (Create Account)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


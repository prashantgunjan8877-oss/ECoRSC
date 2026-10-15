import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StaffHelpRecord } from '../types';
import {
  HeartHandshake,
  Search,
  Filter,
  PlusCircle,
  CheckCircle2,
  Calendar,
  Building,
  User,
  FileText,
  Eye,
  Camera,
  Download,
} from 'lucide-react';

interface StaffHelpDirectoryProps {
  records: StaffHelpRecord[];
  onOpenAddModal?: () => void;
  isOfficerLoggedIn?: boolean;
}

export const StaffHelpDirectory: React.FC<StaffHelpDirectoryProps> = ({
  records,
  onOpenAddModal,
  isOfficerLoggedIn,
}) => {
  const { lang } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedShop, setSelectedShop] = useState('All');

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      !searchQuery.trim() ||
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.pfNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.assistedByOfficialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || rec.helpCategory === selectedCategory;
    const matchesShop = selectedShop === 'All' || rec.shopOrUnit === selectedShop;

    return matchesSearch && matchesCat && matchesShop;
  });

  const handleOpenDoc = (url?: string) => {
    if (!url) return;
    if (url.startsWith('data:')) {
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
      }
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="py-12 bg-stone-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-emerald-700 text-white rounded-xl shadow-xs">
                <HeartHandshake className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {lang === 'hi'
                      ? 'कर्मचारी सहायता एवं कल्याण कार्य रजिस्टर'
                      : 'Staff Welfare & Assistance Action Log'}
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Official Aid Log
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'hi'
                    ? 'यूनियन के 30 अधिकृत पदाधिकारियों द्वारा समय-समय पर कर्मचारियों को की गई सहायता, चिकित्सा राहत व समाधान सूची।'
                    : 'Record of welfare assistance, medical relief, PF support and grievance resolution rendered by official cadre.'}
                </p>
              </div>
            </div>

            {isOfficerLoggedIn && onOpenAddModal && (
              <button
                type="button"
                onClick={onOpenAddModal}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-emerald-200" />
                <span>+ नई सहायता प्रविष्टि जोड़ें (Add Help Record)</span>
              </button>
            )}
          </div>

          {/* Search & Filters */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={
                  lang === 'hi'
                    ? 'कर्मचारी का नाम, पीएफ नंबर या विवरण खोजें...'
                    : 'Search by employee name, PF no, or description...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All">All Categories (सभी सहायता प्रकार)</option>
                <option value="Medical Relief">Medical Relief (चिकित्सा सहायता)</option>
                <option value="PF / Financial Assistance">PF / Financial Assistance (पीएफ / अग्रिम)</option>
                <option value="Mutual Transfer Support">Mutual Transfer Support (म्यूचुअल ट्रांसफर)</option>
                <option value="Quarters Issue">Quarters Issue (आवास आवंटन/मरम्मत)</option>
                <option value="Grievance / DAR Defense">Grievance / DAR Defense (चार्जशीट बचाव)</option>
                <option value="Bereavement Relief">Bereavement Relief (शोक राहत)</option>
                <option value="Safety & Tool Support">Safety & Tool Support (संरक्षा उपकरण)</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-600 px-2">
              <span>
                कुल प्रविष्टियां: <strong>{filteredRecords.length}</strong>
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                ✓ 30 Officials Authorized
              </span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.helpCategory}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 mt-2">
                      {item.employeeName}
                    </h3>
                    <div className="text-xs text-stone-500 font-mono">
                      PF: {item.pfNumber} · {item.shopOrUnit} ({item.division})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-400 block font-mono">{item.date}</span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 justify-end mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.status}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-700">
                  <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">
                    कर्मचारी समस्या / आवेदन (Matter Reported)
                  </div>
                  <p>{item.description}</p>
                </div>

                {/* Relief Given / Action Taken */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                  <div className="text-[10px] font-bold uppercase text-emerald-800 mb-1">
                    यूनियन द्वारा की गई सहायता व समाधान (Action Taken / Relief Delivered)
                  </div>
                  <p className="font-medium">{item.reliefGivenOrActionTaken}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    सहायताकर्ता:{' '}
                    <strong className="text-stone-900">{item.assistedByOfficialName}</strong>{' '}
                    <span className="text-stone-400 font-mono">({item.assistedByOfficialId})</span>
                  </span>
                </div>

                {item.attachedPhotoOrDoc && (
                  <button
                    type="button"
                    onClick={() => handleOpenDoc(item.attachedPhotoOrDoc)}
                    className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-stone-300 cursor-pointer w-fit"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-700" />
                    <span>दस्तावेज़/फोटो देखें</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

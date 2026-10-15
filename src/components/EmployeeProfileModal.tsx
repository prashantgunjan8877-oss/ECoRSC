import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { EmployeeRecord, StaffHelpRecord } from '../types';
import {
  User,
  X,
  IdCard,
  Building,
  Wrench,
  Layers,
  HeartHandshake,
  Calendar,
  Phone,
  Droplet,
  FileText,
  ShieldCheck,
  Award,
  Plus,
  Printer,
  CheckCircle2,
  FileCheck,
  Eye,
  ExternalLink,
} from 'lucide-react';

interface EmployeeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeRecord | null;
  helpRecords: StaffHelpRecord[];
  onOpenCardModal: (emp: EmployeeRecord) => void;
  onAddNewHelpForEmployee?: (emp: EmployeeRecord) => void;
  isOfficerLoggedIn?: boolean;
}

export const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
  isOpen,
  onClose,
  employee,
  helpRecords,
  onOpenCardModal,
  onAddNewHelpForEmployee,
  isOfficerLoggedIn = true,
}) => {
  const { lang } = useLanguage();
  const [selectedDocPreview, setSelectedDocPreview] = useState<string | null>(null);

  if (!isOpen || !employee) return null;

  // Filter help records matching this staff member by PF number or Name
  const employeeHelpHistory = helpRecords.filter(
    (h) =>
      (employee.pfNumber && h.pfNumber && h.pfNumber.trim().toLowerCase() === employee.pfNumber.trim().toLowerCase()) ||
      (employee.fullName && h.employeeName && h.employeeName.trim().toLowerCase() === employee.fullName.trim().toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-700 text-white rounded-lg">
              <User className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{employee.fullName}</h3>
                {employee.cardNumber4Digit && (
                  <span className="bg-amber-500 text-stone-950 text-xs font-mono font-extrabold px-2 py-0.5 rounded-full">
                    कार्ड संख्या #{employee.cardNumber4Digit}
                  </span>
                )}
                <span className="bg-emerald-800 text-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                PF: <span className="font-mono text-stone-200">{employee.pfNumber}</span> · HRMS: <span className="font-mono text-stone-200">{employee.hrmsId}</span> · {employee.division} Division
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Dossier: Photo & Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-stone-50 p-5 rounded-xl border border-stone-200">
            {/* Photo Column (3 cols) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
              <div className="w-28 h-32 rounded-xl bg-stone-800 border-2 border-amber-500 shadow-md overflow-hidden flex items-center justify-center relative">
                {employee.photoUrl ? (
                  <img
                    src={employee.photoUrl}
                    alt={employee.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-300">
                    <span className="text-3xl font-extrabold text-amber-400">
                      {employee.fullName ? employee.fullName.charAt(0) : 'R'}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-1">Railwayman</span>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  {employee.membershipType}
                </span>
              </div>
            </div>

            {/* Core Details Grid (9 cols) */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Designation */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Designation</span>
                <span className="font-bold text-stone-900 text-sm">{employee.designation}</span>
              </div>

              {/* Shop / Unit */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Shop / Unit</span>
                <span className="font-bold text-amber-800 text-sm">{employee.shopOrUnit || 'General Pool'}</span>
              </div>

              {/* Department */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Department</span>
                <span className="font-semibold text-stone-900">{employee.department}</span>
              </div>

              {/* Union Post (यूनियन पद) */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">यूनियन पद (Union Post)</span>
                <span className="font-bold text-red-700 text-sm">
                  {employee.unionPost || 'सक्रिय सदस्य (Union Member)'}
                </span>
              </div>

              {/* Category (कोटि) */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Category (वर्ग)</span>
                <span className="font-bold text-stone-900">
                  {employee.category || 'General (UR)'}
                </span>
              </div>

              {/* 4-Digit Card No */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">4-Digit Card No.</span>
                <span className="font-mono font-bold text-stone-900">
                  {employee.cardNumber4Digit || 'N/A'}
                </span>
              </div>

              {/* Station & Division */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Station & Division</span>
                <span className="font-semibold text-stone-900">{employee.station} ({employee.division})</span>
              </div>

              {/* Blood Group */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Blood Group</span>
                <span className="font-bold text-red-600">{employee.bloodGroup}</span>
              </div>

              {/* Mobile Contact */}
              <div className="bg-white p-3 rounded-lg border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Mobile Contact</span>
                <span className="font-mono text-stone-900 font-medium">{employee.mobile}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <span className="text-xs text-amber-900 font-medium">
                {lang === 'hi'
                  ? 'यह डेटा ईकोरएससी एवं 30 ऑफिशियल आईडी द्वारा अधिकृत एवं सत्यापित है।'
                  : 'Authorized personnel record accessible to Super Admin and official sub-admins.'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onAddNewHelpForEmployee && (
                <button
                  type="button"
                  onClick={() => onAddNewHelpForEmployee(employee)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-200" />
                  <span>+ सहायता दर्ज करें (Add Help)</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCardModal(employee);
                }}
                className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <IdCard className="w-3.5 h-3.5 text-amber-300" />
                <span>डिजिटल आईडी कार्ड खोलें (Open ID Card)</span>
              </button>
            </div>
          </div>

          {/* Date-wise Help & Assistance History (समय-समय पर की गई सहायता) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-red-700" />
                <h4 className="text-sm font-bold text-stone-900">
                  {lang === 'hi'
                    ? 'समय-समय पर की गई सहायता का दिनांकवार विवरण (Date-wise Assistance History)'
                    : 'Date-wise Assistance & Welfare Record'}
                </h4>
              </div>
              <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                कुल सहायता: {employeeHelpHistory.length}
              </span>
            </div>

            {employeeHelpHistory.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs">
                <HeartHandshake className="w-8 h-8 text-stone-300 mx-auto mb-1.5" />
                <p>इस कर्मचारी के नाम पर अभी तक कोई सहायता रिकॉर्ड दर्ज नहीं है।</p>
                {onAddNewHelpForEmployee && (
                  <button
                    type="button"
                    onClick={() => onAddNewHelpForEmployee(employee)}
                    className="mt-3 text-red-700 hover:text-red-800 font-bold underline cursor-pointer"
                  >
                    + पहली सहायता का विवरण दर्ज करें
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {employeeHelpHistory.map((help) => (
                  <div
                    key={help.id}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-red-300 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-red-600" />
                          <span>{help.date}</span>
                        </span>
                        <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          {help.helpCategory}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{help.status}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase font-semibold block">समस्या / सहायता आवश्यकता:</span>
                        <p className="text-stone-800 font-medium">{help.description}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase font-semibold block">यूनियन द्वारा प्रदान राहत / कार्यवाही:</span>
                        <p className="text-emerald-900 font-semibold">{help.reliefGivenOrActionTaken}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                      <div>
                        अधिकृत अधिकारी:{' '}
                        <strong className="text-stone-800 font-medium">
                          {help.assistedByOfficialName} ({help.assistedByOfficialId})
                        </strong>
                      </div>

                      {help.attachedPhotoOrDoc && (
                        <button
                          type="button"
                          onClick={() => setSelectedDocPreview(help.attachedPhotoOrDoc!)}
                          className="text-red-700 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>संलग्न फोटो / दस्तावेज़ देखें ({help.attachedDocName || 'Attachment'})</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            ECORSC Confidential Cadre Record
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Attachment Preview Modal */}
      {selectedDocPreview && (
        <div
          className="fixed inset-0 z-60 bg-stone-950/90 flex items-center justify-center p-4"
          onClick={() => setSelectedDocPreview(null)}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-3">
              <h5 className="font-bold text-sm text-stone-900">संलग्न दस्तावेज़ / फोटो</h5>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {selectedDocPreview.startsWith('data:image/') || selectedDocPreview.startsWith('http') ? (
              <img src={selectedDocPreview} alt="Attached Evidence" className="w-full h-auto rounded-lg" />
            ) : (
              <iframe src={selectedDocPreview} title="PDF Viewer" className="w-full h-96 border rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

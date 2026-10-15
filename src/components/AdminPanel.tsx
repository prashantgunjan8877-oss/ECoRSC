import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Circular,
  DivisionId,
  DivisionInfo,
  EmergencyContact,
  EmployeeRecord,
  GrievanceRecord,
  GrievanceStatus,
  OfficialUserAccount,
  PortalSettings,
  SeniorityRecord,
  StaffHelpRecord,
  UnionLeader,
} from '../types';
import { DEMANDS_CHARTER } from '../data/mockData';
import { ECORSCLogo } from './ECORSCLogo';
import { SeniorityAdminTab } from './admin/SeniorityAdminTab';
import { OfficialsAdminTab } from './admin/OfficialsAdminTab';
import { StaffHelpAdminTab } from './admin/StaffHelpAdminTab';
import { FileUploadInput } from './FileUploadInput';
import {
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  Users,
  Search,
  Filter,
  Send,
  Printer,
  Edit,
  Trash2,
  Upload,
  Download,
  Image,
  X,
  Settings,
  Wrench,
  Building,
  KeyRound,
  Megaphone,
  Vote,
  Award,
  Database,
  RotateCcw,
  PhoneCall,
  HeartHandshake,
  Layers,
  Shield,
} from 'lucide-react';

interface AdminPanelProps {
  // Grievances
  grievances: GrievanceRecord[];
  onAddGrievance: (g: GrievanceRecord) => void;
  onUpdateGrievanceFull: (g: GrievanceRecord) => void;
  onDeleteGrievance: (id: string) => void;

  // Circulars
  circulars: Circular[];
  onAddCircular: (c: Circular) => void;
  onUpdateCircular: (c: Circular) => void;
  onDeleteCircular: (id: string) => void;

  // Employees & Shops
  employees: EmployeeRecord[];
  onAddEmployee: (emp: EmployeeRecord) => void;
  onUpdateEmployee: (emp: EmployeeRecord) => void;
  onDeleteEmployee: (id: string) => void;
  onBulkImportEmployees: (list: EmployeeRecord[]) => void;

  // Seniority
  seniorityList: SeniorityRecord[];
  onAddSeniority: (s: SeniorityRecord) => void;
  onUpdateSeniority: (s: SeniorityRecord) => void;
  onDeleteSeniority: (id: string) => void;

  // 30 Official Sub-Admin Accounts
  officialAccounts: OfficialUserAccount[];
  onUpdateOfficialAccount: (acc: OfficialUserAccount) => void;
  onAddOfficialAccount?: (acc: OfficialUserAccount) => void;
  onDeleteOfficialAccount?: (id: string) => void;
  onResetOfficialAccounts: () => void;

  // Staff Help Records
  staffHelpRecords: StaffHelpRecord[];
  onAddStaffHelpRecord: (r: StaffHelpRecord) => void;
  onUpdateStaffHelpRecord: (r: StaffHelpRecord) => void;
  onDeleteStaffHelpRecord: (id: string) => void;

  // Divisions
  divisions: DivisionInfo[];
  onUpdateDivision: (div: DivisionInfo) => void;

  // Demands
  demands: typeof DEMANDS_CHARTER;
  onAddDemand: (d: typeof DEMANDS_CHARTER[0]) => void;
  onUpdateDemand: (d: typeof DEMANDS_CHARTER[0]) => void;
  onDeleteDemand: (id: string) => void;

  // Leaders
  leaders: UnionLeader[];
  onAddLeader: (l: UnionLeader) => void;
  onUpdateLeader: (index: number, l: UnionLeader) => void;
  onDeleteLeader: (index: number) => void;

  // Emergency Helpline Contacts
  emergencyContacts: EmergencyContact[];
  onAddEmergencyContact: (c: EmergencyContact) => void;
  onUpdateEmergencyContact: (c: EmergencyContact) => void;
  onDeleteEmergencyContact: (id: string) => void;
  initialAdminTab?: string;

  // Settings & Logo
  customLogoUrl: string;
  onSetCustomLogoUrl: (url: string) => void;
  portalSettings: PortalSettings;
  onUpdatePortalSettings: (settings: PortalSettings) => void;
  onLogout?: () => void;
  onOpenLogoModal?: () => void;
  activeOfficerId?: string;

  // Backup & Reset
  onRestoreAllData: (data: any) => void;
  onResetToDefaults: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  grievances,
  onAddGrievance,
  onUpdateGrievanceFull,
  onDeleteGrievance,
  circulars,
  onAddCircular,
  onUpdateCircular,
  onDeleteCircular,
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onBulkImportEmployees,
  seniorityList,
  onAddSeniority,
  onUpdateSeniority,
  onDeleteSeniority,
  officialAccounts,
  onUpdateOfficialAccount,
  onAddOfficialAccount,
  onDeleteOfficialAccount,
  onResetOfficialAccounts,
  staffHelpRecords,
  onAddStaffHelpRecord,
  onUpdateStaffHelpRecord,
  onDeleteStaffHelpRecord,
  divisions,
  onUpdateDivision,
  demands,
  onAddDemand,
  onUpdateDemand,
  onDeleteDemand,
  leaders,
  onAddLeader,
  onUpdateLeader,
  onDeleteLeader,
  emergencyContacts,
  onAddEmergencyContact,
  onUpdateEmergencyContact,
  onDeleteEmergencyContact,
  initialAdminTab,
  customLogoUrl,
  onSetCustomLogoUrl,
  portalSettings,
  onUpdatePortalSettings,
  onLogout,
  onOpenLogoModal,
  activeOfficerId = 'SUPERADMIN-ECORSC',
  onRestoreAllData,
  onResetToDefaults,
}) => {
  const { lang } = useLanguage();

  // Active Admin Sub-tab
  const [activeAdminTab, setActiveAdminTab] = useState<
    | 'employees'
    | 'seniority'
    | 'officials'
    | 'staffhelp'
    | 'grievances'
    | 'circulars'
    | 'emergency'
    | 'divisions'
    | 'demands'
    | 'leaders'
    | 'settings'
    | 'backup'
  >((initialAdminTab as any) || 'employees');

  // Emergency Form State (Add / Edit)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [editingEmergencyId, setEditingEmergencyId] = useState<string | null>(null);
  const [emRole, setEmRole] = useState('');
  const [emName, setEmName] = useState('');
  const [emPhone, setEmPhone] = useState('');
  const [emLocation, setEmLocation] = useState('');
  const [emIs24x7, setEmIs24x7] = useState(true);

  // Employee Form State (Add / Edit)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmpId, setEditingEmpId] = useState<string | null>(null);
  const [empFullName, setEmpFullName] = useState('');
  const [empPfNumber, setEmpPfNumber] = useState('');
  const [empHrmsId, setEmpHrmsId] = useState('');
  const [empDesignation, setEmpDesignation] = useState('');
  const [empDepartment, setEmpDepartment] = useState('Operating');
  const [empShopOrUnit, setEmpShopOrUnit] = useState('Bogie Shop (Shop-1)');
  const [empDivision, setEmpDivision] = useState<DivisionId>('WAT');
  const [empStation, setEmpStation] = useState('');
  const [empBloodGroup, setEmpBloodGroup] = useState('B+');
  const [empMobile, setEmpMobile] = useState('');
  const [empMembershipType, setEmpMembershipType] = useState<EmployeeRecord['membershipType']>('Cadre');

  // Employee table filters
  const [adminDeptFilter, setAdminDeptFilter] = useState('ALL');
  const [adminShopFilter, setAdminShopFilter] = useState('ALL');
  const [adminDivisionFilter, setAdminDivisionFilter] = useState<'ALL' | DivisionId>('ALL');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Bulk CSV Import State
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState('');

  // Grievance Edit Modal
  const [editingGrievance, setEditingGrievance] = useState<GrievanceRecord | null>(null);
  const [showGrievanceEditModal, setShowGrievanceEditModal] = useState(false);
  const [gApplicantName, setGApplicantName] = useState('');
  const [gEmployeeNo, setGEmployeeNo] = useState('');
  const [gSubject, setGSubject] = useState('');
  const [gDescription, setGDescription] = useState('');
  const [gRelief, setGRelief] = useState('');
  const [gStatus, setGStatus] = useState<GrievanceStatus>('Submitted');
  const [gOfficer, setGOfficer] = useState('');
  const [gDivision, setGDivision] = useState<DivisionId>('WAT');
  const [gStation, setGStation] = useState('');
  const [gRemarkToAdd, setGRemarkToAdd] = useState('');

  // Circular Edit Modal
  const [editingCircular, setEditingCircular] = useState<Circular | null>(null);
  const [showCircularModal, setShowCircularModal] = useState(false);
  const [circRef, setCircRef] = useState('');
  const [circTitleEn, setCircTitleEn] = useState('');
  const [circTitleHi, setCircTitleHi] = useState('');
  const [circCategory, setCircCategory] = useState<Circular['category']>('PNM Minutes');
  const [circIssuedBy, setCircIssuedBy] = useState<Circular['issuedBy']>('ECORSC HQ');
  const [circSummaryEn, setCircSummaryEn] = useState('');
  const [circKeyPoints, setCircKeyPoints] = useState('');

  // Division Edit Modal
  const [editingDiv, setEditingDiv] = useState<DivisionInfo | null>(null);
  const [divSecretary, setDivSecretary] = useState('');
  const [divPresident, setDivPresident] = useState('');
  const [divPhone, setDivPhone] = useState('');
  const [divEmail, setDivEmail] = useState('');
  const [divHq, setDivHq] = useState('');
  const [divDepotsText, setDivDepotsText] = useState('');

  // Demand Edit Modal
  const [editingDemand, setEditingDemand] = useState<typeof DEMANDS_CHARTER[0] | null>(null);
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [demandTitleEn, setDemandTitleEn] = useState('');
  const [demandTitleHi, setDemandTitleHi] = useState('');
  const [demandDescEn, setDemandDescEn] = useState('');
  const [demandDescHi, setDemandDescHi] = useState('');
  const [demandVotes, setDemandVotes] = useState(0);

  // Leader Edit Modal
  const [editingLeaderIndex, setEditingLeaderIndex] = useState<number | null>(null);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [leaderName, setLeaderName] = useState('');
  const [leaderRoleEn, setLeaderRoleEn] = useState('');
  const [leaderRoleHi, setLeaderRoleHi] = useState('');
  const [leaderBioEn, setLeaderBioEn] = useState('');
  const [leaderBioHi, setLeaderBioHi] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [leaderLocation, setLeaderLocation] = useState('');
  const [leaderPhotoUrl, setLeaderPhotoUrl] = useState('');
  const [leaderAchievementsEn, setLeaderAchievementsEn] = useState('');
  const [leaderAchievementsHi, setLeaderAchievementsHi] = useState('');
  const [leaderBody, setLeaderBody] = useState<UnionLeader['body']>('Central ECORSC');

  // Settings Form State
  const [tempLogoUrl, setTempLogoUrl] = useState(customLogoUrl);
  const [editUnionNameEn, setEditUnionNameEn] = useState(portalSettings.unionNameEn);
  const [editUnionNameHi, setEditUnionNameHi] = useState(portalSettings.unionNameHi);
  const [editNoticeEn, setEditNoticeEn] = useState(portalSettings.announcementNoticeEn);
  const [editNoticeHi, setEditNoticeHi] = useState(portalSettings.announcementNoticeHi);
  const [editPhone, setEditPhone] = useState(portalSettings.controlRoomPhone);
  const [editEmail, setEditEmail] = useState(portalSettings.controlRoomEmail);
  const [editAddress, setEditAddress] = useState(portalSettings.headquartersAddress);
  const [editAdminId, setEditAdminId] = useState(portalSettings.adminOfficerId);
  const [editPassword, setEditPassword] = useState(portalSettings.adminPassword);

  // Backup file input ref
  const [backupJsonText, setBackupJsonText] = useState('');

  // Distinct departments and shops
  const distinctDepartments = Array.from(new Set(employees.map((e) => e.department).filter(Boolean))).sort();
  const distinctShops = Array.from(new Set(employees.map((e) => e.shopOrUnit).filter(Boolean))).sort();

  // --- EMPLOYEE HANDLERS ---
  const handleOpenAddEmployee = () => {
    setEditingEmpId(null);
    setEmpFullName('');
    setEmpPfNumber(`PF${Math.floor(530000000 + Math.random() * 9000000)}`);
    setEmpHrmsId(`ECOR${Math.floor(1000 + Math.random() * 9000)}`);
    setEmpDesignation('');
    setEmpDepartment('Store & Workshop');
    setEmpShopOrUnit('Bogie Shop (Shop-1)');
    setEmpDivision('MCS');
    setEmpStation('Mancheswar Workshop (MCS)');
    setEmpBloodGroup('B+');
    setEmpMobile('+91 94370 ');
    setEmpMembershipType('Cadre');
    setShowEmployeeModal(true);
  };

  const handleOpenEditEmployee = (emp: EmployeeRecord) => {
    setEditingEmpId(emp.id);
    setEmpFullName(emp.fullName);
    setEmpPfNumber(emp.pfNumber);
    setEmpHrmsId(emp.hrmsId);
    setEmpDesignation(emp.designation);
    setEmpDepartment(emp.department);
    setEmpShopOrUnit(emp.shopOrUnit || 'General Pool');
    setEmpDivision(emp.division);
    setEmpStation(emp.station);
    setEmpBloodGroup(emp.bloodGroup);
    setEmpMobile(emp.mobile);
    setEmpMembershipType(emp.membershipType);
    setShowEmployeeModal(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empFullName || !empPfNumber) {
      alert('Please provide full name and PF number.');
      return;
    }

    if (editingEmpId) {
      const updated: EmployeeRecord = {
        id: editingEmpId,
        fullName: empFullName,
        pfNumber: empPfNumber,
        hrmsId: empHrmsId || 'ECOR0000',
        designation: empDesignation || 'Railway Employee',
        department: empDepartment,
        shopOrUnit: empShopOrUnit || 'General Pool',
        division: empDivision,
        station: empStation || 'Station',
        bloodGroup: empBloodGroup,
        mobile: empMobile || '+91 Mobile',
        membershipType: empMembershipType,
        joiningYear: '2016',
        status: 'Active',
      };
      onUpdateEmployee(updated);
      alert(`Employee ${empFullName} record updated successfully!`);
    } else {
      const newEmp: EmployeeRecord = {
        id: `emp-${Date.now()}`,
        fullName: empFullName,
        pfNumber: empPfNumber,
        hrmsId: empHrmsId || 'ECOR0000',
        designation: empDesignation || 'Railway Employee',
        department: empDepartment,
        shopOrUnit: empShopOrUnit || 'General Pool',
        division: empDivision,
        station: empStation || 'Station',
        bloodGroup: empBloodGroup,
        mobile: empMobile || '+91 Mobile',
        membershipType: empMembershipType,
        joiningYear: new Date().getFullYear().toString(),
        status: 'Active',
      };
      onAddEmployee(newEmp);
      alert(`New railwayman ${empFullName} enrolled into ECORSC database!`);
    }
    setShowEmployeeModal(false);
  };

  const handleProcessCsvImport = () => {
    if (!csvText.trim()) return;
    const lines = csvText.trim().split('\n');
    const newRecords: EmployeeRecord[] = [];
    const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cols = line.split(',').map((c) => c.replace(/^"|"$/g, '').trim());
      if (cols.length >= 2) {
        newRecords.push({
          id: `emp-csv-${Date.now()}-${i}`,
          fullName: cols[0] || 'Railway Staff',
          pfNumber: cols[1] || `PF${Math.floor(530000000 + Math.random() * 9000000)}`,
          hrmsId: cols[2] || `ECOR${Math.floor(1000 + Math.random() * 9000)}`,
          designation: cols[3] || 'Staff',
          department: cols[4] || 'Operating',
          shopOrUnit: cols[5] || 'General Shop',
          division: (cols[6] as DivisionId) || 'KUR',
          station: cols[7] || 'Station',
          bloodGroup: cols[8] || 'B+',
          mobile: cols[9] || '+91 94370 00000',
          membershipType: 'Cadre',
          joiningYear: '2020',
          status: 'Active',
        });
      }
    }

    if (newRecords.length > 0) {
      onBulkImportEmployees(newRecords);
      setShowCsvModal(false);
      setCsvText('');
      alert(`Successfully imported ${newRecords.length} railway staff into ECORSC database!`);
    } else {
      alert('Could not parse any valid employee records.');
    }
  };

  // --- GRIEVANCE FULL CRUD HANDLERS ---
  const handleOpenAddGrievance = () => {
    setEditingGrievance(null);
    setGApplicantName('');
    setGEmployeeNo('');
    setGSubject('');
    setGDescription('');
    setGRelief('');
    setGStatus('Submitted');
    setGOfficer('Comrade K. S. Murthy (Divisional Secy, WAT)');
    setGDivision('WAT');
    setGStation('Visakhapatnam (VSKP)');
    setGRemarkToAdd('');
    setShowGrievanceEditModal(true);
  };

  const handleOpenEditGrievance = (g: GrievanceRecord) => {
    setEditingGrievance(g);
    setGApplicantName(g.applicantName);
    setGEmployeeNo(g.employeeNo);
    setGSubject(g.subject);
    setGDescription(g.description);
    setGRelief(g.reliefSought);
    setGStatus(g.status);
    setGOfficer(g.assignedOfficer);
    setGDivision(g.division);
    setGStation(g.station);
    setGRemarkToAdd('');
    setShowGrievanceEditModal(true);
  };

  const handleSaveGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gApplicantName || !gSubject) return;

    if (editingGrievance) {
      const updatedRemarks = gRemarkToAdd.trim()
        ? [gRemarkToAdd.trim(), ...editingGrievance.remarks]
        : editingGrievance.remarks;

      const updated: GrievanceRecord = {
        ...editingGrievance,
        applicantName: gApplicantName,
        employeeNo: gEmployeeNo,
        subject: gSubject,
        description: gDescription,
        reliefSought: gRelief,
        status: gStatus,
        assignedOfficer: gOfficer,
        division: gDivision,
        station: gStation,
        remarks: updatedRemarks,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      onUpdateGrievanceFull(updated);
      alert('Grievance dossier updated successfully!');
    } else {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newG: GrievanceRecord = {
        id: `gr-${Date.now()}`,
        trackingNumber: `ECORSC-${gDivision}-2026-${randomSuffix}`,
        submittedAt: new Date().toISOString().split('T')[0],
        applicantName: gApplicantName,
        employeeNo: gEmployeeNo || 'PF530000000',
        designation: 'Staff',
        division: gDivision,
        station: gStation,
        department: 'Operating',
        phone: '+91 94370 00000',
        category: 'Running Staff & Loco Pilots',
        subject: gSubject,
        description: gDescription,
        reliefSought: gRelief,
        status: gStatus,
        assignedOfficer: gOfficer,
        remarks: gRemarkToAdd.trim()
          ? [gRemarkToAdd.trim()]
          : ['Registered directly by ECORSC Administration.'],
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      onAddGrievance(newG);
      alert(`New grievance created with ID: ${newG.trackingNumber}`);
    }
    setShowGrievanceEditModal(false);
  };

  // --- CIRCULAR FULL CRUD HANDLERS ---
  const handleOpenAddCircular = () => {
    setEditingCircular(null);
    setCircRef(`ECORSC/PNM/2026/${Math.floor(100 + Math.random() * 900)}`);
    setCircTitleEn('');
    setCircTitleHi('');
    setCircCategory('PNM Minutes');
    setCircIssuedBy('ECORSC HQ');
    setCircSummaryEn('');
    setCircKeyPoints('');
    setShowCircularModal(true);
  };

  const handleOpenEditCircular = (c: Circular) => {
    setEditingCircular(c);
    setCircRef(c.refNumber);
    setCircTitleEn(c.titleEn);
    setCircTitleHi(c.titleHi);
    setCircCategory(c.category);
    setCircIssuedBy(c.issuedBy);
    setCircSummaryEn(c.summaryEn);
    setCircKeyPoints(c.keyPoints.join('\n'));
    setShowCircularModal(true);
  };

  const handleSaveCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circRef || !circTitleEn) return;

    const pointsArray = circKeyPoints
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (editingCircular) {
      const updated: Circular = {
        ...editingCircular,
        refNumber: circRef,
        titleEn: circTitleEn,
        titleHi: circTitleHi || circTitleEn,
        category: circCategory,
        issuedBy: circIssuedBy,
        summaryEn: circSummaryEn,
        summaryHi: circSummaryEn,
        keyPoints: pointsArray.length > 0 ? pointsArray : editingCircular.keyPoints,
        pdfName: `${circRef.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      };
      onUpdateCircular(updated);
      alert('Circular updated successfully!');
    } else {
      const newCirc: Circular = {
        id: `circ-${Date.now()}`,
        refNumber: circRef,
        titleEn: circTitleEn,
        titleHi: circTitleHi || circTitleEn,
        date: new Date().toISOString().split('T')[0],
        issuedBy: circIssuedBy,
        category: circCategory,
        summaryEn: circSummaryEn,
        summaryHi: circSummaryEn,
        keyPoints: pointsArray.length > 0 ? pointsArray : ['Order enacted with immediate effect across ECoR.'],
        pdfName: `${circRef.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        isImportant: true,
      };
      onAddCircular(newCirc);
      alert('New circular published to Member Portal!');
    }
    setShowCircularModal(false);
  };

  // --- DIVISION EDIT HANDLERS ---
  const handleOpenEditDivision = (d: DivisionInfo) => {
    setEditingDiv(d);
    setDivSecretary(d.divisionalSecretary);
    setDivPresident(d.divisionalPresident);
    setDivPhone(d.contactPhone);
    setDivEmail(d.email);
    setDivHq(d.headquarters);
    setDivDepotsText(d.keyDepots.join(', '));
  };

  const handleSaveDivision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDiv) return;
    const depotsArray = divDepotsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: DivisionInfo = {
      ...editingDiv,
      divisionalSecretary: divSecretary,
      divisionalPresident: divPresident,
      contactPhone: divPhone,
      email: divEmail,
      headquarters: divHq,
      keyDepots: depotsArray,
    };
    onUpdateDivision(updated);
    setEditingDiv(null);
    alert(`${editingDiv.nameEn} details updated successfully!`);
  };

  // --- DEMAND HANDLERS ---
  const handleOpenAddDemand = () => {
    setEditingDemand(null);
    setDemandTitleEn('');
    setDemandTitleHi('');
    setDemandDescEn('');
    setDemandDescHi('');
    setDemandVotes(100);
    setShowDemandModal(true);
  };

  const handleOpenEditDemand = (d: typeof DEMANDS_CHARTER[0]) => {
    setEditingDemand(d);
    setDemandTitleEn(d.titleEn);
    setDemandTitleHi(d.titleHi);
    setDemandDescEn(d.descEn);
    setDemandDescHi(d.descHi);
    setDemandVotes(d.votes);
    setShowDemandModal(true);
  };

  const handleSaveDemand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demandTitleEn) return;

    if (editingDemand) {
      onUpdateDemand({
        ...editingDemand,
        titleEn: demandTitleEn,
        titleHi: demandTitleHi || demandTitleEn,
        descEn: demandDescEn,
        descHi: demandDescHi || demandDescEn,
        votes: Number(demandVotes) || 0,
      });
      alert('Demand item updated!');
    } else {
      onAddDemand({
        id: `d-${Date.now()}`,
        titleEn: demandTitleEn,
        titleHi: demandTitleHi || demandTitleEn,
        descEn: demandDescEn,
        descHi: demandDescHi || demandDescEn,
        votes: Number(demandVotes) || 0,
      });
      alert('New demand added to Charter!');
    }
    setShowDemandModal(false);
  };

  // --- LEADER HANDLERS ---
  const handleOpenAddLeader = () => {
    setEditingLeaderIndex(null);
    setLeaderName('');
    setLeaderRoleEn('');
    setLeaderRoleHi('');
    setLeaderBioEn('');
    setLeaderBioHi('');
    setLeaderPhone('');
    setLeaderLocation('Rail Sadan, Bhubaneswar');
    setLeaderPhotoUrl('');
    setLeaderAchievementsEn('');
    setLeaderAchievementsHi('');
    setLeaderBody('Central ECORSC');
    setShowLeaderModal(true);
  };

  const handleOpenEditLeader = (idx: number, l: UnionLeader) => {
    setEditingLeaderIndex(idx);
    setLeaderName(l.name);
    setLeaderRoleEn(l.roleEn);
    setLeaderRoleHi(l.roleHi);
    setLeaderBioEn(l.bioEn);
    setLeaderBioHi(l.bioHi);
    setLeaderPhone(l.phone || '');
    setLeaderLocation(l.location);
    setLeaderPhotoUrl(l.photoUrl || '');
    setLeaderAchievementsEn(l.achievementsEn?.join('\n') || '');
    setLeaderAchievementsHi(l.achievementsHi?.join('\n') || '');
    setLeaderBody(l.body || 'Central ECORSC');
    setShowLeaderModal(true);
  };

  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderName || !leaderRoleEn) return;

    const achEn = leaderAchievementsEn
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const achHi = leaderAchievementsHi
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const leaderObj: UnionLeader = {
      name: leaderName.trim(),
      roleEn: leaderRoleEn.trim(),
      roleHi: leaderRoleHi.trim() || leaderRoleEn.trim(),
      bioEn: leaderBioEn.trim(),
      bioHi: leaderBioHi.trim() || leaderBioEn.trim(),
      phone: leaderPhone.trim(),
      location: leaderLocation.trim(),
      body: leaderBody,
      photoUrl: leaderPhotoUrl.trim() || undefined,
      achievementsEn: achEn.length > 0 ? achEn : undefined,
      achievementsHi: achHi.length > 0 ? achHi : undefined,
    };

    if (editingLeaderIndex !== null) {
      onUpdateLeader(editingLeaderIndex, leaderObj);
      alert('पदाधिकारी प्रोफ़ाइल व उपलब्धियां सफलतापूर्वक अपडेट हुईं!');
    } else {
      onAddLeader(leaderObj);
      alert('नया पदाधिकारी प्रोफ़ाइल व उपलब्धियां जोड़ी गईं!');
    }
    setShowLeaderModal(false);
  };

  // --- EMERGENCY CONTACTS HANDLERS ---
  const handleOpenAddEmergency = () => {
    setEditingEmergencyId(null);
    setEmRole('');
    setEmName('');
    setEmPhone('');
    setEmLocation('');
    setEmIs24x7(true);
    setShowEmergencyModal(true);
  };

  const handleOpenEditEmergency = (c: EmergencyContact) => {
    setEditingEmergencyId(c.id);
    setEmRole(c.departmentOrRole);
    setEmName(c.name);
    setEmPhone(c.phone);
    setEmLocation(c.divisionOrCity || '');
    setEmIs24x7(c.isAvailable24x7 !== false);
    setShowEmergencyModal(true);
  };

  const handleSaveEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emName.trim() || !emPhone.trim()) {
      alert('कृपया नाम और फ़ोन नंबर दर्ज करें (Please enter Name and Phone)');
      return;
    }

    if (editingEmergencyId) {
      onUpdateEmergencyContact({
        id: editingEmergencyId,
        departmentOrRole: emRole.trim() || 'ECORSC Emergency Cell',
        name: emName.trim(),
        phone: emPhone.trim(),
        divisionOrCity: emLocation.trim(),
        isAvailable24x7: emIs24x7,
      });
      alert('आपातकालीन नंबर एवं पदाधिकारी विवरण सफलतापूर्वक अपडेट हुआ!');
    } else {
      onAddEmergencyContact({
        id: `em-${Date.now()}`,
        departmentOrRole: emRole.trim() || 'ECORSC Emergency Cell',
        name: emName.trim(),
        phone: emPhone.trim(),
        divisionOrCity: emLocation.trim(),
        isAvailable24x7: emIs24x7,
      });
      alert('नया आपातकालीन हेल्पलाइन नंबर सफलतापूर्वक जोड़ा गया!');
    }
    setShowEmergencyModal(false);
  };

  const handleDeleteEmergencyConfirm = (id: string, name: string) => {
    if (window.confirm(`क्या आप ${name} का आपातकालीन नंबर हटाना चाहते हैं? (Delete emergency contact?)`)) {
      onDeleteEmergencyContact(id);
    }
  };

  // --- BACKUP & RESTORE HANDLERS ---
  const handleDownloadFullBackup = () => {
    const fullBackup = {
      exportDate: new Date().toISOString(),
      portalSettings,
      employees,
      grievances,
      circulars,
      divisions,
      demands,
      leaders,
      emergencyContacts,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const a = document.createElement('a');
    a.href = jsonStr;
    a.download = `ECORSC_Full_Portal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRestoreBackup = () => {
    if (!backupJsonText.trim()) return;
    try {
      const parsed = JSON.parse(backupJsonText.trim());
      onRestoreAllData(parsed);
      alert('Full system database successfully restored from JSON backup!');
    } catch (err) {
      alert('Invalid JSON backup file. Please verify syntax.');
    }
  };

  const filteredAdminEmployees = employees.filter((emp) => {
    const matchesDiv = adminDivisionFilter === 'ALL' || emp.division === adminDivisionFilter;
    const matchesDept = adminDeptFilter === 'ALL' || emp.department === adminDeptFilter;
    const matchesShop = adminShopFilter === 'ALL' || emp.shopOrUnit === adminShopFilter;
    const q = adminSearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      emp.fullName.toLowerCase().includes(q) ||
      emp.pfNumber.toLowerCase().includes(q) ||
      emp.hrmsId.toLowerCase().includes(q) ||
      emp.station.toLowerCase().includes(q) ||
      emp.shopOrUnit?.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q);
    return matchesDiv && matchesDept && matchesShop && matchesQuery;
  });

  return (
    <div id="admin" className="py-12 bg-stone-100 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Master Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            {customLogoUrl ? (
              <img
                src={customLogoUrl}
                alt="Union Logo"
                className="w-14 h-14 object-contain rounded-xl shrink-0 shadow-xs"
              />
            ) : (
              <ECORSCLogo size={56} className="shrink-0" />
            )}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider">
                <span>MASTER ROOT ACCESS CONTROL</span>
                <span className="text-stone-300">/</span>
                <span>पूर्ण प्रशासनिक अधिकार</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                {lang === 'hi'
                  ? 'ईसीआरएससी मास्टर कंट्रोल सेंटर (सभी डेटा जोड़ें, बदलें व हटाएं)'
                  : 'ECORSC Master Control Center (Full Add, Edit & Delete Access)'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Root Officer: {portalSettings.adminOfficerId}</span>
            </span>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-red-700 bg-white border border-stone-300 rounded-lg hover:border-red-300 cursor-pointer"
              >
                Logout Officer
              </button>
            )}
          </div>
        </div>

        {/* Master Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200 rounded-xl mb-6 overflow-x-auto">
          {[
            { id: 'employees', label: `Staff & Shops (${employees.length})`, icon: Users },
            { id: 'seniority', label: `Seniority List (${seniorityList.length})`, icon: Layers },
            { id: 'officials', label: `30 Official IDs & Access (${officialAccounts.length})`, icon: Shield },
            { id: 'staffhelp', label: `Staff Welfare & Help (${staffHelpRecords.length})`, icon: HeartHandshake },
            { id: 'grievances', label: `Grievances (${grievances.length})`, icon: FileText },
            { id: 'circulars', label: `Circulars (${circulars.length})`, icon: Megaphone },
            { id: 'emergency', label: `Emergency Numbers (${emergencyContacts.length})`, icon: PhoneCall },
            { id: 'divisions', label: `Divisions & Depots (${divisions.length})`, icon: Building },
            { id: 'demands', label: `Demands & Votes (${demands.length})`, icon: Vote },
            { id: 'leaders', label: `Leaders & Achievements (${leaders.length})`, icon: Award },
            { id: 'settings', label: 'Master Settings & Passwords', icon: Settings },
            { id: 'backup', label: 'Backup & Restore', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SENIORITY ROSTER TAB */}
        {activeAdminTab === 'seniority' && (
          <SeniorityAdminTab
            seniorityList={seniorityList}
            onAddSeniority={onAddSeniority}
            onUpdateSeniority={onUpdateSeniority}
            onDeleteSeniority={onDeleteSeniority}
          />
        )}

        {/* 30 OFFICIALS & ACCESS CONTROL TAB */}
        {activeAdminTab === 'officials' && (
          <OfficialsAdminTab
            officialAccounts={officialAccounts}
            onUpdateOfficialAccount={onUpdateOfficialAccount}
            onResetOfficialAccounts={onResetOfficialAccounts}
            portalSettings={portalSettings}
            onUpdatePortalSettings={onUpdatePortalSettings}
          />
        )}

        {/* STAFF WELFARE & ASSISTANCE TAB */}
        {activeAdminTab === 'staffhelp' && (
          <StaffHelpAdminTab
            records={staffHelpRecords}
            onAddRecord={onAddStaffHelpRecord}
            onUpdateRecord={onUpdateStaffHelpRecord}
            onDeleteRecord={onDeleteStaffHelpRecord}
            officialAccounts={officialAccounts}
            activeOfficerId={activeOfficerId}
          />
        )}

        {/* 1. EMPLOYEES & SHOPS TAB */}
        {activeAdminTab === 'employees' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Railway Staff & Shop Allocation Manager
                </h3>
                <p className="text-xs text-stone-500">
                  Add staff, edit roles, assign specific workshop shops or running depots, and export separate rosters.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Bulk CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenAddEmployee}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Staff Member</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  placeholder="Search name, PF number, station..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
              <div className="sm:col-span-2">
                <select
                  value={adminDivisionFilter}
                  onChange={(e) => setAdminDivisionFilter(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium"
                >
                  <option value="ALL">All Divisions</option>
                  <option value="WAT">Waltair (WAT)</option>
                  <option value="KUR">Khurda Road (KUR)</option>
                  <option value="SBP">Sambalpur (SBP)</option>
                  <option value="MCS">Mancheswar (MCS)</option>
                  <option value="HQ">Zonal HQ (BBS)</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <select
                  value={adminDeptFilter}
                  onChange={(e) => setAdminDeptFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-medium"
                >
                  <option value="ALL">All Departments ({distinctDepartments.length})</option>
                  {distinctDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <select
                  value={adminShopFilter}
                  onChange={(e) => setAdminShopFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-amber-50 border border-amber-300 rounded-lg text-amber-900 font-bold"
                >
                  <option value="ALL">All Workshop Shops / Depots ({distinctShops.length})</option>
                  {distinctShops.map((shop) => (
                    <option key={shop} value={shop}>
                      {shop}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto border border-stone-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-900 text-stone-300 uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Name & Designation</th>
                    <th className="py-3 px-4">PF & HRMS ID</th>
                    <th className="py-3 px-4">Shop / Unit</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Division & Station</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredAdminEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4">
                        <strong className="text-stone-900 block">{emp.fullName}</strong>
                        <span className="text-[11px] text-stone-500">{emp.designation}</span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className="text-stone-900 font-semibold">{emp.pfNumber}</span>
                        <span className="text-[10px] text-stone-500 block">HRMS: {emp.hrmsId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 rounded">
                          {emp.shopOrUnit || 'General Pool'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span>{emp.department}</span>
                        <span className="text-[10px] text-red-700 font-bold block">{emp.bloodGroup}</span>
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-stone-900">{emp.station}</strong>
                        <span className="text-[11px] text-stone-500 block">{emp.division} Division</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">{emp.mobile}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditEmployee(emp)}
                            className="p-1.5 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-md border border-stone-200 transition-colors"
                            title="Edit Record"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete ${emp.fullName}?`)) onDeleteEmployee(emp.id);
                            }}
                            className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-md border border-stone-200 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. GRIEVANCES MASTER CONTROL TAB */}
        {activeAdminTab === 'grievances' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Grievance Dossiers & PNM Minutes Control
                </h3>
                <p className="text-xs text-stone-500">
                  Add new representations, edit any complaint detail, update status, and log PNM agreement remarks.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddGrievance}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Grievance</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg">
              {grievances.map((g) => (
                <div key={g.id} className="p-4 hover:bg-stone-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                        {g.trackingNumber}
                      </span>
                      <span>·</span>
                      <strong className="text-stone-800">{g.applicantName}</strong>
                      <span>({g.employeeNo})</span>
                      <span>·</span>
                      <span className="text-stone-500">{g.division} / {g.station}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{g.subject}</h4>
                    <p className="text-xs text-stone-600 line-clamp-1">{g.description}</p>
                    <div className="text-[11px] text-stone-500">
                      Officer: <strong className="text-stone-800">{g.assignedOfficer}</strong> · Status: <span className="font-semibold text-red-700">{g.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditGrievance(g)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit & Status</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete grievance dossier ${g.trackingNumber}?`)) onDeleteGrievance(g.id);
                      }}
                      className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 border border-stone-200 rounded-lg"
                      title="Delete Grievance"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CIRCULARS & ORDERS TAB */}
        {activeAdminTab === 'circulars' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Official Orders, Circulars & Directives
                </h3>
                <p className="text-xs text-stone-500">
                  Create new orders, edit existing circulars, or remove outdated documents from the portal.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddCircular}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Publish New Circular</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg">
              {circulars.map((c) => (
                <div key={c.id} className="p-4 hover:bg-stone-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-red-700">{c.refNumber}</span>
                      <span>·</span>
                      <span className="text-stone-500">{c.issuedBy}</span>
                      <span>·</span>
                      <span className="text-stone-500">{c.category}</span>
                      <span>·</span>
                      <span className="font-mono text-stone-500">{c.date}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{c.titleEn}</h4>
                    <p className="text-xs text-stone-600 line-clamp-1">{c.summaryEn}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCircular(c)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Order</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete circular ${c.refNumber}?`)) onDeleteCircular(c.id);
                      }}
                      className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 border border-stone-200 rounded-lg"
                      title="Delete Circular"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. DIVISIONS & DEPOTS TAB */}
        {activeAdminTab === 'divisions' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Divisions, Secretariats & Depots Configuration
              </h3>
              <p className="text-xs text-stone-500">
                Edit Divisional Secretaries, phone numbers, addresses, and key crew depots for Khurda Road, Waltair, Sambalpur, and Mancheswar Workshop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {divisions.map((div) => (
                <div key={div.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-sm">
                        {div.code}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm mt-1">{div.nameEn}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenEditDivision(div)}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Division</span>
                    </button>
                  </div>

                  <div className="text-xs space-y-1 text-stone-600">
                    <div>Secretary: <strong>{div.divisionalSecretary}</strong></div>
                    <div>Phone: <strong className="font-mono">{div.contactPhone}</strong></div>
                    <div>Email: <strong className="font-mono">{div.email}</strong></div>
                    <div>Address: <span>{div.headquarters}</span></div>
                    <div className="pt-1">
                      <span className="font-semibold text-stone-700">Depots ({div.keyDepots.length}):</span>{' '}
                      <span className="text-[11px] text-stone-600">{div.keyDepots.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. DEMANDS CHARTER & VOTES TAB */}
        {activeAdminTab === 'demands' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Charter of Demands & Voting Items
                </h3>
                <p className="text-xs text-stone-500">
                  Add new demands, edit wording, and adjust or reset priority vote counts for GM PNM conference agenda.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddDemand}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Demand</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg">
              {demands.map((d) => (
                <div key={d.id} className="p-4 hover:bg-stone-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-bold text-stone-900 text-sm">{d.titleEn}</h4>
                    <p className="text-xs text-stone-600">{d.descEn}</p>
                    <div className="text-xs font-mono font-bold text-red-700">
                      Current Votes: {d.votes.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditDemand(d)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit & Votes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete demand "${d.titleEn}"?`)) onDeleteDemand(d.id);
                      }}
                      className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 border border-stone-200 rounded-lg"
                      title="Delete Demand"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. UNION LEADERS TAB */}
        {activeAdminTab === 'leaders' && (
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Union Leadership Profiles
                </h3>
                <p className="text-xs text-stone-500">
                  Manage leadership profiles displayed in the Central & NFIR Apex section.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddLeader}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Leader Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaders.map((leader, idx) => (
                <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {leader.photoUrl ? (
                          <img
                            src={leader.photoUrl}
                            alt={leader.name}
                            className="w-14 h-14 rounded-xl object-cover border border-stone-300 shadow-2xs shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold text-lg border border-red-200 shrink-0">
                            {leader.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-stone-900 text-sm">{leader.name}</h4>
                            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                              {leader.body || 'Central'}
                            </span>
                          </div>
                          <p className="text-xs text-red-700 font-semibold">{leader.roleEn}</p>
                          <p className="text-[11px] text-stone-500 font-medium">{leader.roleHi}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditLeader(idx, leader)}
                          className="p-1.5 text-stone-600 hover:text-blue-700 hover:bg-blue-50 border border-stone-200 rounded-md cursor-pointer"
                          title="Edit Leader"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete leader profile for ${leader.name}?`)) onDeleteLeader(idx);
                          }}
                          className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 border border-stone-200 rounded-md cursor-pointer"
                          title="Delete Leader"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2">{leader.bioEn || leader.bioHi}</p>

                    {leader.achievementsEn && leader.achievementsEn.length > 0 && (
                      <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-xs">
                        <span className="text-[10px] font-bold uppercase text-amber-900 block mb-1">
                          मुख्य उपलब्धियां व कार्य (Key Achievements):
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-stone-700">
                          {leader.achievementsEn.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-200 flex justify-between">
                    <span>📍 {leader.location}</span>
                    {leader.phone && <span>📞 {leader.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMERGENCY HELPLINE NUMBERS TAB */}
        {activeAdminTab === 'emergency' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-red-700" />
                  <span>24x7 आपातकालीन नंबर एवं पदाधिकारी संपर्क प्रबंधन (Emergency Helpline Management)</span>
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  यहाँ से आप आपातकालीन सहायता डेस्क पर प्रदर्शित होने वाले सभी पदाधिकारियों के नाम, पद, विभाग एवं फ़ोन नंबर सीधे बदल, जोड़ या हटा सकते हैं।
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddEmergency}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>+ नया आपातकालीन नंबर जोड़ें (+ Add Number)</span>
              </button>
            </div>

            {/* List of Emergency Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-red-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-800 bg-red-100/80 px-2.5 py-0.5 rounded-md">
                        {contact.departmentOrRole}
                      </span>
                      {contact.isAvailable24x7 !== false && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>24x7 Active</span>
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-stone-900 text-base mt-2">
                      {contact.name}
                    </div>

                    <div className="text-xs text-stone-600 flex items-center justify-between">
                      <span>फ़ोन नंबर (Phone):</span>
                      <a
                        href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="font-mono font-bold text-red-700 hover:underline flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </a>
                    </div>

                    {contact.divisionOrCity && (
                      <div className="text-[11px] text-stone-500">
                        📍 {contact.divisionOrCity}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditEmergency(contact)}
                      className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>एडिट करें (Edit)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEmergencyConfirm(contact.id, contact.name)}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>हटाएं (Delete)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SETTINGS & PASSWORDS TAB */}
        {activeAdminTab === 'settings' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdatePortalSettings({
                unionNameEn: editUnionNameEn,
                unionNameHi: editUnionNameHi,
                announcementNoticeEn: editNoticeEn,
                announcementNoticeHi: editNoticeHi,
                controlRoomPhone: editPhone,
                controlRoomEmail: editEmail,
                headquartersAddress: editAddress,
                adminOfficerId: editAdminId,
                adminPassword: editPassword,
              });
              alert('Portal settings and officer passwords updated successfully!');
            }}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6"
          >
            <div>
              <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-red-700" />
                <span>Portal Master Customizer (कुछ भी कभी भी बदलें)</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Customize union branding, live marquee announcements, contact numbers, and root security credentials.
              </p>
            </div>

            {/* Official Logo Customizer */}
            {/* Official Logo Customizer with Direct Device File Upload */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col md:flex-row items-center gap-6">
              <div
                className="p-3 bg-white rounded-xl border-2 border-stone-300 shadow-xs flex flex-col items-center cursor-pointer group hover:border-red-500 transition-colors"
                onClick={onOpenLogoModal}
                title="Click to Open Logo Manager (लोगो बदलने के लिए क्लिक करें)"
              >
                {customLogoUrl ? (
                  <img
                    src={customLogoUrl}
                    alt="Custom Union Logo"
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                ) : (
                  <ECORSCLogo size={80} />
                )}
                <span className="text-[11px] text-red-700 font-bold mt-1.5 flex items-center gap-1">
                  <span>📷 क्लिक कर बदलें</span>
                </span>
              </div>

              <div className="space-y-3 flex-1 text-xs w-full">
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">
                    संघ का लोगो अपलोड करें (Upload Union Logo from Computer/Mobile)
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    आप अपने मोबाइल या कंप्यूटर से सीधे फोटो/लोगो अपलोड कर सकते हैं। यह तुरंत पूरे पोर्टल, डिजिटल कार्ड व शीर्ष पट्टी पर लागू हो जाएगा।
                  </p>
                </div>

                <FileUploadInput
                  label="फ़ाइल चुनें (Select Logo Image File)"
                  helperText="Choose PNG, JPG or SVG emblem from your device (Max 8 MB)."
                  value={customLogoUrl}
                  acceptTypes="image"
                  onChange={(dataUrl) => {
                    onSetCustomLogoUrl(dataUrl);
                    alert('नया लोगो सफलतापूर्वक अपलोड व सुरक्षित हो गया!');
                  }}
                  onClear={() => {
                    onSetCustomLogoUrl('');
                    alert('मानक ईकोरएससी लोगो बहाल किया गया।');
                  }}
                />

                <div className="flex gap-2 items-center pt-1">
                  {onOpenLogoModal && (
                    <button
                      type="button"
                      onClick={onOpenLogoModal}
                      className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                    >
                      🚀 लोगो प्रबंधक खोलें (Open Logo Studio)
                    </button>
                  )}
                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        onSetCustomLogoUrl('');
                        alert('Reset to official built-in ECORSC emblem.');
                      }}
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded-lg text-xs cursor-pointer"
                    >
                      डिफ़ॉल्ट लोगो बहाल करें (Reset to Default)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Live Ticker Announcement Customizer */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                <Megaphone className="w-4 h-4 text-amber-700" />
                <span>Live Marquee Announcement Ticker (चलती सूचना पट्टी)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Ticker Notice (English)</label>
                  <textarea
                    rows={2}
                    value={editNoticeEn}
                    onChange={(e) => setEditNoticeEn(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Ticker Notice (Hindi - हिन्दी)</label>
                  <textarea
                    rows={2}
                    value={editNoticeHi}
                    onChange={(e) => setEditNoticeHi(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Union Identity & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Union Name (English)</label>
                <input
                  type="text"
                  value={editUnionNameEn}
                  onChange={(e) => setEditUnionNameEn(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Union Name (Hindi)</label>
                <input
                  type="text"
                  value={editUnionNameHi}
                  onChange={(e) => setEditUnionNameHi(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Control Room Phone</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">HQ Secretariat Postal Address</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            {/* Security ID & Password Change */}
            <div className="p-4 bg-red-50/60 rounded-xl border border-red-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase">
                <KeyRound className="w-4 h-4 text-red-700" />
                <span>Officer Access Security & Password (आईडी व पासवर्ड बदलें)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Officer Login ID</label>
                  <input
                    type="text"
                    required
                    value={editAdminId}
                    onChange={(e) => setEditAdminId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-stone-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Officer Password</label>
                  <input
                    type="text"
                    required
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-stone-900 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Save All Changes to Portal</span>
              </button>
            </div>
          </form>
        )}

        {/* 8. BACKUP & RESTORE TAB */}
        {activeAdminTab === 'backup' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div>
              <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-red-700" />
                <span>Complete Database Backup & Disaster Recovery</span>
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Export all employee records, grievance files, circulars, divisions, and custom portal settings into a single portable JSON file.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <h5 className="font-bold text-sm text-stone-900">Export Complete Database</h5>
                <p className="text-xs text-stone-600">
                  Download a complete backup JSON file containing all data so you never lose any records.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadFullBackup}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download Full Portal Backup (JSON)</span>
                </button>
              </div>

              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <h5 className="font-bold text-sm text-stone-900">Restore Database from Backup</h5>
                <p className="text-xs text-stone-600">
                  Paste previously downloaded backup JSON content below to restore all records.
                </p>
                <textarea
                  rows={3}
                  value={backupJsonText}
                  onChange={(e) => setBackupJsonText(e.target.value)}
                  placeholder="Paste JSON backup text here..."
                  className="w-full p-2 text-xs font-mono bg-white border border-stone-300 rounded-lg text-stone-900"
                />
                <button
                  type="button"
                  onClick={handleRestoreBackup}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-white" />
                  <span>Restore from JSON</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-red-900 block">Factory Reset Database</strong>
                <span className="text-[11px] text-red-700">
                  Reset all grievances, circulars, staff, and settings back to original defaults.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all portal data to initial factory defaults?')) {
                    onResetToDefaults();
                    alert('All portal datasets reset to initial defaults.');
                  }
                }}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT EMPLOYEE */}
        {showEmployeeModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-bold text-white">
                    {editingEmpId ? 'Edit Staff Details & Shop Allocation' : 'Enroll Staff into Specific Shop / Dept'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEmployee} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Employee Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={empFullName}
                    onChange={(e) => setEmpFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Das"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      PF Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={empPfNumber}
                      onChange={(e) => setEmpPfNumber(e.target.value)}
                      placeholder="e.g. PF532981109"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      HRMS ID
                    </label>
                    <input
                      type="text"
                      value={empHrmsId}
                      onChange={(e) => setEmpHrmsId(e.target.value)}
                      placeholder="e.g. ECOR7821"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                </div>

                {/* Specific Shop & Department Segregation */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50/60 rounded-lg border border-amber-200">
                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Workshop Shop / Depot / Unit <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={empShopOrUnit}
                      onChange={(e) => setEmpShopOrUnit(e.target.value)}
                      placeholder="e.g. Bogie Shop, Wheel Shop, Shell Shop"
                      className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg text-stone-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-900 mb-1">
                      Department <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={empDepartment}
                      onChange={(e) => setEmpDepartment(e.target.value)}
                      placeholder="e.g. Store & Workshop, Mechanical, Operating"
                      className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg text-stone-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={empDesignation}
                      onChange={(e) => setEmpDesignation(e.target.value)}
                      placeholder="e.g. Senior Technician / Fitter / Loco Pilot"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Division
                    </label>
                    <select
                      value={empDivision}
                      onChange={(e) => setEmpDivision(e.target.value as DivisionId)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                    >
                      <option value="MCS">Mancheswar Workshop (MCS)</option>
                      <option value="WAT">Waltair (WAT)</option>
                      <option value="KUR">Khurda Road (KUR)</option>
                      <option value="SBP">Sambalpur (SBP)</option>
                      <option value="HQ">Zonal HQ (BBS)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Station / Depot
                    </label>
                    <input
                      type="text"
                      value={empStation}
                      onChange={(e) => setEmpStation(e.target.value)}
                      placeholder="e.g. Mancheswar / Visakhapatnam"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      value={empBloodGroup}
                      onChange={(e) => setEmpBloodGroup(e.target.value)}
                      placeholder="e.g. B+"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile No.
                    </label>
                    <input
                      type="text"
                      value={empMobile}
                      onChange={(e) => setEmpMobile(e.target.value)}
                      placeholder="e.g. +91 94370 00000"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmployeeModal(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save to Shop Database</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT GRIEVANCE DOSSIER */}
        {showGrievanceEditModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingGrievance ? `Edit Grievance: ${editingGrievance.trackingNumber}` : 'Create New Grievance Record'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGrievanceEditModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGrievance} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Applicant Name</label>
                    <input
                      type="text"
                      required
                      value={gApplicantName}
                      onChange={(e) => setGApplicantName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">PF / HRMS ID</label>
                    <input
                      type="text"
                      value={gEmployeeNo}
                      onChange={(e) => setGEmployeeNo(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Division</label>
                    <select
                      value={gDivision}
                      onChange={(e) => setGDivision(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    >
                      <option value="WAT">Waltair (WAT)</option>
                      <option value="KUR">Khurda Road (KUR)</option>
                      <option value="SBP">Sambalpur (SBP)</option>
                      <option value="MCS">Mancheswar (MCS)</option>
                      <option value="HQ">Zonal HQ (BBS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Station / Depot</label>
                    <input
                      type="text"
                      value={gStation}
                      onChange={(e) => setGStation(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={gSubject}
                    onChange={(e) => setGSubject(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={gDescription}
                    onChange={(e) => setGDescription(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Grievance Status</label>
                    <select
                      value={gStatus}
                      onChange={(e) => setGStatus(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-bold text-red-700"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Division Review">Under Division Review</option>
                      <option value="Taken up in PNM / Administration">Taken up in PNM / Administration</option>
                      <option value="Action Initiated">Action Initiated</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Assigned Officer</label>
                    <input
                      type="text"
                      value={gOfficer}
                      onChange={(e) => setGOfficer(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Append PNM Action Remark</label>
                  <input
                    type="text"
                    value={gRemarkToAdd}
                    onChange={(e) => setGRemarkToAdd(e.target.value)}
                    placeholder="e.g. Sr. DPO confirmed order to be issued on Friday"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowGrievanceEditModal(false)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg"
                  >
                    Save Dossier
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT CIRCULAR */}
        {showCircularModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingCircular ? 'Edit Official Circular' : 'Publish New Circular / PNM Order'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCircularModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCircular} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Ref Number</label>
                    <input
                      type="text"
                      required
                      value={circRef}
                      onChange={(e) => setCircRef(e.target.value)}
                      className="w-full px-3 py-1.5 font-mono bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      value={circCategory}
                      onChange={(e) => setCircCategory(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    >
                      <option value="PNM Minutes">PNM Minutes</option>
                      <option value="Pay & Allowances">Pay & Allowances (8th CPC)</option>
                      <option value="Running Staff">Running Staff Rules</option>
                      <option value="Pension (OPS/UPS)">Pension (OPS/UPS)</option>
                      <option value="Welfare & Quarters">Welfare & Quarters</option>
                      <option value="Transfer Rules">Transfer Rules</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={circTitleEn}
                    onChange={(e) => setCircTitleEn(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Title (Hindi)</label>
                  <input
                    type="text"
                    value={circTitleHi}
                    onChange={(e) => setCircTitleHi(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Summary</label>
                  <textarea
                    rows={2}
                    value={circSummaryEn}
                    onChange={(e) => setCircSummaryEn(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Directives (1 per line)</label>
                  <textarea
                    rows={3}
                    value={circKeyPoints}
                    onChange={(e) => setCircKeyPoints(e.target.value)}
                    className="w-full px-3 py-1.5 font-mono bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowCircularModal(false)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg"
                  >
                    Save Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT DIVISION */}
        {editingDiv && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  Edit Division: {editingDiv.nameEn}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingDiv(null)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDivision} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Divisional Secretary</label>
                  <input
                    type="text"
                    required
                    value={divSecretary}
                    onChange={(e) => setDivSecretary(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Divisional President</label>
                  <input
                    type="text"
                    value={divPresident}
                    onChange={(e) => setDivPresident(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number(s)</label>
                  <input
                    type="text"
                    value={divPhone}
                    onChange={(e) => setDivPhone(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={divEmail}
                    onChange={(e) => setDivEmail(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Headquarters Postal Address</label>
                  <input
                    type="text"
                    value={divHq}
                    onChange={(e) => setDivHq(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Key Depots (comma-separated)</label>
                  <textarea
                    rows={2}
                    value={divDepotsText}
                    onChange={(e) => setDivDepotsText(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setEditingDiv(null)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg"
                  >
                    Save Division
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT DEMAND */}
        {showDemandModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingDemand ? 'Edit Demand Item' : 'Add New Charter Demand'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowDemandModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDemand} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={demandTitleEn}
                    onChange={(e) => setDemandTitleEn(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Title (Hindi)</label>
                  <input
                    type="text"
                    value={demandTitleHi}
                    onChange={(e) => setDemandTitleHi(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Description (English)</label>
                  <textarea
                    rows={2}
                    value={demandDescEn}
                    onChange={(e) => setDemandDescEn(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Initial Priority Votes</label>
                  <input
                    type="number"
                    value={demandVotes}
                    onChange={(e) => setDemandVotes(Number(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowDemandModal(false)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg"
                  >
                    Save Demand
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT LEADER */}
        {showLeaderModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {editingLeaderIndex !== null ? 'Edit Leader Profile' : 'Add Union Leader Profile'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLeaderModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLeader} className="p-6 space-y-4 text-xs">
                {/* Photo Upload for Leader */}
                <div>
                  <FileUploadInput
                    label="पदाधिकारी की फोटो (Leader Photo Upload)"
                    helperText="Upload official photograph from mobile or computer. Image will be shown on leadership cards."
                    value={leaderPhotoUrl}
                    acceptTypes="image"
                    onChange={(dataUrl) => setLeaderPhotoUrl(dataUrl)}
                    onClear={() => setLeaderPhotoUrl('')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-700 mb-1">
                      Leader Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Affiliation Body</label>
                    <select
                      value={leaderBody}
                      onChange={(e) => setLeaderBody(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                    >
                      <option value="Central ECORSC">Central ECORSC</option>
                      <option value="NFIR Apex">NFIR Apex</option>
                      <option value="Branch MCS">Branch MCS Workshop</option>
                      <option value="Divisional">Divisional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Role (English) <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      required
                      value={leaderRoleEn}
                      onChange={(e) => setLeaderRoleEn(e.target.value)}
                      placeholder="e.g. Branch Secretary / General Secretary"
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Role (Hindi)</label>
                    <input
                      type="text"
                      value={leaderRoleHi}
                      onChange={(e) => setLeaderRoleHi(e.target.value)}
                      placeholder="e.g. शाखा सचिव, ईकोरएससी एम.सी.एस. वर्कशॉप"
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">About / परिचय (Biography)</label>
                  <textarea
                    rows={2}
                    value={leaderBioEn}
                    onChange={(e) => setLeaderBioEn(e.target.value)}
                    placeholder="Brief background, years of trade union service, cadre leadership..."
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    प्रमुख उपलब्धियां व कार्य (Key Achievements - एक प्रति पंक्ति / One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={leaderAchievementsEn}
                    onChange={(e) => setLeaderAchievementsEn(e.target.value)}
                    placeholder="उदा.&#10;• रनिंग रूम वातानुकूलन PNM एजेंडा 14 में स्वीकृत कराया&#10;• वर्कशॉप कर्मचारियों हेतु प्रोत्साहन बोनस पुनरीक्षण कराया"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Location / Office</label>
                    <input
                      type="text"
                      value={leaderLocation}
                      onChange={(e) => setLeaderLocation(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={leaderPhone}
                      onChange={(e) => setLeaderPhone(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowLeaderModal(false)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    {editingLeaderIndex !== null ? 'अपडेट करें (Save Leader)' : 'पदाधिकारी जोड़ें (Add Leader)'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: BULK CSV IMPORT */}
        {showCsvModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-bold text-white">
                    Bulk CSV Staff & Shop Data Import
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <p className="text-stone-600 leading-relaxed">
                  Paste comma-separated employee records (CSV format).
                  Format: <code>Full Name, PF Number, HRMS ID, Designation, Department, Shop or Unit, Division (KUR/WAT/SBP/MCS/HQ), Station, Blood Group, Mobile</code>
                </p>

                <textarea
                  rows={8}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={`"Pravat Sen", "PF539912019", "ECOR5190", "Senior Fitter", "Store & Workshop", "Bogie Shop (Shop-1)", "MCS", "Mancheswar", "B+", "+91 94371 00001"\n"G. Appa Rao", "PF538190222", "ECOR3321", "Loco Pilot (Goods)", "Operating", "Visakhapatnam Lobby", "WAT", "Visakhapatnam", "O+", "+91 94408 00002"`}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />

                <div className="pt-2 flex justify-between items-center border-t border-stone-200">
                  <span className="text-[11px] text-stone-500">
                    Will instantly append into union directory with shop & department allocation.
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCsvModal(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleProcessCsvImport}
                      className="px-5 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-300" />
                      <span>Process & Import Roster</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT EMERGENCY CONTACT */}
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
              <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-amber-300" />
                  <h3 className="text-base font-bold text-white">
                    {editingEmergencyId
                      ? 'आपातकालीन नंबर बदलें (Edit Emergency Contact)'
                      : 'नया आपातकालीन नंबर जोड़ें (Add Emergency Contact)'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEmergency} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    विभाग / सेल / पद का नाम (Department / Cell / Role) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={emRole}
                    onChange={(e) => setEmRole(e.target.value)}
                    placeholder="e.g. Waltair Running Staff Cell, Central GS Office, Khurda Control Room"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    पदाधिकारी का नाम (Officer / Leader Name) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={emName}
                    onChange={(e) => setEmName(e.target.value)}
                    placeholder="e.g. Comrade K. S. Murthy / Ashok Kumar Mishra"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    फ़ोन / मोबाइल नंबर (Phone Number) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={emPhone}
                    onChange={(e) => setEmPhone(e.target.value)}
                    placeholder="e.g. +91 94408 92019 या 0674-2303030"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    मंडल / शहर / कार्यालय (Division / City / Office)
                  </label>
                  <input
                    type="text"
                    value={emLocation}
                    onChange={(e) => setEmLocation(e.target.value)}
                    placeholder="e.g. Visakhapatnam (WAT) / Rail Sadan Bhubaneswar"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="is24x7Check"
                    checked={emIs24x7}
                    onChange={(e) => setEmIs24x7(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-stone-300"
                  />
                  <label htmlFor="is24x7Check" className="text-xs text-stone-700 font-medium">
                    24x7 आपातकालीन सहायता हेतु सक्रिय (Mark as 24x7 Active)
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    Cancel (रद्द करें)
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    {editingEmergencyId ? 'अपडेट करें (Save Changes)' : 'नंबर जोड़ें (Add Number)'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

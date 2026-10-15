import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GrievancePortal } from './components/GrievancePortal';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { AllowanceCalculator } from './components/AllowanceCalculator';
import { CircularsArchive } from './components/CircularsArchive';
import { DivisionsDirectory } from './components/DivisionsDirectory';
import { HistoryMilestones } from './components/HistoryMilestones';
import { CharterAndPoll } from './components/CharterAndPoll';
import { AdminPanel } from './components/AdminPanel';
import { MembershipCardModal } from './components/MembershipCardModal';
import { OfficerLoginModal } from './components/OfficerLoginModal';
import { SeniorityPortal } from './components/SeniorityPortal';
import { StaffHelpDirectory } from './components/StaffHelpDirectory';
import { LogoManagerModal } from './components/LogoManagerModal';
import { Footer } from './components/Footer';
import {
  Circular,
  DivisionInfo,
  EmergencyContact,
  EmployeeRecord,
  GrievanceRecord,
  OfficialUserAccount,
  PortalSettings,
  SeniorityRecord,
  StaffHelpRecord,
  UnionLeader,
} from './types';
import {
  DEMANDS_CHARTER,
  DIVISIONS_INFO,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_GRIEVANCES,
  OFFICIAL_CIRCULARS,
  UNION_LEADERS,
} from './data/mockData';
import { INITIAL_EMPLOYEES } from './data/mockEmployees';
import { INITIAL_SENIORITY_LIST } from './data/mockSeniority';
import { INITIAL_30_OFFICIALS, MASTER_SUPER_ADMIN } from './data/mockOfficials';
import { INITIAL_STAFF_HELP_RECORDS } from './data/mockStaffHelp';
import {
  ShieldAlert,
  CheckCircle2,
  Unlock,
  KeyRound,
  Sparkles,
  Users,
  Layers,
  HeartHandshake,
  Image,
} from 'lucide-react';

const DEFAULT_PORTAL_SETTINGS: PortalSettings = {
  unionNameEn: 'East Coast Railway Shramik Congress (ECORSC)',
  unionNameHi: 'ईस्ट कोस्ट रेलवे श्रमिक कांग्रेस (ईसीआरएससी)',
  announcementNoticeEn:
    'NFIR Memorandum on 8th CPC submitted to Ministry of Finance · Strict 10-hour duty ceiling enforced for ECoR Loco Pilots · OPS campaign active across all 3 divisions.',
  announcementNoticeHi:
    '8वें वेतन आयोग (8th CPC) के संदर्भ में एनएफआईआर मांग पत्र प्रस्तुत · पुरानी पेंशन (OPS) बहाली हेतु मंडलवार जन-जागरण सभाएं जारी।',
  headquartersAddress: 'Rail Sadan, South Block, Chandrasekharpur, Bhubaneswar, Odisha - 751017',
  controlRoomPhone: '0674-2303030 / +91 94371 99000',
  controlRoomEmail: 'gs.ecorsc@gmail.com',
  adminOfficerId: 'SUPERADMIN-ECORSC',
  adminPassword: 'superadmin@ecorsc2026',
};

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [adminInitialTab, setAdminInitialTab] = useState<string>('employees');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [cardSelectedEmployee, setCardSelectedEmployee] = useState<EmployeeRecord | null>(null);

  // Portal Master Settings (Change anything anytime)
  const [portalSettings, setPortalSettings] = useState<PortalSettings>(() => {
    const saved = localStorage.getItem('ecorsc_portal_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse settings', err);
      }
    }
    return DEFAULT_PORTAL_SETTINGS;
  });

  // Officer Authentication State:
  // "Portal par jate hi id aur password mange aisa ho"
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ecorsc_officer_logged_in') === 'true';
  });
  const [activeOfficerId, setActiveOfficerId] = useState<string>(() => {
    return localStorage.getItem('ecorsc_active_officer_id') || portalSettings.adminOfficerId;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(() => {
    return localStorage.getItem('ecorsc_officer_logged_in') !== 'true';
  });

  // Custom Logo URL (in localStorage)
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    return localStorage.getItem('ecorsc_custom_logo_url') || '';
  });

  // Persistent Grievance Records
  const [grievances, setGrievances] = useState<GrievanceRecord[]>(() => {
    const saved = localStorage.getItem('ecorsc_grievances_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved grievances', err);
      }
    }
    return INITIAL_GRIEVANCES;
  });

  // Persistent Circulars
  const [circulars, setCirculars] = useState<Circular[]>(() => {
    const saved = localStorage.getItem('ecorsc_circulars_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved circulars', err);
      }
    }
    return OFFICIAL_CIRCULARS;
  });

  // Persistent Employees Database (with Shop/Department categorization)
  const [employees, setEmployees] = useState<EmployeeRecord[]>(() => {
    const saved = localStorage.getItem('ecorsc_employees_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved employees', err);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  // Persistent Seniority List Records (with PDF upload)
  const [seniorityList, setSeniorityList] = useState<SeniorityRecord[]>(() => {
    const saved = localStorage.getItem('ecorsc_seniority_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse seniority list', err);
      }
    }
    return INITIAL_SENIORITY_LIST;
  });

  // Persistent 30 Official Sub-Admin Accounts (with Semi-Access)
  const [officialAccounts, setOfficialAccounts] = useState<OfficialUserAccount[]>(() => {
    const saved = localStorage.getItem('ecorsc_official_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse official accounts', err);
      }
    }
    return INITIAL_30_OFFICIALS;
  });

  // Persistent Staff Welfare & Assistance Records
  const [staffHelpRecords, setStaffHelpRecords] = useState<StaffHelpRecord[]>(() => {
    const saved = localStorage.getItem('ecorsc_staff_help_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse staff help records', err);
      }
    }
    return INITIAL_STAFF_HELP_RECORDS;
  });

  // Persistent Divisions Directory
  const [divisions, setDivisions] = useState<DivisionInfo[]>(() => {
    const saved = localStorage.getItem('ecorsc_divisions_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved divisions', err);
      }
    }
    return DIVISIONS_INFO;
  });

  // Persistent Demands & Poll Charter
  const [demands, setDemands] = useState<typeof DEMANDS_CHARTER>(() => {
    const saved = localStorage.getItem('ecorsc_demands_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved demands', err);
      }
    }
    return DEMANDS_CHARTER;
  });

  // Persistent Union Leaders
  const [leaders, setLeaders] = useState<UnionLeader[]>(() => {
    const saved = localStorage.getItem('ecorsc_leaders_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved leaders', err);
      }
    }
    return UNION_LEADERS;
  });

  // Persistent Emergency Helpline Contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem('ecorsc_emergency_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse emergency contacts', err);
      }
    }
    return INITIAL_EMERGENCY_CONTACTS;
  });

  useEffect(() => {
    localStorage.setItem('ecorsc_portal_settings', JSON.stringify(portalSettings));
  }, [portalSettings]);

  useEffect(() => {
    localStorage.setItem('ecorsc_grievances_records', JSON.stringify(grievances));
  }, [grievances]);

  useEffect(() => {
    localStorage.setItem('ecorsc_circulars_records', JSON.stringify(circulars));
  }, [circulars]);

  useEffect(() => {
    localStorage.setItem('ecorsc_employees_records', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('ecorsc_seniority_records', JSON.stringify(seniorityList));
  }, [seniorityList]);

  useEffect(() => {
    localStorage.setItem('ecorsc_official_accounts', JSON.stringify(officialAccounts));
  }, [officialAccounts]);

  useEffect(() => {
    localStorage.setItem('ecorsc_staff_help_records', JSON.stringify(staffHelpRecords));
  }, [staffHelpRecords]);

  useEffect(() => {
    localStorage.setItem('ecorsc_divisions_records', JSON.stringify(divisions));
  }, [divisions]);

  useEffect(() => {
    localStorage.setItem('ecorsc_demands_records', JSON.stringify(demands));
  }, [demands]);

  useEffect(() => {
    localStorage.setItem('ecorsc_leaders_records', JSON.stringify(leaders));
  }, [leaders]);

  useEffect(() => {
    localStorage.setItem('ecorsc_emergency_contacts', JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  useEffect(() => {
    localStorage.setItem('ecorsc_custom_logo_url', customLogoUrl);
  }, [customLogoUrl]);

  const handleLoginSuccess = (officerId: string, account?: OfficialUserAccount) => {
    setIsOfficerLoggedIn(true);
    setActiveOfficerId(officerId);
    setIsLoginModalOpen(false);
    localStorage.setItem('ecorsc_officer_logged_in', 'true');
    localStorage.setItem('ecorsc_active_officer_id', officerId);

    // If semi-access official, route to appropriate section
    if (account && account.accessLevel === 'semi') {
      handleNavigate('admin');
      setAdminInitialTab('staffhelp');
    } else {
      handleNavigate('admin');
    }
  };

  const handleOfficerLogout = () => {
    setIsOfficerLoggedIn(false);
    localStorage.removeItem('ecorsc_officer_logged_in');
    localStorage.removeItem('ecorsc_active_officer_id');
    setIsLoginModalOpen(true);
  };

  // Grievance Handlers
  const handleAddGrievance = (record: GrievanceRecord) => {
    setGrievances((prev) => [record, ...prev]);
  };

  const handleUpdateGrievanceFull = (updated: GrievanceRecord) => {
    setGrievances((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  const handleDeleteGrievance = (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
  };

  // Circular Handlers
  const handleAddCircular = (newCirc: Circular) => {
    setCirculars((prev) => [newCirc, ...prev]);
  };

  const handleUpdateCircular = (updated: Circular) => {
    setCirculars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteCircular = (id: string) => {
    setCirculars((prev) => prev.filter((c) => c.id !== id));
  };

  // Employee CRUD Handlers
  const handleAddEmployee = (newEmp: EmployeeRecord) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleUpdateEmployee = (updated: EmployeeRecord) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === updated.id ? updated : emp)));
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleBulkImportEmployees = (imported: EmployeeRecord[]) => {
    setEmployees((prev) => [...imported, ...prev]);
  };

  // Seniority CRUD Handlers
  const handleAddSeniority = (rec: SeniorityRecord) => {
    setSeniorityList((prev) => [...prev, rec]);
  };

  const handleUpdateSeniority = (updated: SeniorityRecord) => {
    setSeniorityList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSeniority = (id: string) => {
    setSeniorityList((prev) => prev.filter((s) => s.id !== id));
  };

  // 30 Official Sub-Admin Accounts Handlers
  const handleUpdateOfficialAccount = (updated: OfficialUserAccount) => {
    setOfficialAccounts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleResetOfficialAccounts = () => {
    setOfficialAccounts(INITIAL_30_OFFICIALS);
    localStorage.removeItem('ecorsc_official_accounts');
    alert('सभी 30 अधिकारियों के क्रेडेंशियल डिफ़ॉल्ट पर बहाल कर दिए गए हैं।');
  };

  // Staff Welfare & Help Records Handlers
  const handleAddStaffHelpRecord = (rec: StaffHelpRecord) => {
    setStaffHelpRecords((prev) => [rec, ...prev]);
  };

  const handleUpdateStaffHelpRecord = (updated: StaffHelpRecord) => {
    setStaffHelpRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleDeleteStaffHelpRecord = (id: string) => {
    setStaffHelpRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Division Handlers
  const handleUpdateDivision = (updated: DivisionInfo) => {
    setDivisions((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  // Demand Handlers
  const handleAddDemand = (newDemand: typeof DEMANDS_CHARTER[0]) => {
    setDemands((prev) => [newDemand, ...prev]);
  };

  const handleUpdateDemand = (updated: typeof DEMANDS_CHARTER[0]) => {
    setDemands((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const handleDeleteDemand = (id: string) => {
    setDemands((prev) => prev.filter((d) => d.id !== id));
  };

  const handleVoteDemand = (demandId: string) => {
    setDemands((prev) =>
      prev.map((d) => (d.id === demandId ? { ...d, votes: d.votes + 1 } : d))
    );
  };

  // Leaders Handlers
  const handleAddLeader = (l: UnionLeader) => {
    setLeaders((prev) => [...prev, l]);
  };

  const handleUpdateLeader = (index: number, l: UnionLeader) => {
    setLeaders((prev) => prev.map((item, i) => (i === index ? l : item)));
  };

  const handleDeleteLeader = (index: number) => {
    setLeaders((prev) => prev.filter((_, i) => i !== index));
  };

  // Emergency Contacts Handlers
  const handleAddEmergencyContact = (newContact: EmergencyContact) => {
    setEmergencyContacts((prev) => [...prev, newContact]);
  };

  const handleUpdateEmergencyContact = (updated: EmergencyContact) => {
    setEmergencyContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteEmergencyContact = (id: string) => {
    setEmergencyContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Master Restore & Reset Handlers
  const handleRestoreAllData = (data: any) => {
    if (!data) return;
    if (Array.isArray(data.employees)) setEmployees(data.employees);
    if (Array.isArray(data.seniorityList)) setSeniorityList(data.seniorityList);
    if (Array.isArray(data.officialAccounts)) setOfficialAccounts(data.officialAccounts);
    if (Array.isArray(data.staffHelpRecords)) setStaffHelpRecords(data.staffHelpRecords);
    if (Array.isArray(data.grievances)) setGrievances(data.grievances);
    if (Array.isArray(data.circulars)) setCirculars(data.circulars);
    if (Array.isArray(data.divisions)) setDivisions(data.divisions);
    if (Array.isArray(data.demands)) setDemands(data.demands);
    if (Array.isArray(data.leaders)) setLeaders(data.leaders);
    if (Array.isArray(data.emergencyContacts)) setEmergencyContacts(data.emergencyContacts);
    if (data.portalSettings) setPortalSettings(data.portalSettings);
    if (typeof data.customLogoUrl === 'string') setCustomLogoUrl(data.customLogoUrl);
  };

  const handleResetToDefaults = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setSeniorityList(INITIAL_SENIORITY_LIST);
    setOfficialAccounts(INITIAL_30_OFFICIALS);
    setStaffHelpRecords(INITIAL_STAFF_HELP_RECORDS);
    setGrievances(INITIAL_GRIEVANCES);
    setCirculars(OFFICIAL_CIRCULARS);
    setDivisions(DIVISIONS_INFO);
    setDemands(DEMANDS_CHARTER);
    setLeaders(UNION_LEADERS);
    setEmergencyContacts(INITIAL_EMERGENCY_CONTACTS);
    setPortalSettings(DEFAULT_PORTAL_SETTINGS);
    setCustomLogoUrl('');
    localStorage.clear();
  };

  const handleOpenCardForEmployee = (emp: EmployeeRecord) => {
    setCardSelectedEmployee(emp);
    setIsCardModalOpen(true);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const elem = document.getElementById(section);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Officer Security Status Strip */}
      <div className="bg-stone-950 text-stone-200 text-xs px-4 sm:px-6 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isOfficerLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Officer Active: {activeOfficerId}</span>
              </span>
              <span className="bg-emerald-950 border border-emerald-600 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                Full Admin Control Active
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-stone-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>ईकोरएससी आधिकारिक यूनियन पोर्टल · कृपया पदाधिकारी क्रेडेंशियल से लॉगिन करें</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Logo Change Button */}
          <button
            type="button"
            onClick={() => setIsLogoModalOpen(true)}
            className="text-[11px] bg-red-900/80 hover:bg-red-800 text-amber-200 px-2.5 py-1 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-colors border border-red-700"
          >
            <Image className="w-3.5 h-3.5" />
            <span>📷 लोगो बदलें (Change Logo)</span>
          </button>

          {isOfficerLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavigate('admin')}
                className="px-2.5 py-1 bg-red-700 hover:bg-red-800 text-white rounded font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>नियंत्रण कक्ष (Control Desk)</span>
              </button>
              <button
                type="button"
                onClick={handleOfficerLogout}
                className="text-stone-400 hover:text-white underline text-xs cursor-pointer ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>⚡ 1-Click Master Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Global Navigation Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        onOpenCardModal={() => {
          setCardSelectedEmployee(null);
          setIsCardModalOpen(true);
        }}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
        customLogoUrl={customLogoUrl}
        emergencyContacts={emergencyContacts}
        onOpenEmergencyAdmin={() => {
          setAdminInitialTab('emergency');
          handleNavigate('admin');
        }}
        isOfficerLoggedIn={isOfficerLoggedIn}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <section id="home">
          <Hero
            onNavigate={handleNavigate}
            onOpenCardModal={() => {
              setCardSelectedEmployee(null);
              setIsCardModalOpen(true);
            }}
            onOpenLogoModal={() => setIsLogoModalOpen(true)}
            customLogoUrl={customLogoUrl}
            portalSettings={portalSettings}
          />
        </section>

        {/* Administration / Union Officer Panel (Primary control workbench with full Add/Edit/Delete access) */}
        <section id="admin">
          <AdminPanel
            grievances={grievances}
            onAddGrievance={handleAddGrievance}
            onUpdateGrievanceFull={handleUpdateGrievanceFull}
            onDeleteGrievance={handleDeleteGrievance}
            circulars={circulars}
            onAddCircular={handleAddCircular}
            onUpdateCircular={handleUpdateCircular}
            onDeleteCircular={handleDeleteCircular}
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onBulkImportEmployees={handleBulkImportEmployees}
            seniorityList={seniorityList}
            onAddSeniority={handleAddSeniority}
            onUpdateSeniority={handleUpdateSeniority}
            onDeleteSeniority={handleDeleteSeniority}
            officialAccounts={officialAccounts}
            onUpdateOfficialAccount={handleUpdateOfficialAccount}
            onResetOfficialAccounts={handleResetOfficialAccounts}
            staffHelpRecords={staffHelpRecords}
            onAddStaffHelpRecord={handleAddStaffHelpRecord}
            onUpdateStaffHelpRecord={handleUpdateStaffHelpRecord}
            onDeleteStaffHelpRecord={handleDeleteStaffHelpRecord}
            divisions={divisions}
            onUpdateDivision={handleUpdateDivision}
            demands={demands}
            onAddDemand={handleAddDemand}
            onUpdateDemand={handleUpdateDemand}
            onDeleteDemand={handleDeleteDemand}
            leaders={leaders}
            onAddLeader={handleAddLeader}
            onUpdateLeader={handleUpdateLeader}
            onDeleteLeader={handleDeleteLeader}
            emergencyContacts={emergencyContacts}
            onAddEmergencyContact={handleAddEmergencyContact}
            onUpdateEmergencyContact={handleUpdateEmergencyContact}
            onDeleteEmergencyContact={handleDeleteEmergencyContact}
            initialAdminTab={adminInitialTab}
            customLogoUrl={customLogoUrl}
            onSetCustomLogoUrl={setCustomLogoUrl}
            portalSettings={portalSettings}
            onUpdatePortalSettings={setPortalSettings}
            onLogout={handleOfficerLogout}
            onOpenLogoModal={() => setIsLogoModalOpen(true)}
            activeOfficerId={activeOfficerId}
            onRestoreAllData={handleRestoreAllData}
            onResetToDefaults={handleResetToDefaults}
          />
        </section>

        {/* Public & Staff Seniority List Portal (Search by Name or Shop, Download PDF) */}
        <section id="seniority">
          <SeniorityPortal
            seniorityList={seniorityList}
            onOpenAddModal={() => {
              setAdminInitialTab('seniority');
              handleNavigate('admin');
            }}
            isOfficerLoggedIn={isOfficerLoggedIn}
          />
        </section>

        {/* Staff Welfare & Assistance Tracker (30 Officials Help Log) */}
        <section id="staffhelp">
          <StaffHelpDirectory
            records={staffHelpRecords}
            onOpenAddModal={() => {
              setAdminInitialTab('staffhelp');
              handleNavigate('admin');
            }}
            isOfficerLoggedIn={isOfficerLoggedIn}
          />
        </section>

        {/* Searchable Railway Employees Directory (Separated by Shop & Department) */}
        <section id="employees">
          <EmployeeDirectory
            employees={employees}
            onSelectEmployeeForCard={handleOpenCardForEmployee}
          />
        </section>

        <section id="grievance">
          <GrievancePortal
            grievances={grievances}
            onAddGrievance={handleAddGrievance}
          />
        </section>

        <section id="calculator">
          <AllowanceCalculator />
        </section>

        <section id="circulars">
          <CircularsArchive circulars={circulars} />
        </section>

        <section id="demands">
          <CharterAndPoll demands={demands} onVote={handleVoteDemand} />
        </section>

        <section id="divisions">
          <DivisionsDirectory divisions={divisions} leaders={leaders} />
        </section>

        <section id="history">
          <HistoryMilestones />
        </section>
      </main>

      {/* Officer Security Gate Modal */}
      <OfficerLoginModal
        isOpen={isLoginModalOpen}
        onSuccess={handleLoginSuccess}
        onDismiss={() => setIsLoginModalOpen(false)}
        validOfficerId={portalSettings.adminOfficerId}
        validPassword={portalSettings.adminPassword}
        officialAccounts={officialAccounts}
      />

      {/* Membership E-Card Generator & Preview Modal (with dual secretarial signatures & photo upload) */}
      <MembershipCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        initialEmployeeData={cardSelectedEmployee}
        customLogoUrl={customLogoUrl}
        isOfficerLoggedIn={isOfficerLoggedIn}
      />

      {/* Logo Click-to-Change Manager Modal */}
      <LogoManagerModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        currentLogoUrl={customLogoUrl}
        onSaveLogo={setCustomLogoUrl}
      />

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCardModal={() => {
          setCardSelectedEmployee(null);
          setIsCardModalOpen(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

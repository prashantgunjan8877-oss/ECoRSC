export type Language = 'en' | 'hi';

export type DivisionId = 'KUR' | 'WAT' | 'SBP' | 'MCS' | 'HQ';

export type DepartmentType =
  | 'Operating'
  | 'Mechanical'
  | 'Electrical (TRD/TRS)'
  | 'Signal & Telecom (S&T)'
  | 'Civil Engineering (Track)'
  | 'Commercial'
  | 'Accounts & Personnel'
  | 'Medical & Health'
  | 'Store & Workshop';

export type GrievanceCategory =
  | 'Transfer & Mutual Relocation'
  | 'Running Staff & Loco Pilots'
  | 'MACP, Seniority & Promotion'
  | 'Railway Quarters & Maintenance'
  | 'Overtime (OTA) & Night Duty (NDA)'
  | 'Medical Claims & Railway Hospitals'
  | 'Safety, Harsh Conditions & Tools'
  | 'Disciplinary, DAR & Rule 9/11';

export type GrievanceStatus =
  | 'Submitted'
  | 'Under Division Review'
  | 'Taken up in PNM / Administration'
  | 'Resolved'
  | 'Action Initiated';

export interface GrievanceRecord {
  id: string;
  trackingNumber: string;
  submittedAt: string;
  applicantName: string;
  employeeNo: string; // PF / UMID / HRMS ID
  designation: string;
  division: DivisionId;
  station: string;
  department: DepartmentType;
  phone: string;
  category: GrievanceCategory;
  subject: string;
  description: string;
  reliefSought: string;
  status: GrievanceStatus;
  assignedOfficer: string;
  remarks: string[];
  lastUpdated: string;
}

export interface Circular {
  id: string;
  refNumber: string;
  titleEn: string;
  titleHi: string;
  date: string;
  issuedBy: 'NFIR Central' | 'ECORSC HQ' | 'Railway Board' | 'ECoR PCPO';
  category: 'Pay & Allowances' | 'Running Staff' | 'Pension (OPS/UPS)' | 'Welfare & Quarters' | 'PNM Minutes' | 'Transfer Rules';
  summaryEn: string;
  summaryHi: string;
  keyPoints: string[];
  pdfName: string;
  isImportant?: boolean;
}

export interface DivisionInfo {
  id: DivisionId;
  code: string;
  nameEn: string;
  nameHi: string;
  headquarters: string;
  jurisdictionEn: string;
  jurisdictionHi: string;
  divisionalSecretary: string;
  divisionalPresident: string;
  contactPhone: string;
  email: string;
  branchesCount: number;
  membersCount: number;
  keyDepots: string[];
}

export interface UnionLeader {
  name: string;
  roleEn: string;
  roleHi: string;
  body: 'Central ECORSC' | 'NFIR Apex' | 'Divisional' | 'Branch MCS';
  bioEn: string;
  bioHi: string;
  phone?: string;
  email?: string;
  location: string;
  photoUrl?: string;
  achievementsEn?: string[];
  achievementsHi?: string[];
}

export interface MemberIdCard {
  membershipNo: string;
  fullName: string;
  designation: string;
  unionPost?: string; // Union designation/post e.g. Branch Secretary, Shop Representative
  cardNumber4Digit?: string; // 4-digit card number e.g. 1024
  employeePfNumber: string;
  hrmsId: string;
  division: DivisionId;
  station: string;
  department: DepartmentType | string;
  bloodGroup: string;
  emergencyContact: string;
  validUpto: string;
  issuedDate: string;
  photoUrl?: string;
  cardTheme?: 'tricolor' | 'classic' | 'navy';
  branchSecretaryApproved?: boolean;
  branchSecretarySignedAt?: string;
  branchSecretaryName?: string;
  generalSecretaryApproved?: boolean;
  generalSecretarySignedAt?: string;
  generalSecretaryName?: string;
}

export interface EmployeeRecord {
  id: string;
  fullName: string;
  pfNumber: string;
  hrmsId: string;
  designation: string;
  department: string; // e.g. Mechanical, Electrical, Operating, Civil Engineering, Store & Workshop
  shopOrUnit: string; // e.g. Bogie Shop, Wheel Shop, Carriage Body Shop, Paint Shop, Electrical AC Shop
  unionPost?: string; // Union post e.g. Branch Secretary, Joint Secretary, Shop Representative, Executive Member, Active Comrade
  category?: 'UR' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Ex-SM'; // Category
  cardNumber4Digit?: string; // 4-digit card number
  division: DivisionId;
  station: string;
  bloodGroup: string;
  mobile: string;
  membershipType: 'Cadre' | 'Life Member' | 'Delegate' | 'Branch Executive';
  joiningYear: string;
  status: 'Active' | 'Superannuated' | 'Transferred';
  photoUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Workshops & Shops' | 'Union Rallies & Morcha' | 'Felicitation & Conventions' | 'Staff Welfare & Camps' | 'National & Historic';
  imageUrl: string;
  captionEn: string;
  captionHi: string;
  location: string;
  date: string;
  uploadedBy?: string;
}

export type AppTheme = 'tricolor' | 'maroon' | 'navy' | 'emerald' | 'amber' | 'slate';


export interface PortalSettings {
  unionNameEn: string;
  unionNameHi: string;
  announcementNoticeEn: string;
  announcementNoticeHi: string;
  headquartersAddress: string;
  controlRoomPhone: string;
  controlRoomEmail: string;
  adminOfficerId: string;
  adminPassword: string;
}

export interface EmergencyContact {
  id: string;
  departmentOrRole: string;
  name: string;
  phone: string;
  divisionOrCity?: string;
  isAvailable24x7?: boolean;
}

// Seniority List record for Shops / Departments / Divisions
export interface SeniorityRecord {
  id: string;
  seniorityRank: number;
  employeeName: string;
  pfNumber: string;
  hrmsId: string;
  designation: string;
  department: string;
  shopOrUnit: string;
  division: DivisionId;
  category: 'UR' | 'OBC' | 'SC' | 'ST';
  dob: string;
  dateOfAppointment: string;
  dateOfPresentGrade: string;
  gradePayOrLevel: string; // e.g. "Level-6 (GP 4200)"
  documentUrl?: string; // base64 PDF or document URL
  documentName?: string;
  remarks?: string;
}

// 30 Official Sub-Admin Accounts with Semi-Access
export interface OfficialPermissions {
  canAddStaff: boolean;
  canAddHelpRecord: boolean;
  canViewSeniority: boolean;
  canEditSeniority: boolean;
  canManageGrievance: boolean;
  canApproveIdCards: boolean; // only Branch Secy MCS / General Secy ECoRSC or authorized
  canDeleteData: boolean;
}

export interface OfficialUserAccount {
  id: string; // e.g. "OFFICIAL-MCS-01"
  name: string;
  role: string;
  shopOrUnit: string;
  division: DivisionId;
  password: string;
  phone?: string;
  accessLevel: 'semi' | 'master';
  permissions: OfficialPermissions;
  lastActive?: string;
}

// Staff Welfare & Help records (समय-समय पर कर्मचारियों को की गई सहायता व समाधान)
export interface StaffHelpRecord {
  id: string;
  employeeName: string;
  pfNumber: string;
  shopOrUnit: string;
  department: string;
  division: DivisionId;
  date: string;
  helpCategory:
    | 'Medical Relief'
    | 'PF / Financial Assistance'
    | 'Mutual Transfer Support'
    | 'Quarters Issue'
    | 'Grievance / DAR Defense'
    | 'Bereavement Relief'
    | 'Safety & Tool Support'
    | 'Other';
  description: string;
  reliefGivenOrActionTaken: string;
  attachedPhotoOrDoc?: string; // base64 Data URL or link
  attachedDocName?: string;
  assistedByOfficialId: string;
  assistedByOfficialName: string;
  status: 'Resolved & Aided' | 'Under Followup';
}


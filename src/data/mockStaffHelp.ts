import { StaffHelpRecord } from '../types';

export const INITIAL_STAFF_HELP_RECORDS: StaffHelpRecord[] = [
  {
    id: 'help-01',
    employeeName: 'Trinath Sahu',
    pfNumber: 'PF534012988',
    shopOrUnit: 'Bogie Shop',
    department: 'Store & Workshop',
    division: 'MCS',
    date: '2026-10-10',
    helpCategory: 'Medical Relief',
    description:
      'Comrade Trinath underwent emergency cardiac surgery at AMRI Hospital, Bhubaneswar. Hospital advance clearance was stuck at Divisional Accounts.',
    reliefGivenOrActionTaken:
      'Union intervened with CMS & Sr. DFM; ₹1,80,000 emergency medical advance released directly to hospital within 6 hours. Union staff welfare relief of ₹15,000 provided.',
    attachedDocName: 'Hospital_Sanction_Receipt_MCS.pdf',
    assistedByOfficialId: 'OFFICIAL-MCS-01',
    assistedByOfficialName: 'Comrade Debabrata Behera (Branch Secy MCS)',
    status: 'Resolved & Aided',
  },
  {
    id: 'help-02',
    employeeName: 'Deepak Kumar Sahoo',
    pfNumber: 'PF534015401',
    shopOrUnit: 'LHB Wheel Shop',
    department: 'Store & Workshop',
    division: 'MCS',
    date: '2026-10-04',
    helpCategory: 'PF / Financial Assistance',
    description:
      'Non-refundable PF withdrawal applied for daughter higher engineering admission was pending over 45 days in HRMS without clearance from Personnel section.',
    reliefGivenOrActionTaken:
      'Personally represented before APO (Workshop) MCS; PF amount ₹3,50,000 credited to bank account within 48 hours.',
    attachedDocName: 'HRMS_PF_Passing_Memo.pdf',
    assistedByOfficialId: 'OFFICIAL-MCS-03',
    assistedByOfficialName: 'Comrade Prashant Gunjan (Asst Branch Secy)',
    status: 'Resolved & Aided',
  },
  {
    id: 'help-03',
    employeeName: 'B. K. Jena',
    pfNumber: 'PF532981002',
    shopOrUnit: 'Rayagada Running Crew Depot',
    department: 'Operating',
    division: 'WAT',
    date: '2026-09-28',
    helpCategory: 'Mutual Transfer Support',
    description:
      'Mutual transfer approved with Shri G. S. Rao (Vijayawada Division, SCR) was withheld due to crew shortage pretext at Rayagada sub-depot.',
    reliefGivenOrActionTaken:
      'Raised in Sr. DEE (OP) meeting by Comrade K. S. Murthy. Relieving orders with LPC and service book issued on 02 Oct 2026.',
    attachedDocName: 'Mutual_Transfer_Relieve_Order.pdf',
    assistedByOfficialId: 'OFFICIAL-MCS-24',
    assistedByOfficialName: 'Comrade K. Appa Rao (Loco Running Delegate)',
    status: 'Resolved & Aided',
  },
  {
    id: 'help-04',
    employeeName: 'Late Sarojini Nayak (Family of Ex-Trackman)',
    pfNumber: 'PF532441908',
    shopOrUnit: 'Cuttack P-Way Section',
    department: 'Civil Engineering (Track)',
    division: 'KUR',
    date: '2026-09-18',
    helpCategory: 'Bereavement Relief',
    description:
      'Untimely demise of Trackman Comrade Sarojini on duty. Family faced immediate distress and delay in ex-gratia processing.',
    reliefGivenOrActionTaken:
      'Immediate ECORSC Benevolent Cash grant of ₹25,000 handed to family. Compassionate ground appointment application filed with Sr. DPO/KUR.',
    attachedDocName: 'Benevolent_Fund_Handover_Ack.pdf',
    assistedByOfficialId: 'OFFICIAL-MCS-21',
    assistedByOfficialName: 'Comrade S. K. Nayak (Branch Joint Secy)',
    status: 'Under Followup',
  },
];

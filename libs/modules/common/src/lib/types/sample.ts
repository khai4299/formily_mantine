export interface Skill {
  skill_id: string;
  name: string;
  description: string;
  status: number;
}

export interface Site {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  state: number;
  name: string;
  description: string;
}

export interface Customer {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  state: number;
  name: string;
  description: string;
}

export interface Org {
  id: string;
  name: string;
  tenantId: string;
  orgType: string;
}

export interface Office {
  id: string;
  name: string;
}

export interface Staff {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  state: number;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  isDisable: boolean;
}

export interface Level {
  id: string;
  name: string;
}

export interface Title {
  id: string;
  name: string;
  vietnameseName?: string;
  status: string;
}

export interface Employee {
  id: string;
  cif: string;
  userType: string;
  registerType: string;
  profileType: string;
  registration: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  status: number;
  organization: Org;
  roles: Role[];
  jobTitle: Title;
  jobLevel: Level;
  directReport: DirectReport;
  fullName: string;
  office: Office;
  phone: string;
  permanentAddress: string;
  temporaryAddress: string;
  tenantId: string;
  companyEmail: string;
  personalEmail: string;
  certificates: string;
  gender: string;
  birthDay: string;
  university: string;
  major: string;
  maritalStatus: string;
  nationality: string;
  syncLDAPDirectReport: boolean;
  ldapEntryDn: string;
  isDeletable: boolean;
  isSkipCheckInOutNormal: boolean;
  lastModifiedDate: number;
  lastModifiedBy: string;
  reportTo: ReportTo;
  fullNameInVietnamese: string;
  stringOnboardDate: string;
  site: Site;
  teamOrSection: string;
  sector: string;
  costCenter: string;
  staffCategory: Staff;
  customer: Customer;
  onboardingDate: number;
  seniorityDate: number;
  attachment: string[];
}

export interface ReportTo {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  tenantId: string;
  state: number;
  fullName: string;
  username: string;
  code: string;
  registerType: string;
  profileType: string;
  registration: number;
  title: Title;
  level: Level;
  office: Office;
  descendants: any[];
}

export interface DirectReport {
  id: string;
  name: string;
  username: any;
  tenantId: any;
}

export interface EmployeeManagement {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  syncLDAPDirectReport: boolean;
  isDeletable: boolean;
  userMultipleReportMethod: UserMultipleReportMethod[];
  isSkipCheckInOutNormal: boolean;
  reportTo: ReportTo;
  fullNameInVietnamese: string;
  attachment: string[];
}

export interface UserMultipleReportMethod {
  method: Method;
  userReports: UserReport[];
}

export interface Method {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  name: string;
  tenantId: string;
  code: string;
}

export interface UserReport {
  id: string;
  name: string;
  username: string;
  cif: any;
}

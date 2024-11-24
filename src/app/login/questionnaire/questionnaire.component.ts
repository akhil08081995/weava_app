import { Component } from '@angular/core';
import {
  CHANNEL_OPTIONS,
  COLLEGE_ROLES,
  K12_ROLES,
  K12_ROLES_EXTENDED,
  PURPOSE_OPTIONS,
  WORK_INDUSTRY_OPTIONS,
  k12RolesArray,
} from '../../constant';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
})
export class QuestionnaireComponent {
  purpose: string | null = null;
  schoolName: string | null = null; // Bind this to the input field
  selectedRole: any;
  selectedIndustry: any;
  channel: { [key: string]: boolean } = {}; // Store selected channels
  techoOfficer: boolean = false;

  PURPOSE_OPTIONS: any = PURPOSE_OPTIONS;
  K12_ROLES: any = K12_ROLES;
  COLLEGE_ROLES: any = COLLEGE_ROLES;
  WORK_INDUSTRY_OPTIONS: any = WORK_INDUSTRY_OPTIONS;
  CHANNEL_OPTIONS: any = CHANNEL_OPTIONS;
  K12_ROLES_EXTENDED: any = K12_ROLES_EXTENDED;
  k12RolesArray: any = k12RolesArray;

  purposeOptions = Object.keys(this.PURPOSE_OPTIONS).map((key) => ({
    key,
    value: this.PURPOSE_OPTIONS[key as keyof typeof this.PURPOSE_OPTIONS],
  }));

  k12Roles = Object.keys(this.K12_ROLES).map((key) => ({
    key,
    value: this.K12_ROLES[key as keyof typeof this.K12_ROLES],
  }));

  collegeRoles = Object.keys(this.COLLEGE_ROLES).map((key) => ({
    key,
    value: this.COLLEGE_ROLES[key as keyof typeof this.COLLEGE_ROLES],
  }));

  workIndustryOptions = Object.keys(this.WORK_INDUSTRY_OPTIONS).map((key) => ({
    key,
    value:
      this.WORK_INDUSTRY_OPTIONS[
        key as keyof typeof this.WORK_INDUSTRY_OPTIONS
      ],
  }));

  // Convert CHANNEL_OPTIONS to an array for dynamic rendering
  channelOptions = Object.keys(this.CHANNEL_OPTIONS).map((key) => ({
    key,
    value: this.CHANNEL_OPTIONS[key as keyof typeof this.CHANNEL_OPTIONS],
  }));
  extendedRoles = Object.keys(this.K12_ROLES_EXTENDED).map((key) => ({
    key,
    value: this.K12_ROLES_EXTENDED[key as keyof typeof this.K12_ROLES_EXTENDED],
  }));
  removeK12Roles: boolean = false;

  ngOnChanges() {
    console.log('schoolName:', this.schoolName); // This will log whenever `schoolName` changes
  }

  onPurposeSelect(key: string): void {
    this.purpose = key;
    if (key !== 'PERSONAL') {
      // Reset the channel selections when switching away from 'Personal'
      Object.keys(this.channel).forEach((key) => {
        this.channel[key] = false;
      });
    }
  }

  onRoleSelect(role: any, extendedRoles?: any): void {
    console.log(role);
    this.schoolName = null;
    if (extendedRoles === 'extendedRoles') {
      this.removeK12Roles = true;
      this.selectedRole = role.value;
    } else {
      this.selectedRole = role.key;
    }
    console.log('Selected Role:', role.key);
  }

  onIndustrySelect(key: string): void {
    this.selectedIndustry = key;
    console.log('Selected Industry:', key);
  }

  submit() {
    throw new Error('Method not implemented.');
  }

  techPerson(value: any) {
    this.techoOfficer = value;
    this.removeK12Roles = true;
    // value
    //   ? (this.selectedRole = 'Technology officer')
    //   : (this.selectedRole = 'Teacher');
    console.log(this.techoOfficer);
  }

  getRoleName(roleValue: any) {
    // if (this.techoOfficer && roleValue === 'Teacher') {
    //   this.selectedRole = 'Technology officer';
    // }
    return this.techoOfficer && roleValue === 'Teacher'
      ? 'Technology officer'
      : roleValue;
  }

  clickExtendedRoles() {
    this.removeK12Roles = false;
    this.selectedRole = false;
  }

  showInputBox() {
    return this.k12RolesArray.find((role: any) => role === this.selectedRole);
  }
}

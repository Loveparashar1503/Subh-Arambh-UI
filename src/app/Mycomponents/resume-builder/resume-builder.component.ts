import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { ATSServiceService } from 'src/app/atsservice.service';

import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';


@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent {
getduties(exp: AbstractControl<any,any>) {
        return exp.get('duties') as FormArray;
}
  
  resumeForm: FormGroup;
  currentSection: string = '';

  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      name: ['Love parashar', Validators.required],
      email: ['john@gmail.com', [Validators.required, Validators.email]],
      phone: ['(123) 456-7890', Validators.required],
      linkedin: ['https://www.linkedin.com/in/johndoe'],
      summary: ['Experienced software engineer with a strong background in developing...'],
      experience: this.fb.array([]),
      education: this.fb.group({
        degree: [''],
        institution: [''],
        graduationDate: ['']
      }),
      skills: this.fb.array([]),
      projects: this.fb.array([]),
      certifications: this.fb.array([])
    });
  }

  exportResume(): void {
    const element = document.querySelector('.preview-column') as HTMLElement;
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        // Add the image to the PDF. Adjust the width and height as needed.
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);  // (imageData, format, x, y, width, height)
        pdf.save('resume.pdf');
      });
    }
  }
  

  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  get certifications(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }

  addExperience() {
    this.experience.push(this.fb.group({
      position: [''],
      company: [''],
      duration: [''],
      duties: this.fb.array([''])
    }));
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  addDuty(expIndex: number) {
    const duties = this.experience.at(expIndex).get('duties') as FormArray;
    duties.push(this.fb.control(''));
  }

  removeDuty(expIndex: number, dutyIndex: number) {
    const duties = this.experience.at(expIndex).get('duties') as FormArray;
    duties.removeAt(dutyIndex);
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addProject() {
    this.projects.push(this.fb.group({
      name: [''],
      description: ['']
    }));
  }

  removeProject(index: number) {
    this.projects.removeAt(index);
  }

  addCertification() {
    this.certifications.push(this.fb.group({
      name: [''],
      issuer: [''],
      date: ['']
    }));
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  onSubmit() {
    console.log(this.resumeForm.value);
  }

  setCurrentSection(section: string) {
    this.currentSection = section;
  }

  clearCurrentSection() {
    this.currentSection = '';
  }
}
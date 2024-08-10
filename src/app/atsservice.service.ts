import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ATSServiceService {

  constructor(private http: HttpClient) { }

  calculateATS(resume: any): Observable<any> {
    // Mock implementation - in real scenario, you would call an actual API
    const mockResponse = {
      score: this.mockCalculateScore(resume),
      feedback: this.mockGenerateFeedback(resume)
    };
    return of(mockResponse);
  }

  private mockCalculateScore(resume: any): number {
    // Mock scoring logic
    let score = 0;
    if (resume.education) score += 20;
    if (resume.achievements) score += 20;
    if (resume.awards) score += 20;
    if (resume.profileLinks) score += 20;
    if (resume.profileLinks && resume.profileLinks.includes('linkedin')) score += 20; // Bonus for LinkedIn
    return score;
  }

  private mockGenerateFeedback(resume: any): string {
    // Mock feedback logic
    let feedback = 'Your resume is good, but here are some suggestions:\n';
    if (!resume.education) feedback += '- Add your education details.\n';
    if (!resume.achievements) feedback += '- Add your achievements.\n';
    if (!resume.awards) feedback += '- Add your awards.\n';
    if (!resume.profileLinks) feedback += '- Add your profile links.\n';
    if (resume.profileLinks && !resume.profileLinks.includes('linkedin')) feedback += '- Consider adding your LinkedIn profile link.\n';
    return feedback;
  }
}
